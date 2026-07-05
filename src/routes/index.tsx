import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Collections } from "@/components/portfolio/Collections";
import { Gallery } from "@/components/portfolio/Gallery";
import { Story } from "@/components/portfolio/Story";
import { Services } from "@/components/portfolio/Services";
import { Runway } from "@/components/portfolio/Runway";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="bg-cream text-noir">
      <Navbar />
      <Hero />
      <Collections />
      <Gallery />
      <Story />
      <Services />
      <Runway />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
