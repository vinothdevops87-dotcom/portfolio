import { CalendarRange, Check, ChevronRight, MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-24" aria-labelledby="experience-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="$ git log --career --oneline"
          title="Professional Experience"
        />

        <h3 id="experience-heading" className="sr-only">
          Work history timeline
        </h3>

        <div className="relative mt-14">
          <div
            className="absolute bottom-3 left-[7px] top-2 w-px bg-gradient-to-b from-cyan-400/60 via-white/10 to-transparent"
            aria-hidden="true"
          />
          <ol className="space-y-14">
            {experience.map((job) => (
              <li key={`${job.company}-${job.period}`} className="relative pl-10 sm:pl-12">
                <span
                  className="absolute left-0 top-2 size-[15px] rounded-full border-2 border-cyan-300 bg-zinc-950 shadow-[0_0_12px_-2px_rgba(34,211,238,0.7)]"
                  aria-hidden="true"
                />

                <Reveal>
                  <article>
                    <header className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <h4 className="text-xl font-semibold tracking-tight text-white">
                        {job.role}
                      </h4>
                      <span className="font-medium text-cyan-300">@ {job.company}</span>
                      {job.current && (
                        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-300">
                          Current
                        </span>
                      )}
                    </header>

                    <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-xs text-zinc-500">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarRange className="size-3.5" aria-hidden="true" />
                        {job.period}
                      </span>
                      {job.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="size-3.5" aria-hidden="true" />
                          {job.location}
                        </span>
                      )}
                    </div>

                    <p className="mt-4 max-w-3xl leading-relaxed text-zinc-400">{job.summary}</p>

                    <div className="mt-7 grid gap-x-10 gap-y-7 md:grid-cols-2">
                      {job.groups.map((group) => (
                        <section key={group.title}>
                          <h5 className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-cyan-300/80">
                            <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
                            {group.title}
                          </h5>
                          <ul className="mt-3 space-y-2">
                            {group.points.map((point) => (
                              <li
                                key={point.slice(0, 40)}
                                className="flex gap-2.5 text-sm leading-relaxed text-zinc-400"
                              >
                                <Check
                                  className="mt-0.5 size-3.5 shrink-0 text-emerald-400/80"
                                  aria-hidden="true"
                                />
                                {point}
                              </li>
                            ))}
                          </ul>
                          {group.chips && group.chips.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {group.chips.map((chip) => (
                                <Chip key={chip}>{chip}</Chip>
                              ))}
                            </div>
                          )}
                        </section>
                      ))}
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
