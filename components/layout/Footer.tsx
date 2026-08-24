import { Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { NAV_ITEMS } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { SocialIconButton, socialEntries } from "@/components/ui/SocialButtons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06]">
      {/* Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-[3vw] select-none text-center text-[16vw] font-bold leading-none tracking-tighter text-white/[0.025]"
      >
        VK · DEVOPS
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo />
              <span className="font-semibold tracking-tight text-white">{profile.name}</span>
            </div>
            <p className="mt-4 max-w-sm font-mono text-xs leading-relaxed text-zinc-500">
              # infrastructure · automation · reliability · observability
            </p>
            <div className="mt-5 flex gap-2.5">
              {socialEntries().map((network) => (
                <SocialIconButton key={network} network={network} />
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              Navigate
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-zinc-400 transition-colors hover:text-cyan-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 break-all text-sm text-zinc-400 transition-colors hover:text-cyan-200"
                >
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  {profile.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-sm text-zinc-400">
                <MapPin className="size-4 shrink-0" aria-hidden="true" />
                {profile.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="text-xs text-zinc-600">
            © {year} {profile.name} · Built with Next.js
          </p>
          <a
            href="#home"
            className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-zinc-300 transition hover:border-cyan-300/40 hover:text-cyan-200"
          >
            Back to Top
            <span className="transition-transform group-hover:-translate-y-0.5">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
