"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import type { Project } from "@/lib/types";

const FOCUSABLE_SELECTOR =
  'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRefs = useRef<Record<string, HTMLDivElement | null>>({});

  function open(project: Project, event: React.MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    setOpenId(project.id);
  }

  function close() {
    setOpenId(null);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }

  useEffect(() => {
    if (!openId) return;
    const dialog = dialogRefs.current[openId];
    if (!dialog) return;

    function getFocusable(): HTMLElement[] {
      if (!dialog) return [];
      return Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    }

    getFocusable()[0]?.focus();
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "Tab") {
        const focusable = getFocusable();
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openId]);

  return (
    <>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            onClick={(event) => open(project, event)}
            className="overflow-hidden rounded-card bg-paper text-left shadow-card transition-shadow duration-150 hover:shadow-card-hover"
          >
            <div className="relative aspect-[3/2] w-full">
              <ImageWithFallback
                src={project.image}
                alt={`Screenshot from ${project.title}`}
                fallbackLabel="Screenshot coming soon"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                widths={[640, 1280]}
                className="object-cover"
                priority={index === 0}
              />
            </div>
            <span className="block px-4 py-3 font-sans text-sm font-medium text-ink">{project.title}</span>
          </button>
        ))}
      </div>

      {projects.map((project) => (
        <ProjectModal
          key={project.id}
          project={project}
          isOpen={openId === project.id}
          onClose={close}
          dialogRef={(el) => {
            dialogRefs.current[project.id] = el;
          }}
        />
      ))}
    </>
  );
}

function ProjectModal({
  project,
  isOpen,
  onClose,
  dialogRef,
}: {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  dialogRef: (el: HTMLDivElement | null) => void;
}) {
  const dateLabel =
    project.startDate === project.endDate ? project.startDate : `${project.startDate} – ${project.endDate}`;
  const titleId = `project-modal-title-${project.id}`;

  return (
    <div hidden={!isOpen} className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/50" onClick={onClose} aria-hidden="true" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-card bg-paper p-6 shadow-card-hover sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-control p-1.5 text-slate hover:text-ink"
        >
          <X aria-hidden="true" size={20} />
        </button>

        <div className="flex flex-wrap items-baseline justify-between gap-2 pr-8">
          <h2 id={titleId} className="font-display text-2xl font-medium text-ink">
            {project.title}
          </h2>
          <span className="whitespace-nowrap text-sm text-slate">{dateLabel}</span>
        </div>
        <p className="mt-1 text-sm text-slate">{project.context}</p>

        <p className="mt-4 text-sm text-ink/90">
          <span className="text-slate">Tools: </span>
          {project.tools.join(", ")}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-ink/90">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-control border border-hairline px-2.5 py-0.5 text-xs text-slate">
              {tag}
            </span>
          ))}
        </div>

        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-5 flex gap-4 text-sm">
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
  );
}
