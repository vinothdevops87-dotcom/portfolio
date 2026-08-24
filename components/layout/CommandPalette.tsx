"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  ArrowUp,
  Check,
  Compass,
  Copy,
  CornerDownLeft,
  Download,
  Search,
} from "lucide-react";
import { profile } from "@/data/profile";
import { NAV_ITEMS } from "@/lib/site";

const PALETTE_OPEN_EVENT = "vk:palette-open";

/** Imperative trigger so any component (e.g. the navbar) can open the palette. */
export function openCommandPalette() {
  window.dispatchEvent(new Event(PALETTE_OPEN_EVENT));
}

interface Command {
  id: string;
  label: string;
  hint: string;
  icon: ReactNode;
  run: () => void;
}

function downloadResume() {
  const anchor = document.createElement("a");
  anchor.href = profile.resumePath;
  anchor.download = "";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpenEvent = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(PALETTE_OPEN_EVENT, onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(PALETTE_OPEN_EVENT, onOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // Deferred so the palette opens with a fresh, focused query state.
      const focusTimer = window.setTimeout(() => {
        setQuery("");
        setIndex(0);
        inputRef.current?.focus();
      }, 40);
      return () => window.clearTimeout(focusTimer);
    }
    document.body.style.overflow = "";
    return undefined;
  }, [open]);

  const commands = useMemo<Command[]>(() => {
    const list: Command[] = NAV_ITEMS.map((item) => ({
      id: `nav-${item.id}`,
      label: `Go to ${item.label}`,
      hint: "Section",
      icon: <Compass className="size-4" aria-hidden="true" />,
      run: () => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" }),
    }));

    list.push({
      id: "action-resume",
      label: "Download Resume",
      hint: "Action",
      icon: <Download className="size-4" aria-hidden="true" />,
      run: downloadResume,
    });

    list.push({
      id: "action-email",
      label: copied ? "Copied!" : "Copy Email Address",
      hint: profile.email,
      icon:
        copied ? (
          <Check className="size-4 text-emerald-400" aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        ),
      run: () => {
        navigator.clipboard?.writeText(profile.email).catch(() => undefined);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      },
    });

    list.push({
      id: "action-top",
      label: "Back to Top",
      hint: "Action",
      icon: <ArrowUp className="size-4" aria-hidden="true" />,
      run: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    });

    if (profile.socials.github) {
      list.push({
        id: "social-github",
        label: "Open GitHub Profile",
        hint: "Link",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        ),
        run: () => window.open(profile.socials.github, "_blank", "noreferrer"),
      });
    }

    if (profile.socials.linkedin) {
      list.push({
        id: "social-linkedin",
        label: "Open LinkedIn Profile",
        hint: "Link",
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        ),
        run: () => window.open(profile.socials.linkedin, "_blank", "noreferrer"),
      });
    }

    return list;
  }, [copied]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return commands;
    return commands.filter(
      (command) =>
        command.label.toLowerCase().includes(normalized) ||
        command.hint.toLowerCase().includes(normalized),
    );
  }, [commands, query]);

  const close = () => setOpen(false);

  const execute = (command: Command | undefined) => {
    if (!command) return;
    close();
    // Let the overlay unmount before scrolling / downloading.
    window.setTimeout(command.run, 60);
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIndex((current) => (current + 1) % Math.max(filtered.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIndex((current) => (current - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      execute(filtered[index]);
    } else if (event.key === "Escape") {
      close();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[80]"
        >
          <div
            className="absolute inset-0 bg-zinc-950/75 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative mx-auto mt-[16vh] w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-xl border border-white/10 bg-zinc-950/95 shadow-2xl shadow-black/60 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-4">
              <Search className="size-4 shrink-0 text-zinc-500" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setIndex(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder="Search sections and actions…"
                aria-label="Search commands"
                className="w-full bg-transparent py-3.5 font-mono text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
              />
              <kbd className="shrink-0 rounded border border-white/10 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
                ESC
              </kbd>
            </div>

            <ul role="listbox" aria-label="Commands" className="max-h-[320px] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-8 text-center font-mono text-xs text-zinc-600">
                  No matching commands — try &quot;skills&quot; or &quot;resume&quot;
                </li>
              )}
              {filtered.map((command, currentIndex) => {
                const selected = currentIndex === index;
                return (
                  <li key={command.id} role="option" aria-selected={selected}>
                    <button
                      type="button"
                      onMouseEnter={() => setIndex(currentIndex)}
                      onClick={() => execute(command)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                        selected ? "bg-cyan-400/10 text-cyan-100" : "text-zinc-300"
                      }`}
                    >
                      <span className={selected ? "text-cyan-300" : "text-zinc-500"}>
                        {command.icon}
                      </span>
                      <span className="text-sm">{command.label}</span>
                      <span className="ml-auto truncate font-mono text-[10px] text-zinc-600">
                        {command.hint}
                      </span>
                      {selected && (
                        <CornerDownLeft className="size-3.5 shrink-0 text-cyan-300/70" aria-hidden="true" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-4 border-t border-white/[0.07] px-4 py-2.5 font-mono text-[10px] text-zinc-600">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
              <span className="ml-auto">{filtered.length} commands</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
