"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Mail, Navigation } from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  fromLeftVariants,
  fromRightVariants,
  fadeUpVariants,
} from "@/components/about/motion";

const reveal = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.25 },
};

/**
 * Location section: address, opening hours and contact details beside an
 * embedded map, revealed with a left/right slide as it scrolls into view.
 * Shares the warm backdrop and brown ink of the menu/about sections.
 */
export default function LocationSection() {
  const { heading, intro, coords, address, hours, contact } =
    siteConfig.location;

  const mapSrc = `https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=16&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`;

  return (
    <section
      id="location"
      className="relative w-full overflow-hidden bg-[#d8cabb] py-16 text-[#5a3320] md:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <motion.header {...reveal} className="mb-14 text-center">
          <motion.h2
            variants={fadeUpVariants}
            className="font-display text-5xl font-medium sm:text-6xl"
          >
            {heading}
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="mx-auto mt-4 max-w-xl text-base font-light text-[#5a3320]/70 sm:text-lg"
          >
            {intro}
          </motion.p>
        </motion.header>

        <motion.div
          {...reveal}
          className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2"
        >
          {/* Details */}
          <motion.div
            variants={fromLeftVariants}
            className="flex flex-col gap-8 rounded-3xl bg-[#efe6d9] p-8 shadow-xl sm:p-10"
          >
            <InfoRow icon={MapPin} title="Address">
              <p className="font-medium">{address.name}</p>
              {address.lines.map((line) => (
                <p key={line} className="text-[#5a3320]/70">
                  {line}
                </p>
              ))}
            </InfoRow>

            <InfoRow icon={Clock} title="Opening Hours">
              <ul className="space-y-1">
                {hours.map((h) => (
                  <li
                    key={h.days}
                    className="flex justify-between gap-4 text-[#5a3320]/70"
                  >
                    <span>{h.days}</span>
                    <span className="tabular-nums text-[#5a3320]">{h.time}</span>
                  </li>
                ))}
              </ul>
            </InfoRow>

            <InfoRow icon={Phone} title="Contact">
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="block text-[#5a3320]/70 transition-colors hover:text-[#5a3320]"
              >
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-[#5a3320]/70 transition-colors hover:text-[#5a3320]"
              >
                <Mail className="h-4 w-4" />
                {contact.email}
              </a>
            </InfoRow>

            <a
              href={directions}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[#5a3320] px-6 py-3 font-medium text-[#f5efe6] transition-opacity hover:opacity-90"
            >
              <Navigation className="h-5 w-5" />
              Get Directions
            </a>
          </motion.div>

          {/* Map */}
          <motion.div
            variants={fromRightVariants}
            className="min-h-[22rem] overflow-hidden rounded-3xl shadow-xl ring-1 ring-[#5a3320]/15"
          >
            <iframe
              title="The Black Penny location map"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[22rem] w-full grayscale-[0.3]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/** Icon + titled block used for each detail group. */
function InfoRow({ icon: Icon, title, children }) {
  return (
    <div className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#5a3320]/10 text-[#5a3320]">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <h3 className="mb-1 font-display text-xl">{title}</h3>
        <div className="text-sm leading-relaxed sm:text-base">{children}</div>
      </div>
    </div>
  );
}
