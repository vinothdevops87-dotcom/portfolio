"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import {
  infraEdges,
  infraNodes,
  infraSystems,
} from "@/data/infrastructure";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";
import { Icon, type IconKey } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";

interface PanelEntry {
  title: string;
  icon: IconKey;
  purpose: string;
  tech: string[];
}

const nodeEntries = new Map<string, PanelEntry>(
  infraNodes.map((node) => [
    node.id,
    { title: node.label, icon: node.icon, purpose: node.purpose, tech: node.tech },
  ]),
);

const systemEntries = new Map<string, PanelEntry>(
  infraSystems.map((system) => [
    system.id,
    { title: system.title, icon: system.icon, purpose: system.purpose, tech: system.tech },
  ]),
);

function InfoPanel({ selected }: { selected: string }) {
  const entry =
    nodeEntries.get(selected) ?? systemEntries.get(selected) ?? nodeEntries.get("proxy")!;

  return (
    <aside
      aria-live="polite"
      className="glass rounded-2xl p-6 xl:sticky xl:top-24"
      aria-label="Component details"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-cyan-300/25 bg-cyan-400/10 text-cyan-300">
          <Icon name={entry.icon} className="size-5" />
        </span>
        <h4 className="font-semibold tracking-tight text-white">{entry.title}</h4>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-zinc-400">{entry.purpose}</p>

      <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
        Technologies
      </p>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {entry.tech.map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </div>
    </aside>
  );
}

export function Infrastructure() {
  const [selected, setSelected] = useState("cloudflare");

  const activeEdges = useMemo(
    () =>
      new Set(
        infraEdges
          .filter((edge) => edge.from === selected || edge.to === selected)
          .flatMap((edge) => [`${edge.from}-${edge.to}`, `${edge.to}-${edge.from}`]),
      ),
    [selected],
  );

  const select = (id: string) => () => setSelected(id);

  return (
    <section id="infrastructure" className="scroll-mt-20 py-24" aria-labelledby="infra-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="$ kubectl get architecture -o wide"
          title="Infrastructure & Platform Design"
          description="A reference view of the production topology I operate — edge networking, application tier, data services, and the observability and delivery systems around them. Hover or tap any component to inspect it."
        />

        <h3 id="infra-heading" className="sr-only">
          Interactive infrastructure diagram
        </h3>

        <Reveal className="mt-14">
          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_330px]">
            {/* Diagram canvas — desktop */}
            <div
              className="relative hidden h-[480px] overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] bg-grid-faint lg:h-[520px] md:block"
              role="img"
              aria-label={`Infrastructure topology diagram, currently inspecting ${nodeEntries.get(selected)?.title ?? "a component"}`}
            >
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {infraEdges.map((edge) => {
                  const from = infraNodes.find((node) => node.id === edge.from)!;
                  const to = infraNodes.find((node) => node.id === edge.to)!;
                  const isActive = activeEdges.has(`${edge.from}-${edge.to}`);
                  return (
                    <line
                      key={`${edge.from}-${edge.to}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke={isActive ? "rgba(34, 211, 238, 0.75)" : "rgba(161, 161, 170, 0.28)"}
                      strokeWidth={1}
                      strokeDasharray="5 5"
                      vectorEffect="non-scaling-stroke"
                      className={isActive ? "animate-dash-flow" : undefined}
                    />
                  );
                })}
              </svg>

              {/* API traffic label between frontend and backend */}
              <span
                className="absolute -translate-x-1/2 -translate-y-[26px] bg-transparent px-1 font-mono text-[9px] text-zinc-600"
                style={{ left: "45%", top: "72%" }}
                aria-hidden="true"
              >
                api traffic
              </span>

              {infraNodes.map((node) => {
                const isSelected = node.id === selected;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={select(node.id)}
                    onMouseEnter={select(node.id)}
                    onFocus={select(node.id)}
                    aria-pressed={isSelected}
                    aria-label={`${node.label} — show details`}
                    className="group/node absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 focus-visible:outline-none"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    <span
                      className={`grid size-11 place-items-center rounded-xl border backdrop-blur transition-all duration-200 ${
                        isSelected
                          ? "scale-110 border-cyan-300/60 bg-cyan-400/15 text-cyan-200 shadow-[0_0_24px_-6px_rgba(34,211,238,0.55)]"
                          : "border-white/10 bg-zinc-900/85 text-zinc-300 group-hover/node:border-cyan-300/40 group-hover/node:text-cyan-200"
                      }`}
                    >
                      <Icon name={node.icon} className="size-5" />
                    </span>
                    <span
                      className={`whitespace-nowrap text-[10.5px] font-medium transition-colors ${
                        isSelected ? "text-cyan-200" : "text-zinc-500"
                      }`}
                    >
                      {node.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Stacked flow — mobile */}
            <ul className="space-y-2 md:hidden">
              {infraNodes.map((node, index) => {
                const isSelected = node.id === selected;
                return (
                  <li key={node.id}>
                    <button
                      type="button"
                      onClick={select(node.id)}
                      aria-expanded={isSelected}
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 ${
                        isSelected
                          ? "border-cyan-300/50 bg-cyan-400/10"
                          : "border-white/[0.08] bg-white/[0.02]"
                      }`}
                    >
                      <span
                        className={`grid size-9 shrink-0 place-items-center rounded-lg border ${
                          isSelected
                            ? "border-cyan-300/40 bg-cyan-400/15 text-cyan-200"
                            : "border-white/10 bg-zinc-900/70 text-zinc-300"
                        }`}
                      >
                        <Icon name={node.icon} className="size-4" />
                      </span>
                      <span
                        className={`text-sm font-medium ${isSelected ? "text-white" : "text-zinc-300"}`}
                      >
                        {node.label}
                      </span>
                      <ChevronRight
                        className={`ml-auto size-4 transition-transform ${
                          isSelected ? "rotate-90 text-cyan-300" : "text-zinc-600"
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {index < infraNodes.length - 1 && !isSelected && (
                      <div className="mx-auto h-2 w-px bg-white/10" aria-hidden="true" />
                    )}
                  </li>
                );
              })}
            </ul>

            <InfoPanel selected={selected} />
          </div>
        </Reveal>

        {/* Supporting systems */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {infraSystems.map((system, index) => {
            const isSelected = system.id === selected;
            return (
              <Reveal key={system.id} delay={index * 0.06}>
                <button
                  type="button"
                  onClick={select(system.id)}
                  aria-pressed={isSelected}
                  className={`glass h-full w-full rounded-xl p-5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 ${
                    isSelected ? "border-cyan-300/40 bg-cyan-400/[0.06]" : "hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon name={system.icon} className="size-4 shrink-0 text-cyan-300" />
                    <h4 className="text-sm font-semibold text-white">{system.title}</h4>
                  </div>
                  <p className="mt-3 flex flex-wrap items-center gap-x-1 gap-y-1 font-mono text-[10px] text-zinc-500">
                    {system.steps.map((step, stepIndex) => (
                      <span key={step} className="flex items-center gap-1">
                        <code>{step}</code>
                        {stepIndex < system.steps.length - 1 && (
                          <ArrowRight className="size-3 text-zinc-700" aria-hidden="true" />
                        )}
                      </span>
                    ))}
                  </p>
                  <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-zinc-500">
                    {system.purpose}
                  </p>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
