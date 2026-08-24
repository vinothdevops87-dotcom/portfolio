import { profile } from "@/data/profile";

export function Logo() {
  return (
    <span
      aria-hidden="true"
      className="grid size-9 shrink-0 place-items-center rounded-lg border border-cyan-300/25 bg-gradient-to-br from-cyan-400/15 to-emerald-400/15 font-mono text-sm font-bold tracking-tight text-cyan-300"
    >
      {profile.initials}
    </span>
  );
}
