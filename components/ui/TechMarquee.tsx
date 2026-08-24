const TICKER_ITEMS = [
  "Docker",
  "Kubernetes",
  "AWS",
  "Terraform",
  "Ansible",
  "GitHub Actions",
  "Jenkins",
  "Argo CD",
  "Helm",
  "Prometheus",
  "Grafana",
  "Loki",
  "Promtail",
  "SonarQube",
  "Trivy",
  "Nginx",
  "PostgreSQL",
  "Cloudflare",
  "Linux",
  "PM2",
  "Redis",
  "DigitalOcean",
];

function TickerRow({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden ?? undefined}>
      {TICKER_ITEMS.map((item) => (
        <li key={item} className="flex items-center">
          <span className="whitespace-nowrap px-5 font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
            {item}
          </span>
          <span className="text-[8px] text-cyan-500/50" aria-hidden="true">
            ◆
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Infinite horizontal tech ticker — pauses via reduced-motion media query. */
export function TechMarquee() {
  return (
    <div
      className="marquee-mask overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-4"
      role="presentation"
    >
      <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
        <TickerRow />
        <TickerRow hidden />
      </div>
    </div>
  );
}
