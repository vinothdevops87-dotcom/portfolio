import type { ReactNode } from "react";

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function TerminalWindow({ title, children, className }: TerminalWindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-zinc-950/90 shadow-2xl shadow-black/50 ${
        className ?? ""
      }`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-red-500/70" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-yellow-500/70" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-green-500/70" aria-hidden="true" />
        <span className="ml-2 truncate font-mono text-xs text-zinc-500">{title}</span>
      </div>
      <div className="p-4 font-mono sm:p-5">{children}</div>
    </div>
  );
}
