import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import type { Project } from "@/lib/types";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
      {projects.map((project, index) => (
        <Link
          key={project.id}
          href={`/projects/${project.id}`}
          className="block overflow-hidden rounded-card bg-paper shadow-card transition-shadow duration-150 hover:shadow-card-hover"
        >
          <div className="relative aspect-[3/2] w-full bg-hairline/15 p-3">
            <ImageWithFallback
              src={project.image}
              alt={`Screenshot from ${project.title}`}
              fallbackLabel="Screenshot coming soon"
              sizes="(min-width: 640px) 50vw, 100vw"
              widths={[640, 1280]}
              className="object-contain"
              priority={index === 0}
            />
          </div>
          <span className="block px-4 py-3 font-sans text-base font-medium text-ink">{project.title}</span>
        </Link>
      ))}
    </div>
  );
}
