import type { Metadata } from "next";
import { profile, beyondTheWork } from "@/content/profile";
import { experience } from "@/content/experience";
import { education } from "@/content/education";
import { skills } from "@/content/skills";

export const metadata: Metadata = {
  title: "About",
  description: `Background, experience and education for ${profile.name}, ${profile.headline}.`,
  openGraph: {
    title: `About | ${profile.name}`,
    description: `Background, experience and education for ${profile.name}, ${profile.headline}.`,
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="font-display text-4xl font-medium text-ink">About</h1>

      <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-[1fr_240px]">
        <p className="max-w-[70ch] text-base leading-relaxed text-ink/90">{profile.positioning}</p>

        <dl className="flex flex-col gap-4 rounded-card bg-paper p-5 text-sm shadow-card">
          <div>
            <dt className="text-slate">Location</dt>
            <dd className="mt-0.5 font-medium text-ink">{profile.location}</dd>
          </div>
          <div>
            <dt className="text-slate">Status</dt>
            <dd className="mt-0.5 font-medium text-ink">{profile.status}</dd>
          </div>
        </dl>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-medium text-ink">Experience</h2>
        <div className="mt-2 border-t border-hairline" />

        <div className="mt-8 flex flex-col gap-6">
          {experience.map((role) => (
            <article key={role.id} className="rounded-card bg-paper p-6 shadow-card">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-medium text-ink">{role.role}</h3>
                <span className="text-sm text-slate">
                  {role.startDate} – {role.endDate}
                </span>
              </div>
              <p className="text-sm text-slate">
                {role.organisation} ({role.location})
              </p>
              <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-ink/90">{role.summary}</p>
              <ul className="mt-3 flex max-w-[70ch] flex-col gap-2">
                {role.achievements.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink/90">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-medium text-ink">Education</h2>
        <div className="mt-2 border-t border-hairline" />

        <div className="mt-8 flex flex-col gap-6">
          {education.map((entry) => (
            <article key={entry.id} className="rounded-card bg-paper p-6 shadow-card">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-medium text-ink">{entry.degree}</h3>
                <span className="text-sm text-slate">
                  {entry.startDate} – {entry.endDate}
                </span>
              </div>
              <p className="text-sm text-slate">{entry.institution}</p>

              {entry.details.length > 0 && (
                <ul className="mt-3 flex max-w-[70ch] flex-col gap-2">
                  {entry.details.map((detail) => (
                    <li key={detail} className="flex gap-2 text-sm leading-relaxed text-ink/90">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate" aria-hidden="true" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}

              {entry.modules && entry.modules.length > 0 && (
                <p className="mt-3 text-sm text-ink/90">
                  <span className="text-slate">Key modules: </span>
                  {entry.modules.join(", ")}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-medium text-ink">Core skills</h2>
        <div className="mt-2 border-t border-hairline" />

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.id} className="rounded-card bg-paper p-6 shadow-card">
              <h3 className="text-sm font-medium text-slate">{group.category}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-control border border-hairline px-3 py-1 text-xs text-ink/90"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-hairline pt-8">
        <h2 className="font-display text-2xl font-medium text-ink">Beyond the work</h2>
        <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-ink/90">{beyondTheWork}</p>
      </section>
    </div>
  );
}
