import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal className={centered ? "text-center" : "text-left"}>
      <p className="mb-3 font-mono text-sm text-cyan-300/90">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {description ? (
        <p
          className={`mt-4 leading-relaxed text-zinc-400 ${centered ? "mx-auto max-w-2xl" : ""}`}
        >
          {description}
        </p>
      ) : null}
      <div
        className={`mt-6 h-px w-16 bg-gradient-to-r from-cyan-400 to-emerald-400 ${
          centered ? "mx-auto" : ""
        }`}
        aria-hidden="true"
      />
    </Reveal>
  );
}
