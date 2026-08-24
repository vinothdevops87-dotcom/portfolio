"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Download,
  FolderGit2,
} from "lucide-react";
import { profile } from "@/data/profile";
import { Icon, type IconKey } from "@/components/ui/icons";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIconButton, socialEntries } from "@/components/ui/SocialButtons";

/* ------------------------------------------------------------------ */
/* Animated deployment terminal (decorative)                           */
/* ------------------------------------------------------------------ */

interface TerminalLine {
  text: string;
  tone: "cmd" | "dim" | "ok" | "done";
}

const TERMINAL_LINES: TerminalLine[] = [
  { text: "$ vk deploy --env production", tone: "cmd" },
  { text: "[1/7] Authenticating with AWS STS .......... OK", tone: "dim" },
  { text: "[2/7] Building Docker images ............... OK", tone: "dim" },
  { text: "[3/7] Pushing images to registry ........... OK", tone: "dim" },
  { text: "[4/7] kubectl apply -f k8s/ ................ OK", tone: "dim" },
  { text: "[5/7] Rolling update 3/3 healthy ........... OK", tone: "dim" },
  { text: "[6/7] Prometheus targets up (14/14) ........ OK", tone: "dim" },
  { text: "[7/7] Slack release notification sent ...... OK", tone: "dim" },
  { text: "✔ Deployment complete in 42s — all systems green", tone: "done" },
];

const toneClass: Record<TerminalLine["tone"], string> = {
  cmd: "text-cyan-300",
  dim: "text-zinc-500",
  ok: "text-emerald-400",
  done: "font-semibold text-emerald-400",
};

function DeployTerminal() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= TERMINAL_LINES.length) {
      const hold = setTimeout(() => setVisibleCount(0), 4600);
      return () => clearTimeout(hold);
    }
    const step = setTimeout(
      () => setVisibleCount((count) => count + 1),
      visibleCount === 0 ? 600 : 620,
    );
    return () => clearTimeout(step);
  }, [visibleCount]);

  return (
    <TerminalWindow title="vk@prod: ~/ailaysa-tiger" className="h-full">
      <div aria-hidden="true" className="min-h-[248px] space-y-1.5 text-[11px] leading-relaxed sm:text-xs">
        {TERMINAL_LINES.slice(0, visibleCount).map((line) => (
          <p key={line.text} className={toneClass[line.tone]}>
            {line.text}
          </p>
        ))}
        <span className="inline-block h-3.5 w-2 animate-caret bg-cyan-300/80 align-middle" />
      </div>
      <p className="sr-only">
        Animated terminal simulating a production deployment pipeline finishing successfully.
      </p>
    </TerminalWindow>
  );
}

/* ------------------------------------------------------------------ */
/* Delivery pipeline strip                                             */
/* ------------------------------------------------------------------ */

const PIPELINE_STEPS: { label: string; icon: IconKey }[] = [
  { label: "Developer", icon: "user" },
  { label: "GitHub", icon: "github" },
  { label: "CI/CD Pipeline", icon: "workflow" },
  { label: "Docker · Kubernetes", icon: "container" },
  { label: "Cloud Infrastructure", icon: "cloud" },
  { label: "Observability", icon: "activity" },
];

function PipelineStrip() {
  return (
    <Reveal delay={0.35} className="mt-16 lg:mt-20">
      <div className="glass rounded-2xl px-5 py-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-3">
          {PIPELINE_STEPS.map((step, index) => (
            <li key={step.label} className="flex items-center gap-1">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.08, duration: 0.4 }}
                className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2"
              >
                <Icon name={step.icon} className="size-4 text-cyan-300/80" />
                <span className="whitespace-nowrap font-mono text-[10.5px] text-zinc-400 sm:text-[11px]">
                  {step.label}
                </span>
              </motion.span>
              {index < PIPELINE_STEPS.length - 1 && (
                <ArrowRight
                  className="mx-0.5 hidden size-3.5 animate-pulse-soft text-zinc-600 md:block"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function Hero() {
  const reduceMotion = useReducedMotion();
  const tiltRef = useRef<HTMLDivElement>(null);

  const handleTilt = (event: MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el || reduceMotion) return;
    const rect = el.getBoundingClientRect();
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -5;
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
    el.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  };

  const resetTilt = () => {
    const el = tiltRef.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-32"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          {/* Left — identity */}
          <div>
            <Reveal>
              <p className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3.5 py-1.5 font-mono text-xs text-emerald-300">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                {profile.availability}
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="text-5xl font-bold leading-[1.04] tracking-tight text-white sm:text-6xl xl:text-7xl">
                Vinoth <span className="text-gradient-animated">Kumar S</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 font-mono text-lg text-cyan-300 sm:text-xl">
                DevOps Engineer
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Focus areas">
                {profile.headlineTags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-white/[0.09] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl leading-relaxed text-zinc-400">
                {profile.heroDescription}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="btn-shine inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  <FolderGit2 className="size-4" aria-hidden="true" />
                  View My Work
                </a>
                <a
                  href={profile.resumePath}
                  download
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-zinc-200 transition hover:border-cyan-300/40 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Download Resume
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex items-center gap-2.5">
                {socialEntries().map((network) => (
                  <SocialIconButton key={network} network={network} />
                ))}
                <span className="ml-2 hidden items-center gap-1.5 font-mono text-xs text-zinc-500 sm:inline-flex">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5" aria-hidden="true">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Kumbakonam, Tamil Nadu, India
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right — animated terminal with subtle 3D tilt */}
          <Reveal delay={0.2} className="relative">
            <div
              className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-cyan-500/[0.06] blur-3xl"
              aria-hidden="true"
            />
            <div
              ref={tiltRef}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              className="transition-transform duration-200 ease-out will-change-transform"
            >
              <DeployTerminal />
            </div>
          </Reveal>
        </div>

        <PipelineStrip />
      </div>
    </section>
  );
}
