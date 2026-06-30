"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { BOOKLET_IMAGES, pageFaces } from "./bookModel";

// --- Book dimensions (world units) ---------------------------------------
// Every page is one half of a spread, so all pages share a size and the open
// book is symmetric — the spine stays dead centre and never drifts.
const PAGE_H = 3.4;
const PAGE_ASPECT = 515 / 630; // half-spread = one page
const PAGE_W = PAGE_H * PAGE_ASPECT;
const HALF_W = PAGE_W / 2;
const OPEN_W = PAGE_W * 2;

const TURN_SECONDS = 1.1;
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** A page-sized plane whose U coords sample [uStart, uEnd] of a texture. */
function makeGeo(uStart, uEnd) {
  const geo = new THREE.PlaneGeometry(PAGE_W, PAGE_H, 1, 1);
  const uv = geo.attributes.uv;
  for (let i = 0; i < uv.count; i += 1) {
    uv.setX(i, uStart + (uEnd - uStart) * uv.getX(i));
  }
  uv.needsUpdate = true;
  return geo;
}

/**
 * Geometry shared by all pages. "back" variants reverse the U range so a face
 * flipped 180° still reads correctly. `half` picks which slice of the spread
 * a face shows: the whole image (covers), its left half, or its right half.
 */
function useGeometries() {
  return useMemo(
    () => ({
      plain: new THREE.PlaneGeometry(PAGE_W, PAGE_H, 1, 1),
      front: { full: makeGeo(0, 1), L: makeGeo(0, 0.5), R: makeGeo(0.5, 1) },
      back: { full: makeGeo(1, 0), L: makeGeo(0.5, 0), R: makeGeo(1, 0.5) },
    }),
    [],
  );
}

/**
 * One page, centred at the local origin: a white backing plane (so a page is
 * never blank-black) plus, for a non-blank face, the image slice on top.
 * `sheet` faces are single-sided so only the correct side shows mid-flip.
 */
function PageSide({ face, side, sheet, textures, geometries }) {
  const mat = sheet ? THREE.FrontSide : THREE.DoubleSide;
  const imgGeo = face ? geometries[side][face.half] : null;

  return (
    <group>
      <mesh geometry={geometries.plain}>
        <meshBasicMaterial color="#ffffff" side={mat} />
      </mesh>
      {imgGeo && (
        <mesh geometry={imgGeo} position={[0, 0, 0.003]}>
          <meshBasicMaterial map={textures[face.img - 1]} side={mat} />
        </mesh>
      )}
    </group>
  );
}

/** A settled page sitting open beside the spine. */
function StaticPage({ face, role, textures, geometries }) {
  const x = role === "left" ? -HALF_W : HALF_W;
  return (
    <group position={[x, 0, 0]}>
      <PageSide face={face} side="front" textures={textures} geometries={geometries} />
    </group>
  );
}

/**
 * The leaf that swings around the spine. Both faces live on the right of the
 * spine (centre +HALF_W); the back is flipped 180° about its own centre so it
 * reads correctly and lands exactly on the left page when the turn finishes.
 */
function TurningSheet({ turn, textures, geometries, onDone }) {
  const groupRef = useRef(null);
  const progress = useRef(0);
  const finished = useRef(false);

  useFrame((_, delta) => {
    if (finished.current || !groupRef.current) return;
    progress.current = Math.min(1, progress.current + delta / TURN_SECONDS);
    const eased = easeInOut(progress.current);
    groupRef.current.rotation.y = turn.from + (turn.to - turn.from) * eased;
    if (progress.current >= 1) {
      finished.current = true;
      onDone();
    }
  });

  return (
    <group ref={groupRef} rotation-y={turn.from}>
      <group position={[HALF_W, 0, 0.02]}>
        <PageSide
          face={turn.sheetFront}
          side="front"
          sheet
          textures={textures}
          geometries={geometries}
        />
      </group>
      <group position={[HALF_W, 0, -0.02]} rotation-y={Math.PI}>
        <PageSide
          face={turn.sheetBack}
          side="back"
          sheet
          textures={textures}
          geometries={geometries}
        />
      </group>
    </group>
  );
}

/**
 * Wraps the book in a pannable / zoomable group so small menu text can be read.
 * Wheel (or pinch) zooms, dragging pans while zoomed, double-click resets.
 * State lives in refs and is eased every frame to avoid re-renders.
 */
function BookViewport({ children }) {
  const groupRef = useRef(null);
  const { gl, viewport, size } = useThree();
  const target = useRef({ zoom: 1, x: 0, y: 0 });
  const drag = useRef({ active: false, lastX: 0, lastY: 0 });

  // The compiler can't tell that mutating the canvas element's style/cursor is
  // a safe side effect on an external DOM node rather than a mutation of the
  // `gl` value, so the immutability rule is disabled for this effect.
  /* eslint-disable react-hooks/immutability */
  useEffect(() => {
    const el = gl.domElement;
    el.style.touchAction = "none";
    el.style.cursor = "grab";

    const clampPan = () => {
      const s = target.current;
      const maxX = (viewport.width * (s.zoom - 1)) / 2;
      const maxY = (viewport.height * (s.zoom - 1)) / 2;
      s.x = THREE.MathUtils.clamp(s.x, -maxX, maxX);
      s.y = THREE.MathUtils.clamp(s.y, -maxY, maxY);
    };

    const onWheel = (e) => {
      e.preventDefault();
      const s = target.current;
      s.zoom = THREE.MathUtils.clamp(s.zoom * (e.deltaY < 0 ? 1.12 : 0.89), 1, 4.5);
      if (s.zoom <= 1.001) {
        s.x = 0;
        s.y = 0;
      }
      clampPan();
    };
    const onDown = (e) => {
      drag.current = { active: true, lastX: e.clientX, lastY: e.clientY };
      el.style.cursor = "grabbing";
    };
    const onMove = (e) => {
      if (!drag.current.active) return;
      const s = target.current;
      s.x += (e.clientX - drag.current.lastX) * (viewport.width / size.width);
      s.y -= (e.clientY - drag.current.lastY) * (viewport.height / size.height);
      drag.current.lastX = e.clientX;
      drag.current.lastY = e.clientY;
      clampPan();
    };
    const onUp = () => {
      drag.current.active = false;
      el.style.cursor = "grab";
    };
    const onDouble = () => {
      target.current = { zoom: 1, x: 0, y: 0 };
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("dblclick", onDouble);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("dblclick", onDouble);
    };
  }, [gl, viewport.width, viewport.height, size.width, size.height]);
  /* eslint-enable react-hooks/immutability */

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    const s = target.current;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, s.zoom, 0.2));
    g.position.x = THREE.MathUtils.lerp(g.position.x, s.x, 0.2);
    g.position.y = THREE.MathUtils.lerp(g.position.y, s.y, 0.2);
  });

  return <group ref={groupRef}>{children}</group>;
}

function Book({ position, turn, onTurnDone }) {
  const textures = useLoader(THREE.TextureLoader, BOOKLET_IMAGES);
  const geometries = useGeometries();
  const { viewport, gl } = useThree();

  useEffect(() => {
    const maxAniso = gl.capabilities.getMaxAnisotropy();
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = maxAniso;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.generateMipmaps = true;
      t.needsUpdate = true;
    });
  }, [textures, gl]);

  const fit = Math.min(
    viewport.width / (OPEN_W * 1.06),
    viewport.height / (PAGE_H * 1.12),
    1.4,
  );

  const left = turn ? turn.staticLeft : pageFaces(position).left;
  const right = turn ? turn.staticRight : pageFaces(position).right;

  return (
    <group scale={fit} rotation-x={-0.08}>
      <StaticPage face={left} role="left" textures={textures} geometries={geometries} />
      <StaticPage face={right} role="right" textures={textures} geometries={geometries} />

      {turn && (
        <TurningSheet
          key={turn.id}
          turn={turn}
          textures={textures}
          geometries={geometries}
          onDone={onTurnDone}
        />
      )}
    </group>
  );
}

/**
 * R3F canvas hosting the menu book. State (position/turn) is owned by the
 * parent modal; this component only renders and reports turn completion.
 */
export default function MenuBookCanvas({ position, turn, onTurnDone }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <BookViewport>
          <Book position={position} turn={turn} onTurnDone={onTurnDone} />
        </BookViewport>
      </Suspense>
    </Canvas>
  );
}
