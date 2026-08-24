import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/ui/TechMarquee";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { Certifications } from "@/components/sections/Certifications";
import { CurrentFocus } from "@/components/sections/CurrentFocus";
import { Contact } from "@/components/sections/Contact";
import { profile, seoKeywords } from "@/data/profile";
import { SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.heroDescription,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kumbakonam",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  knowsAbout: seoKeywords.filter((keyword) => keyword !== profile.name),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ScrollProgress />
      <Navbar />

      <main id="main-content">
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Infrastructure />
        <Certifications />
        <CurrentFocus />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
      <CommandPalette />
    </>
  );
}
