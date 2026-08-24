import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { profile, seoKeywords } from "@/data/profile";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vinoth Kumar S | DevOps Engineer | Cloud, Kubernetes & Automation",
    template: "%s | Vinoth Kumar S",
  },
  description:
    "DevOps Engineer focused on reliable, automated, and observable cloud infrastructure. AWS, Docker, Kubernetes, CI/CD automation, Terraform, Ansible, Prometheus, Grafana, Loki and DevSecOps practices.",
  keywords: seoKeywords,
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: `${profile.name} — ${profile.role}`,
    title: "Vinoth Kumar S | DevOps Engineer | Cloud, Kubernetes & Automation",
    description:
      "DevOps Engineer focused on reliable, automated, and observable cloud infrastructure. AWS, Docker, Kubernetes, CI/CD, Observability and DevSecOps.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinoth Kumar S | DevOps Engineer",
    description:
      "AWS · Docker · Kubernetes · CI/CD · Observability · DevSecOps — production infrastructure, automation and reliability.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} overflow-x-hidden bg-zinc-950 font-sans text-zinc-300 antialiased`}
      >
        {/* Ambient background layers */}
        <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-grid-faint [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black_20%,transparent_75%)]" />
          <div className="animate-drift-a absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/[0.07] blur-[120px]" />
          <div className="animate-drift-b absolute right-[-160px] top-1/3 h-[360px] w-[360px] rounded-full bg-emerald-500/[0.05] blur-[110px]" />
          <div className="animate-drift-a absolute bottom-[-120px] left-[-120px] h-[320px] w-[320px] rounded-full bg-violet-500/[0.04] blur-[110px]" />
          <div className="bg-noise absolute inset-0 opacity-[0.035]" />
        </div>

        <a
          href="#main-content"
          className="sr-only z-[100] rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>

        {children}
      </body>
    </html>
  );
}
