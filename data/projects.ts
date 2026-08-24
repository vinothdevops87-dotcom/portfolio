import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "ailaysa-tiger-infrastructure",
    title: "Ailaysa Tiger Infrastructure",
    tagline: "Production platform · Full-stack deployment environment",
    description:
      "Production infrastructure and deployment environment for a full-stack application — from Cloudflare edge to containerized backend services, with automated CI/CD, metrics, and centralized logging.",
    icon: "rocket",
    tech: [
      "Next.js",
      "Docker",
      "Docker Compose",
      "FastAPI",
      "Redis",
      "Celery",
      "Nginx",
      "PM2",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
      "Loki",
      "Promtail",
    ],
    responsibilities: [
      "Managed production infrastructure and release workflows end to end.",
      "Built an automated build-and-deploy pipeline with GitHub Actions.",
      "Served React Native web builds via Nginx; ran Next.js on PM2.",
      "Deployed the FastAPI backend alongside Redis and Celery workers.",
      "Instrumented Prometheus metrics and centralized Loki logging.",
    ],
    flow: ["Users", "Cloudflare", "Nginx / SSL", "Next.js + FastAPI", "Redis · Celery · DB"],
    architecture: `                    Users
                      |
                      v
                 Cloudflare
                      |
                      v
               Nginx / SSL Layer
                      |
          +-----------+-----------+
          |                       |
          v                       v
     Next.js App             Backend API
                                      |
                    +--------+--------+--------+
                    |                 |        |
                    v                 v        v
                  Redis         Celery Workers  Database


Monitoring:
Prometheus -> Grafana

Logging:
Applications -> Promtail -> Loki -> Grafana

Deployment:
GitHub -> GitHub Actions -> Production Server`,
  },
  {
    id: "monitoring-logging-platform",
    title: "Centralized Monitoring & Logging Platform",
    tagline: "Observability · Metrics, dashboards & logs",
    description:
      "A centralized observability platform for monitoring infrastructure health, containers, and application behavior — bringing metrics and logs into a single view for faster troubleshooting.",
    icon: "activity",
    tech: [
      "Prometheus",
      "Grafana",
      "Loki",
      "Promtail",
      "Node Exporter",
      "cAdvisor",
      "Docker",
    ],
    responsibilities: [
      "Collected server resource metrics with Node Exporter.",
      "Monitored containers with cAdvisor and application metrics.",
      "Built Grafana dashboards for infrastructure visibility.",
      "Shipped centralized logs via Promtail into Loki.",
      "Accelerated error investigation and production troubleshooting.",
    ],
    flow: ["Servers & Apps", "Exporters · Promtail", "Prometheus · Loki", "Grafana"],
    architecture: `Linux Server
     |
     |-- Node Exporter
     |-- cAdvisor
     +-- Application Metrics
              |
              v
         Prometheus
              |
              v
           Grafana


Applications
     |
     v
  Promtail
     |
     v
    Loki
     |
     v
  Grafana Logs`,
  },
  {
    id: "automated-ci-cd-pipeline",
    title: "Automated CI/CD Pipeline",
    tagline: "Release automation · Push-to-deploy",
    description:
      "An automated deployment workflow that removes repetitive manual deployment steps and improves release consistency for production applications.",
    icon: "workflow",
    tech: ["GitHub", "GitHub Actions", "Docker", "Linux", "SSH", "Nginx"],
    responsibilities: [
      "Triggered reproducible builds on every push to GitHub.",
      "Automated dependency install, build, and packaging stages.",
      "Deployed artifacts to the production server over SSH.",
      "Reduced deployment time and manual deployment errors.",
    ],
    flow: ["Developer", "Git Push", "GitHub Actions", "Build", "Production Server"],
    architecture: `Developer
    |
    v
Git Push
    |
    v
GitHub Repository
    |
    v
GitHub Actions
    |
    |-- Install Dependencies
    |-- Run Build
    |-- Build Application
    +-- Deploy
            |
            v
      Production Server`,
  },
  {
    id: "devsecops-pipeline",
    title: "DevSecOps Pipeline",
    tagline: "Secure delivery · Quality & vulnerability gates",
    description:
      "A secure software delivery workflow integrating automated code quality analysis and container vulnerability scanning directly into the CI pipeline.",
    icon: "shield-check",
    tech: ["GitHub Actions", "SonarQube", "Trivy", "Docker"],
    responsibilities: [
      "Wired SonarQube code quality scans into the CI pipeline.",
      "Scanned built Docker images with Trivy for vulnerabilities.",
      "Integrated quality and security gates before deployment.",
      "Shifted security checks left in the software delivery lifecycle.",
    ],
    flow: ["Code Push", "SonarQube Scan", "Docker Build", "Trivy Scan", "Deployment"],
    architecture: `Code Push
    |
    v
CI Pipeline
    |
    |-- Code Quality Scan
    |       |
    |       v
    |   SonarQube
    |
    |-- Build Docker Image
    |
    |-- Vulnerability Scan
    |       |
    |       v
    |      Trivy
    |
    v
Deployment`,
  },
];
