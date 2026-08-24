"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Check, ChevronRight, X } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { BrandGithub, Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { Project } from "@/types";

function RepoButton({ repoUrl }: { repoUrl?: string }) {
  if (repoUrl) {
    return (
      <a
        href={repoUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-zinc-200 transition hover:border-cyan-300/40 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
      >
        <BrandGithub className="size-3.5" />
        GitHub
      </a>
    );
  }

  return (
    <span
      title="Repository URL not configured"
      aria-disabled="true"
      className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-2 text-xs font-medium text-zinc-600"
    >
      <BrandGithub className="size-3.5" />
      GitHub
    </span>
  );
}

function FlowPreview({ flow }: { flow: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-1.5" aria-hidden="true">
      {flow.map((step, index) => (
        <span key={step} className="flex items-center gap-1">
          <code className="rounded border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
            {step}
          </code>
          {index < flow.length - 1 && (
            <ChevronRight className="size-3 text-zinc-700" aria-hidden="true" />
          )}
        </span>
      ))}
    </div>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70]"
    >
      <div
        className="absolute inset-0 bg-zinc-950/85 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative mx-auto mt-[4vh] max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/60"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/[0.07] bg-zinc-950/95 px-6 py-4 backdrop-blur">
          <div>
            <h3 id="case-study-title" className="text-lg font-semibold tracking-tight text-white">
              {project.title}
            </h3>
            <p className="mt-0.5 font-mono text-xs text-cyan-300/90">{project.tagline}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
          >
            <X className="size-4.5" aria-hidden="true" />
          </button>
        </header>

        <div className="space-y-8 px-6 py-7">
          <section>
            <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500">Overview</h4>
            <p className="mt-3 leading-relaxed text-zinc-300">{project.description}</p>
          </section>

          <section>
            <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              Role & Responsibilities
            </h4>
            <ul className="mt-3 space-y-2">
              {project.responsibilities.map((item) => (
                <li key={item.slice(0, 40)} className="flex gap-2.5 text-sm leading-relaxed text-zinc-400">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-400/80" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              Technology Stack
            </h4>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
          </section>

          <section>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-zinc-500">
              Architecture
            </h4>
            <TerminalWindow title={`${project.id}/architecture.txt`}>
              <pre className="overflow-x-auto whitespace-pre text-[10.5px] leading-relaxed text-emerald-300/80 sm:text-xs">
                {project.architecture}
              </pre>
            </TerminalWindow>
          </section>
        </div>

        <footer className="flex flex-wrap items-center gap-2.5 border-t border-white/[0.07] px-6 py-4">
          <RepoButton repoUrl={project.repoUrl} />
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-zinc-200 transition hover:border-cyan-300/40 hover:text-cyan-100"
            >
              Live Demo
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          ) : null}
        </footer>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="projects" className="scroll-mt-20 py-24" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="$ ls -la ~/featured-work"
          title="Featured Projects"
          description="Infrastructure and automation work from production environments — deployment platforms, observability stacks, and secure delivery pipelines."
        />

        <h3 id="projects-heading" className="sr-only">
          Featured projects
        </h3>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 2) * 0.08}>
              <SpotlightCard
                as="article"
                className="glass group flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:border-cyan-300/25 hover:shadow-xl hover:shadow-cyan-500/[0.05] sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold tracking-tight text-white">
                      {project.title}
                    </h4>
                    <p className="mt-1 font-mono text-xs text-cyan-300/90">{project.tagline}</p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-300">
                    <Icon name={project.icon} className="size-5" />
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{project.description}</p>

                <FlowPreview flow={project.flow} />

                <ul className="mt-4 space-y-1.5">
                  {project.responsibilities.slice(0, 3).map((item) => (
                    <li key={item.slice(0, 40)} className="flex gap-2 text-[13px] leading-relaxed text-zinc-500">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-400/70" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 7).map((tech) => (
                      <Chip key={tech}>{tech}</Chip>
                    ))}
                    {project.tech.length > 7 && <Chip>+{project.tech.length - 7} more</Chip>}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-white/[0.06] pt-5">
                    <button
                      type="button"
                      onClick={() => setSelected(project)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-300/30 bg-cyan-400/10 px-3.5 py-2 text-xs font-medium text-cyan-200 transition hover:bg-cyan-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                      aria-haspopup="dialog"
                    >
                      <BookOpen className="size-3.5" aria-hidden="true" />
                      Case Study
                    </button>
                    <RepoButton repoUrl={project.repoUrl} />
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-zinc-200 transition hover:border-cyan-300/40 hover:text-cyan-100"
                      >
                        Live Demo
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <CaseStudyModal project={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
