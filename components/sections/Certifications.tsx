import { GraduationCap } from "lucide-react";
import { certifications, education } from "@/data/certifications";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BadgeCheck } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";

export function Certifications() {
  return (
    <section
      id="certifications"
      className="scroll-mt-20 py-24"
      aria-labelledby="certifications-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="$ ls ~/credentials"
          title="Certifications & Education"
        />

        <h3 id="certifications-heading" className="sr-only">
          Certifications and education
        </h3>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((certification, index) => (
            <Reveal key={certification.title} delay={(index % 3) * 0.06}>
              <SpotlightCard
                as="article"
                className="glass h-full rounded-xl p-5 transition-colors duration-200 hover:border-cyan-300/25"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-10 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-400/10 text-cyan-300">
                    <BadgeCheck className="size-5" aria-hidden="true" />
                  </span>
                  {certification.year && (
                    <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                      {certification.year}
                    </span>
                  )}
                </div>
                <h4 className="mt-4 font-medium leading-snug text-white">{certification.title}</h4>
                <p className="mt-1.5 text-sm text-zinc-500">{certification.issuer}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Education */}
        <Reveal className="mt-16">
          <div className="mb-6 flex items-center gap-2.5">
            <GraduationCap className="size-5 text-cyan-300" aria-hidden="true" />
            <h3 className="text-lg font-semibold tracking-tight text-white">Education</h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {education.map((item) => (
              <article key={item.degree + item.period} className="glass rounded-xl p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-medium text-white">
                    {item.degree} — {item.field}
                  </h4>
                  <span className="font-mono text-xs text-zinc-500">{item.period}</span>
                </div>
                <p className="mt-1.5 text-sm text-zinc-400">{item.institution}</p>
                <p className="mt-3 inline-block rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-zinc-400">
                  {item.score}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
