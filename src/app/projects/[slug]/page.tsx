import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

function findProject(slug: string) {
  return projects.find((project) => project.id === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | ${profile.name}`,
      description: project.description,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const dateLabel =
    project.startDate === project.endDate ? project.startDate : `${project.startDate} – ${project.endDate}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:text-ink"
      >
        <ArrowLeft aria-hidden="true" size={16} />
        Back to Projects
      </Link>

      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="font-display text-4xl font-medium text-ink">{project.title}</h1>
        <span className="whitespace-nowrap text-base text-slate">{dateLabel}</span>
      </div>
      <p className="mt-1 text-base text-slate">{project.context}</p>

      <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-card bg-hairline/15 shadow-card">
        <ImageWithFallback
          src={project.image}
          alt={`Screenshot from ${project.title}`}
          fallbackLabel="Screenshot coming soon"
          sizes="(min-width: 1024px) 1152px, 100vw"
          widths={[640, 1280]}
          className="object-contain p-4"
          priority
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
        <div>
          <p className="max-w-[80ch] text-lg leading-relaxed text-ink/90">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-control border border-hairline px-2.5 py-0.5 text-xs text-slate">
                {tag}
              </span>
            ))}
          </div>

          {(project.liveUrl || project.repoUrl) && (
            <div className="mt-6 flex gap-5 text-sm">
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

        <aside className="rounded-card bg-paper p-5 shadow-card">
          <h2 className="text-sm font-medium text-slate">Tools</h2>
          <p className="mt-2 text-base text-ink/90">{project.tools.join(", ")}</p>
        </aside>
      </div>
    </div>
  );
}
