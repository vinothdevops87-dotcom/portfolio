import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "cloud",
    title: "Cloud & Infrastructure",
    icon: "cloud",
    blurb: "Cloud platforms, compute, storage, networking and DNS management.",
    skills: [
      { name: "AWS", icon: "cloud" },
      { name: "DigitalOcean", icon: "server" },
      { name: "Hostinger", icon: "drive" },
    ],
    subGroups: [
      {
        label: "AWS Core Services",
        items: ["EC2", "S3", "VPC", "Route 53", "IAM"],
      },
    ],
  },
  {
    id: "containers",
    title: "Containers & Orchestration",
    icon: "container",
    blurb: "Containerization and cluster tooling across production environments.",
    skills: [
      { name: "Docker", icon: "ship" },
      { name: "Docker Compose", icon: "layers" },
      { name: "Docker Swarm", icon: "boxes" },
      { name: "Kubernetes", icon: "anchor" },
      { name: "k0s", icon: "boxes" },
      { name: "k3s", icon: "boxes" },
      { name: "Minikube", icon: "boxes" },
      { name: "Helm", icon: "compass" },
    ],
  },
  {
    id: "cicd",
    title: "CI/CD & Automation",
    icon: "workflow",
    blurb: "Pipeline design, infrastructure as code and configuration management.",
    skills: [
      { name: "GitHub Actions", icon: "workflow" },
      { name: "Jenkins", icon: "server-cog" },
      { name: "Argo CD", icon: "refresh" },
      { name: "Ansible", icon: "zap" },
      { name: "Terraform", icon: "layers" },
    ],
  },
  {
    id: "observability",
    title: "Observability",
    icon: "activity",
    blurb: "Metrics, dashboards and centralized logging for production systems.",
    skills: [
      { name: "Prometheus", icon: "gauge" },
      { name: "Grafana", icon: "trending-up" },
      { name: "Loki", icon: "logs" },
      { name: "Promtail", icon: "radar" },
    ],
  },
  {
    id: "security",
    title: "Security & Networking",
    icon: "shield",
    blurb: "Secure delivery workflows, edge networking and encryption.",
    skills: [
      { name: "SonarQube", icon: "searchcode" },
      { name: "Trivy", icon: "shield-check" },
      { name: "Cloudflare", icon: "cloud" },
      { name: "DNS Management", icon: "network" },
      { name: "SSL/TLS", icon: "lock" },
      { name: "Zero Trust Concepts", icon: "key" },
    ],
  },
  {
    id: "db-web",
    title: "Databases & Web Infrastructure",
    icon: "database",
    blurb: "Data stores and the serving layer that keeps applications online.",
    skills: [
      { name: "PostgreSQL", icon: "database" },
      { name: "Nginx", icon: "server" },
      { name: "Nginx Proxy Manager", icon: "network" },
      { name: "PM2", icon: "server-cog" },
    ],
  },
  {
    id: "os-vcs",
    title: "Operating Systems & Version Control",
    icon: "terminal",
    blurb: "Daily drivers for server administration and source control.",
    skills: [
      { name: "Linux", icon: "terminal" },
      { name: "Shell Scripting", icon: "braces" },
      { name: "Git", icon: "git-branch" },
      { name: "GitHub", icon: "github" },
    ],
  },
  {
    id: "methodologies",
    title: "Methodologies",
    icon: "compass",
    blurb: "Operating principles applied across delivery and operations.",
    skills: [
      { name: "GitOps", icon: "git-merge" },
      { name: "Agile", icon: "refresh" },
      { name: "DevSecOps", icon: "shield" },
      { name: "FinOps", icon: "piggy" },
      { name: "MLOps Integrations", icon: "sparkles" },
    ],
  },
];
