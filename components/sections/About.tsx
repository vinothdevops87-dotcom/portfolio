"use client";

import { Fragment } from "react";
import { profile, aboutHighlights } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/icons";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

const STATS = [
  { value: 2, suffix: "+", label: "Years in DevOps & Cloud" },
  { value: 8, suffix: "", label: "Skill Domains" },
  { value: 5, suffix: "", label: "Certifications" },
  { value: 4, suffix: "", label: "Featured Builds" },
];

function PipelineViz() {
  return (
    <div className="mt-4 flex items-center gap-1.5" aria-hidden="true">
      {[0, 1, 2].map((step) => (
        <Fragment key={step}>
          <span
            className={`size-2 rounded-full ${
              step === 1 ? "animate-pulse-soft bg-cyan-300" : "bg-zinc-600"
            }`}
          />
          {step < 2 && <span className="h-px w-7 bg-zinc-700" />}
        </Fragment>
      ))}
      <span className="ml-2 font-mono text-[10px] text-zinc-600">build · scan · deploy</span>
    </div>
  );
}

function BarsViz() {
  const bars = [40, 70, 45, 90, 60, 80, 50];

  return (
    <div className="mt-4 flex h-8 items-end gap-1" aria-hidden="true">
      {bars.map((height, index) => (
        <span
          key={index}
          className="w-1.5 animate-pulse-soft rounded-sm bg-gradient-to-t from-cyan-500/40 to-emerald-400/80"
          style={{ height: `${height}%`, animationDelay: `${index * 180}ms` }}
        />
      ))}
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24" aria-labelledby="about-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="$ cat about.md" title="About Me" />

        {/* Stat band */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <SpotlightCard className="glass h-full rounded-xl px-5 py-6 text-center transition-colors duration-200 hover:border-cyan-300/25">
                <p className="text-gradient text-4xl font-bold tracking-tight">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                  {stat.label}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <h3 id="about-heading" className="sr-only">
              Professional background
            </h3>

            {profile.about.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 40)} delay={index * 0.06}>
                <p
                  className={`leading-relaxed text-zinc-400 ${index === 0 ? "text-lg text-zinc-300" : "mt-5"}`}
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <p className="mt-8 font-mono text-xs text-zinc-600">
                $ uptime — continuously learning, shipping, and automating.
              </p>
            </Reveal>
          </div>

          {/* Bento highlight grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutHighlights.map((highlight, index) => (
              <Reveal
                key={highlight.title}
                delay={index * 0.06}
                className={highlight.wide ? "sm:col-span-2" : ""}
              >
                <SpotlightCard
                  as="article"
                  className={`group glass h-full rounded-xl p-5 transition-colors duration-200 hover:border-cyan-300/30 ${
                    highlight.wide ? "sm:flex sm:items-center sm:gap-5" : ""
                  }`}
                >
                  <div className={highlight.wide ? "sm:flex-1" : ""}>
                    <span className="grid size-10 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-400/10 text-cyan-300 transition-colors group-hover:border-cyan-300/40">
                      <Icon name={highlight.icon} className="size-5" />
                    </span>
                    <h4 className="mt-4 font-medium text-white">{highlight.title}</h4>
                    <p className="mt-1 font-mono text-[11px] leading-relaxed text-zinc-500">
                      {highlight.description}
                    </p>
                  </div>

                  {highlight.viz === "pipeline" && <PipelineViz />}
                  {highlight.viz === "bars" && <BarsViz />}
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
