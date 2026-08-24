import { focusAreas } from "@/data/infrastructure";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/icons";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";

export function CurrentFocus() {
  return (
    <section id="focus" className="scroll-mt-20 py-24" aria-labelledby="focus-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="$ watch -n1 ./exploring.sh"
          title="Currently Exploring"
          description="Areas I am actively learning and experimenting with right now."
        />

        <h3 id="focus-heading" className="sr-only">
          Current learning focus areas
        </h3>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((area, index) => (
            <Reveal key={area.title} delay={(index % 3) * 0.06}>
              <SpotlightCard
                as="article"
                className="group glass h-full rounded-xl p-6 transition-colors duration-200 hover:border-cyan-300/25"
              >
                <span className="inline-grid size-10 place-items-center rounded-lg border border-violet-300/20 bg-violet-400/10 text-violet-300 transition-colors group-hover:border-violet-300/40">
                  <Icon name={area.icon} className="size-5" />
                </span>
                <h4 className="mt-4 font-medium leading-snug text-white">{area.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{area.description}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
