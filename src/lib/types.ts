export interface Profile {
  name: string;
  headline: string;
  positioning: string;
  location: string;
  status: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  cvPath: string;
  portraitPath: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  details: string[];
  modules?: string[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  organisation: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
  achievements: string[];
}

export interface SkillGroup {
  id: string;
  category: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  context: string;
  tools: string[];
  description: string;
  tags: string[];
  image: string;
  featured: boolean;
  liveUrl?: string;
  repoUrl?: string;
}

export type CertificationCategory = "Job Simulations" | "Awards & Recognition";

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  dateEarned: string;
  category: CertificationCategory;
  description: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  certificateFile?: string;
}
