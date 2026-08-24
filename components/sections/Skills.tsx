"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function Skills() {
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const active = skillCategories.find((category) => category.id === activeId) ?? skillCategories[0];

  return (
    <section id="skills" className="scroll-mt-20 py-24" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="$ ./skills.sh --list-all"
          title="Technical Skills"
          description="Tooling and platforms I use day to day across cloud infrastructure, delivery pipelines, observability, and security."
        />

        <Reveal className="mt-12">
          <h3 id="skills-heading" className="sr-only">
            Skill categories
          </h3>
          <div
            role="tablist"
            aria-label="Skill categories"
            className="flex gap-2 overflow-x-auto pb-2"
          >
            {skillCategories.map((category) => {
              const selected = category.id === activeId;
              return (
                <button
                  key={category.id}
                  id={`tab-${category.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`panel-${category.id}`}
                  onClick={() => setActiveId(category.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-lg border px-3.5 py-2 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 ${
                    selected
                      ? "border-cyan-300/40 bg-cyan-400/10 text-cyan-200"
                      : "border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-zinc-100"
                  }`}
                >
                  <Icon name={category.icon} className="size-4" />
                  <span className="whitespace-nowrap">{category.title}</span>
                  <span className="font-mono text-[10px] text-zinc-600">
                    {category.skills.length}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              id={`panel-${active.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${active.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-6"
            >
              <SpotlightCard className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors duration-200 hover:border-cyan-300/20 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="text-lg font-semibold text-white">{active.title}</h4>
                  <p className="font-mono text-xs text-zinc-500">{active.blurb}</p>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {active.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center gap-2 rounded-lg border border-white/[0.09] bg-zinc-900/60 px-3.5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/40"
                    >
                      <Icon name={skill.icon} className="size-4 shrink-0 text-cyan-300/80" />
                      <span className="text-sm text-zinc-200">{skill.name}</span>
                    </li>
                  ))}
                </ul>

                {active.subGroups?.map((group) => (
                  <div key={group.label} className="mt-7 rounded-xl border border-dashed border-white/[0.1] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                      {group.label}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <li key={item}>
                          <Chip className="bg-white/[0.02] text-zinc-400">{item}</Chip>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </SpotlightCard>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
