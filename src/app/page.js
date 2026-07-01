import HeroSection from "@/components/hero/HeroSection";
import MenuSection from "@/components/menu/MenuSection";
import AboutSection from "@/components/about/AboutSection";
import LocationSection from "@/components/location/LocationSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <MenuSection />
      <AboutSection />
      <LocationSection />
      <Footer />
    </main>
  );
}
