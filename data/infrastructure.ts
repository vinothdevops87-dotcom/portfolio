import type { FocusArea, InfraEdge, InfraNode, InfraSystem } from "@/types";

/** Node coordinates are percentages inside the desktop diagram canvas. */
export const infraNodes: InfraNode[] = [
  {
    id: "internet",
    label: "Internet",
    purpose: "Incoming user traffic from browsers, mobile apps, and integrations.",
    tech: ["HTTPS"],
    icon: "globe",
    x: 50,
    y: 7,
  },
  {
    id: "cloudflare",
    label: "Cloudflare",
    purpose: "Edge proxy providing DNS, SSL/TLS termination, firewall rules, and CDN caching in front of production workloads.",
    tech: ["DNS A/CNAME", "SSL/TLS", "Firewall Rules", "Proxy"],
    icon: "cloud",
    x: 50,
    y: 23,
  },
  {
    id: "dns-ssl",
    label: "DNS / SSL",
    purpose: "Domain routing and certificate management keeping traffic encrypted end to end.",
    tech: ["Route 53", "Cloudflare DNS", "TLS Certificates"],
    icon: "lock",
    x: 50,
    y: 39,
  },
  {
    id: "proxy",
    label: "Nginx Reverse Proxy",
    purpose: "Single entry point that routes requests, serves static frontend builds, and terminates TLS behind the edge.",
    tech: ["Nginx", "SSL/TLS", "Reverse Proxy"],
    icon: "network",
    x: 50,
    y: 55,
  },
  {
    id: "frontend",
    label: "Frontend",
    purpose: "React Native web and Next.js builds served through Nginx, kept continuously up by PM2 where applicable.",
    tech: ["Next.js", "React Native Web", "Nginx", "PM2"],
    icon: "layers",
    x: 26,
    y: 72,
  },
  {
    id: "backend",
    label: "Backend API",
    purpose: "FastAPI services orchestrated with Docker Compose, handling business logic and background processing.",
    tech: ["FastAPI", "Docker Compose"],
    icon: "cpu",
    x: 64,
    y: 72,
  },
  {
    id: "redis",
    label: "Redis",
    purpose: "In-memory store for caching, queues, and Celery message brokering.",
    tech: ["Redis", "Docker"],
    icon: "zap",
    x: 40,
    y: 89,
  },
  {
    id: "celery",
    label: "Celery Workers",
    purpose: "Asynchronous task execution for background jobs and scheduled workloads.",
    tech: ["Celery", "Python"],
    icon: "boxes",
    x: 64,
    y: 89,
  },
  {
    id: "postgres",
    label: "PostgreSQL",
    purpose: "Primary relational datastore with automated backup and maintenance workflows.",
    tech: ["PostgreSQL", "Backup Automation"],
    icon: "database",
    x: 88,
    y: 89,
  },
];

export const infraEdges: InfraEdge[] = [
  { from: "internet", to: "cloudflare" },
  { from: "cloudflare", to: "dns-ssl" },
  { from: "dns-ssl", to: "proxy" },
  { from: "proxy", to: "frontend" },
  { from: "proxy", to: "backend" },
  { from: "frontend", to: "backend", label: "API traffic" },
  { from: "backend", to: "redis" },
  { from: "backend", to: "celery" },
  { from: "backend", to: "postgres" },
];

export const infraSystems: InfraSystem[] = [
  {
    id: "observability",
    title: "Observability",
    icon: "gauge",
    purpose: "Metrics collection and visualization for servers, containers, and applications.",
    tech: ["Prometheus", "Grafana", "Node Exporter", "cAdvisor"],
    steps: ["Node Exporter · cAdvisor", "Prometheus", "Grafana"],
  },
  {
    id: "logging",
    title: "Centralized Logging",
    icon: "logs",
    purpose: "Log aggregation enabling error investigation and incident analysis from one place.",
    tech: ["Promtail", "Loki", "Grafana"],
    steps: ["Applications", "Promtail", "Loki", "Grafana Logs"],
  },
  {
    id: "cicd",
    title: "CI/CD",
    icon: "workflow",
    purpose: "Automated build and deployment pipelines triggered straight from Git.",
    tech: ["Git", "GitHub Actions", "Docker", "SSH"],
    steps: ["GitHub", "GitHub Actions", "Deployment"],
  },
  {
    id: "security",
    title: "Security",
    icon: "shield",
    purpose: "Layered protection at the edge and automated checks inside the delivery pipeline.",
    tech: ["Cloudflare", "SSL/TLS", "SonarQube", "Trivy"],
    steps: ["Cloudflare", "SSL/TLS", "SonarQube", "Trivy"],
  },
];

export const focusAreas: FocusArea[] = [
  {
    title: "Kubernetes & Cloud-Native Infrastructure",
    description:
      "Improving knowledge of container orchestration and production infrastructure patterns.",
    icon: "anchor",
  },
  {
    title: "AIOps",
    description:
      "Exploring AI-powered infrastructure monitoring, incident analysis, and DevOps automation.",
    icon: "brain",
  },
  {
    title: "FinOps",
    description:
      "Improving cloud resource utilization and infrastructure cost optimization.",
    icon: "piggy",
  },
  {
    title: "DevSecOps",
    description:
      "Building more secure CI/CD workflows with automated security and vulnerability scanning.",
    icon: "shield",
  },
  {
    title: "MLOps Integrations",
    description:
      "Exploring how DevOps practices and AI/ML infrastructure can work together.",
    icon: "sparkles",
  },
];
