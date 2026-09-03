import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  const dateLabel =
    project.startDate === project.endDate ? project.startDate : `${project.startDate} – ${project.endDate}`;

  return (
    <article
      className={`flex flex-col overflow-hidden rounded border border-hairline bg-paper ${
        project.featured ? "md:col-span-2 md:flex-row" : ""
      }`}
    >
      <div className={`relative aspect-[16/10] w-full ${project.featured ? "md:w-2/5" : ""}`}>
        <ImageWithFallback
          src={project.image}
          alt={`Screenshot from ${project.title}`}
          fallbackLabel="Screenshot coming soon"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-xl font-medium text-ink">{project.title}</h3>
            <span className="whitespace-nowrap text-sm text-slate">{dateLabel}</span>
          </div>
          <p className="mt-1 text-sm text-slate">{project.context}</p>
        </div>

        <p className="text-sm leading-relaxed text-ink/90">{project.description}</p>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-hairline px-2.5 py-0.5 text-xs text-slate"
              >
                {tag}
              </span>
            ))}
          </div>

          {(project.liveUrl || project.repoUrl) && (
            <div className="flex gap-4 text-sm">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 font-medium text-teal hover:text-ink"
                >
                  <ExternalLink aria-hidden="true" size={14} />
                  View live
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 font-medium text-teal hover:text-ink"
                >
                  <GitHubIcon aria-hidden="true" size={14} />
                  View code
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
