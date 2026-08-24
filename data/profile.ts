import type { HighlightCard, SocialLinks } from "@/types";

export const profile = {
  name: "Vinoth Kumar S",
  firstName: "Vinoth",
  lastName: "Kumar S",
  initials: "VK",
  role: "DevOps Engineer",
  headline: "DevOps Engineer | AWS | Docker | Kubernetes | CI/CD | Observability | DevSecOps",
  headlineTags: ["AWS", "Docker", "Kubernetes", "CI/CD", "Observability", "DevSecOps"],
  location: "Kumbakonam, Tamil Nadu, India",
  email: "vinothvkvk384@gmail.com",
  availability: "Available for DevOps & Cloud opportunities",

  /**
   * Path to the resume file served from /public.
   * Replace public/resume/vinoth-kumar-s-resume.pdf with the real resume.
   */
  resumePath: "/resume/vinoth-kumar-s-resume.pdf",

  /**
   * Social profiles. Add your real URLs here — buttons render as
   * placeholders until they are configured.
   */
  socials: {
    github: "",
    linkedin: "",
  } satisfies SocialLinks,

  heroDescription:
    "DevOps Engineer focused on building reliable, automated, and observable cloud infrastructure. Experienced in Linux server management, cloud infrastructure, CI/CD automation, Docker, Kubernetes, monitoring, logging, security, and production application deployments.",

  about: [
    "I am a DevOps Engineer with hands-on experience in Linux server management, cloud infrastructure, CI/CD automation, and container orchestration. I work with Docker, Kubernetes, AWS, GitHub Actions, Terraform, Ansible, Prometheus, Grafana, Loki, and modern DevSecOps practices.",
    "My work includes managing production deployments, hosting frontend and backend applications, building automated deployment pipelines, implementing centralized monitoring and logging, optimizing cloud resources, improving infrastructure reliability, and integrating security checks into software delivery workflows.",
    "I am also interested in cloud-native technologies, FinOps, MLOps integrations, and AI-powered automation for DevOps and software delivery workflows.",
  ],
};

export const aboutHighlights: HighlightCard[] = [
  {
    title: "Cloud Infrastructure",
    description: "AWS · DigitalOcean · Hostinger",
    icon: "cloud",
    wide: true,
  },
  {
    title: "CI/CD Automation",
    description: "GitHub Actions · Jenkins · Argo CD",
    icon: "workflow",
    viz: "pipeline",
  },
  {
    title: "Observability",
    description: "Prometheus · Grafana · Loki · Promtail",
    icon: "activity",
    viz: "bars",
  },
  {
    title: "Container Orchestration",
    description: "Docker · Swarm · Kubernetes · k3s",
    icon: "container",
  },
  {
    title: "DevSecOps",
    description: "SonarQube · Trivy · secure pipelines",
    icon: "shield",
  },
  {
    title: "Cost Optimization",
    description: "Resource audits · right-sizing · cleanup",
    icon: "piggy",
  },
];

export const seoKeywords = [
  "Vinoth Kumar S",
  "DevOps Engineer",
  "Cloud Engineer",
  "Site Reliability Engineer",
  "SRE",
  "Platform Engineer",
  "AWS",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "GitHub Actions",
  "Terraform",
  "Ansible",
  "Prometheus",
  "Grafana",
  "Loki",
  "Promtail",
  "SonarQube",
  "Trivy",
  "DevSecOps",
  "FinOps",
  "MLOps",
  "AIOps",
  "Cloud Infrastructure",
  "Observability",
  "Linux Administration",
  "Nginx",
  "PostgreSQL",
  "Cloudflare",
];
