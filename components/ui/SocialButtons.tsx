import { profile } from "@/data/profile";
import { Icon, type IconKey } from "./icons";

type Network = "github" | "linkedin" | "email";

const socialMeta: Record<Network, { label: string; href: string; icon: IconKey }> = {
  github: { label: "GitHub", href: profile.socials.github ?? "", icon: "github" },
  linkedin: { label: "LinkedIn", href: profile.socials.linkedin ?? "", icon: "linkedin" },
  email: { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
};

interface SocialIconButtonProps {
  network: Network;
  className?: string;
}

export function SocialIconButton({ network, className }: SocialIconButtonProps) {
  const meta = socialMeta[network];
  const baseClass = `grid size-10 place-items-center rounded-lg border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 ${className ?? ""}`;

  if (!meta.href) {
    return (
      <span
        className={`${baseClass} cursor-not-allowed border-white/10 bg-white/[0.04] text-zinc-600`}
        title="Link coming soon"
      >
        <Icon name={meta.icon} className="size-4.5" />
        <span className="sr-only">{meta.label} (link coming soon)</span>
      </span>
    );
  }

  return (
    <a
      href={meta.href}
      target={network === "email" ? undefined : "_blank"}
      rel={network === "email" ? undefined : "noreferrer"}
      aria-label={meta.label}
      title={meta.label}
      className={`${baseClass} border-white/10 bg-white/[0.04] text-zinc-400 hover:border-cyan-300/40 hover:text-cyan-200`}
    >
      <Icon name={meta.icon} className="size-4.5" />
    </a>
  );
}

export function socialEntries(): Network[] {
  return ["github", "linkedin", "email"];
}
