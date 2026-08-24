# Vinoth Kumar S — DevOps Engineer Portfolio

A modern, premium, production-ready personal portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and **Lucide React**.

The site presents professional experience, technical skills, infrastructure work, cloud knowledge, observability projects, DevSecOps practices, and an interest in AI-powered DevOps automation — positioned for DevOps / Cloud / SRE / Platform Engineering opportunities.

## Tech Stack

| Layer      | Choice                                        |
| ---------- | --------------------------------------------- |
| Framework  | Next.js (App Router, latest stable)           |
| Language   | TypeScript                                    |
| Styling    | Tailwind CSS v4                               |
| Animation  | Framer Motion                                 |
| Icons      | Lucide React (+ custom brand SVGs)            |
| Fonts      | Geist Sans & Mono (`geist` package, self-hosted) |

## Getting Started

```bash
npm install
npm run dev       # start dev server on http://localhost:3000
```

```bash
npm run build     # production build
npm run start     # serve the production build
npm run lint      # eslint
```

## Project Structure

```text
portfolio/
├── app/
│   ├── layout.tsx              # Root layout, fonts, SEO/Open Graph metadata
│   ├── page.tsx                # Section composition + JSON-LD structured data
│   ├── globals.css             # Tailwind theme tokens, utilities, keyframes
│   ├── icon.svg                # VK favicon
│   ├── opengraph-image.tsx     # Generated OG image (next/og)
│   ├── sitemap.ts              # Sitemap
│   └── robots.ts               # Robots
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky nav, scroll-spy, mobile menu, resume CTA
│   │   └── Footer.tsx          # Footer with socials + back-to-top
│   ├── sections/
│   │   ├── Hero.tsx            # Identity, animated deploy terminal, pipeline strip
│   │   ├── About.tsx           # Bio + highlight cards
│   │   ├── Skills.tsx          # Interactive categorized skill tabs
│   │   ├── Experience.tsx      # Professional timeline
│   │   ├── Projects.tsx        # Project cards + case-study modals
│   │   ├── Infrastructure.tsx  # Interactive architecture visualization
│   │   ├── Certifications.tsx  # Certifications + education
│   │   ├── CurrentFocus.tsx    # Currently exploring
│   │   └── Contact.tsx         # Validated contact form + channels
│   └── ui/                     # Reusable primitives (Reveal, Chip, TerminalWindow…)
├── data/                       # All content lives here — no hardcoding in components
│   ├── profile.ts              # Name, role, email, socials, resume path, SEO keywords
│   ├── skills.ts               # Skill categories & tools
│   ├── experience.ts           # Roles, responsibilities, achievements
│   ├── projects.ts             # Featured projects incl. ASCII architectures
│   ├── certifications.ts       # Certifications & education
│   └── infrastructure.ts       # Diagram nodes/edges/systems + focus areas
├── lib/site.ts                 # Site URL env handling + nav items
├── types/index.ts              # Shared TypeScript types
└── public/
    ├── images/
    └── resume/vinoth-kumar-s-resume.pdf
```

## Customization Guide

### 1. Personal info & links — `data/profile.ts`

All personal content is centralized:

- `email` — contact address used across hero, contact section, footer.
- `socials.github` / `socials.linkedin` — add your real URLs. Until set, the
  corresponding buttons render as disabled placeholders (no fake links).
- `resumePath` — points to `/resume/vinoth-kumar-s-resume.pdf` under `public/`.
- `about`, `heroDescription`, `headlineTags` — copy shown on the page.

### 2. Resume

Replace `public/resume/vinoth-kumar-s-resume.pdf` with your actual resume PDF,
keeping the same filename or updating `resumePath` accordingly.

### 3. Site URL (SEO)

Set the public URL before deploying so metadata, sitemap and Open Graph tags are absolute:

```bash
# .env.production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 4. Content

- Skills → `data/skills.ts`
- Experience → `data/experience.ts`
- Projects (incl. GitHub/demo URLs and ASCII architecture diagrams) → `data/projects.ts`
- Certifications & education → `data/certifications.ts`
- Infrastructure diagram nodes/systems → `data/infrastructure.ts`

Components never hardcode this content — they read from `data/`.

## Features

- Dark, engineering-focused design with grid background, glassmorphism accents, and subtle gradients
- Animated deployment terminal + delivery-pipeline strip in the hero
- Sticky navbar with IntersectionObserver scroll-spy and animated active indicator
- Interactive skill category tabs with animated transitions
- Professional experience timeline with grouped responsibilities
- Project cards with case-study modals featuring full architecture diagrams
- Interactive infrastructure map — hover/tap components to inspect purpose and technologies
- Validated contact form (composes an email via the visitor's mail client; no backend needed)
- SEO: metadata API, Open Graph image generated at build time, sitemap, robots, JSON-LD Person schema
- Accessibility: semantic HTML, skip link, aria labels/roles, keyboard-focus styles, reduced-motion support
- Fully responsive across mobile, tablet, and desktop

## Deployment

Works out of the box on any Node.js host or platform that supports Next.js:

```bash
npm run build && npm run start
```

For Vercel: import the repository, set `NEXT_PUBLIC_SITE_URL`, and deploy.

## License

Personal portfolio of Vinoth Kumar S. Reuse the structure freely; replace all
personal content with your own.
# portfolio
