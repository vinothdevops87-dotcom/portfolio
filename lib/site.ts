/**
 * Public site URL used for SEO metadata, sitemap and Open Graph tags.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://your-domain.com),
 * otherwise it falls back to localhost.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
] as const;

export type NavId = (typeof NAV_ITEMS)[number]["id"];
