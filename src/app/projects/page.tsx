import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: `Applied data science and analytics projects by ${profile.name}.`,
  openGraph: {
    title: `Projects | ${profile.name}`,
    description: `Applied data science and analytics projects by ${profile.name}.`,
  },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="font-display text-4xl font-medium text-ink">Projects</h1>
      <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-ink/90">
        Seven projects spanning clinical data, national road-safety records, public finance and
        applied statistics, each taken from problem definition through to a finished result.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} priority={index === 0} />
        ))}
      </div>
    </div>
  );
}
