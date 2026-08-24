import type { IconKey } from "@/components/ui/icons";

export interface SocialLinks {
  github?: string;
  linkedin?: string;
}

export interface SkillItem {
  name: string;
  icon: IconKey;
  note?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: IconKey;
  blurb: string;
  skills: SkillItem[];
  subGroups?: {
    label: string;
    items: string[];
  }[];
}

export interface ExperienceGroup {
  title: string;
  points: string[];
  chips?: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location?: string;
  current?: boolean;
  summary: string;
  groups: ExperienceGroup[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: IconKey;
  tech: string[];
  responsibilities: string[];
  flow: string[];
  architecture: string;
  repoUrl?: string;
  demoUrl?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year?: string;
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  period: string;
  score: string;
}

export interface HighlightCard {
  title: string;
  description: string;
  icon: IconKey;
  /** Span both columns in the bento grid. */
  wide?: boolean;
  /** Decorative micro-visualization rendered inside the card. */
  viz?: "pipeline" | "bars";
}

export interface FocusArea {
  title: string;
  description: string;
  icon: IconKey;
}

export interface InfraNode {
  id: string;
  label: string;
  purpose: string;
  tech: string[];
  icon: IconKey;
  x: number;
  y: number;
}

export interface InfraEdge {
  from: string;
  to: string;
  label?: string;
}

export interface InfraSystem {
  id: string;
  title: string;
  icon: IconKey;
  purpose: string;
  tech: string[];
  steps: string[];
}
