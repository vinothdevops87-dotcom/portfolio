import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    role: "DevOps Engineer",
    company: "Ailaysa",
    period: "Oct 2025 – Present",
    current: true,
    summary:
      "Managing production infrastructure, release automation, observability, and cost optimization across multi-cloud environments.",
    groups: [
      {
        title: "Infrastructure Management",
        points: [
          "Managed and scaled infrastructure across AWS, DigitalOcean, and Hostinger.",
          "Worked with Linux servers and multiple Kubernetes environments.",
          "Supported infrastructure availability and production application hosting.",
        ],
      },
      {
        title: "Ailaysa Tiger Infrastructure",
        points: [
          "Managed infrastructure and release workflows for the Ailaysa Tiger application.",
          "Built an automated CI/CD pipeline using GitHub Actions.",
          "Reduced deployment time from approximately 30 minutes to 15 minutes.",
          "Reduced manual deployment errors through automation.",
        ],
        chips: ["GitHub Actions"],
      },
      {
        title: "Application Deployment",
        points: [
          "Deployed frontend and full-stack applications.",
          "Served React Native web builds using Nginx.",
          "Ran Next.js applications on PM2 for process management and continuous uptime.",
        ],
        chips: ["Nginx", "PM2", "Next.js"],
      },
      {
        title: "FinOps & Cost Optimization",
        points: [
          "Conducted cloud resource audits across DigitalOcean and AWS.",
          "Identified over-provisioned infrastructure.",
          "Reviewed unused volumes and snapshots.",
          "Improved infrastructure cost efficiency through right-sizing and cleanup.",
        ],
      },
      {
        title: "Monitoring & Logging",
        points: [
          "Engineered centralized monitoring and logging infrastructure.",
          "Improved production observability.",
          "Enabled faster troubleshooting and incident analysis.",
        ],
        chips: ["Prometheus", "Grafana", "Loki", "Promtail"],
      },
      {
        title: "Cloudflare & Networking",
        points: [
          "Managed DNS A records and CNAME records.",
          "Handled SSL/TLS certificates and firewall rules.",
          "Configured Cloudflare proxying for production domains.",
        ],
        chips: ["DNS", "SSL/TLS", "Firewall Rules", "Proxy"],
      },
      {
        title: "Database Operations",
        points: [
          "Automated PostgreSQL backup and maintenance workflows.",
          "Supported disaster recovery strategies for production databases.",
        ],
      },
      {
        title: "DevSecOps",
        points: [
          "Integrated automated security checks into deployment workflows.",
          "Ran SonarQube for code quality analysis.",
          "Ran Trivy for container vulnerability scanning.",
        ],
        chips: ["SonarQube", "Trivy"],
      },
      {
        title: "Release Communication",
        points: [
          "Improved deployment release and rollback procedures.",
          "Integrated automated Slack notifications for release workflows.",
        ],
        chips: ["Slack Notifications"],
      },
      {
        title: "AI & Automation",
        points: [
          "Explored agentic AI frameworks such as CrewAI.",
          "Investigated AI-powered automation for DevOps and SDLC workflows.",
        ],
        chips: ["CrewAI"],
      },
    ],
  },
  {
    role: "DevOps Intern",
    company: "Plattr Tech Studio",
    location: "Madurai",
    period: "Feb 2024 – Sep 2024",
    summary:
      "Foundation-building internship focused on CI/CD automation, AWS cloud operations, and hands-on DevOps practices.",
    groups: [
      {
        title: "CI/CD & Deployment Automation",
        points: [
          "Assisted with CI/CD pipeline design using GitHub Actions and Jenkins.",
          "Worked on deployment automation for application releases.",
          "Supported improvements to deployment reliability and development feedback cycles.",
        ],
        chips: ["GitHub Actions", "Jenkins"],
      },
      {
        title: "AWS Cloud Operations",
        points: [
          "Supported AWS cloud operations using EC2, S3, VPC, and Route 53.",
          "Followed DevSecOps practices in staging environments.",
        ],
        chips: ["EC2", "S3", "VPC", "Route 53"],
      },
      {
        title: "Collaboration",
        points: [
          "Collaborated with development and infrastructure teams in an Agile environment.",
        ],
      },
    ],
  },
];
