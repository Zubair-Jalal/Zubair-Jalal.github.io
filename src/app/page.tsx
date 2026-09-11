import { CTALink } from "@/components/CTALink";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { profile, homeStats } from "@/content/profile";
import { shortEducation } from "@/content/education";

const overviewCards = [
  {
    href: "/about",
    title: "About",
    description: "Background, experience, education and the skills behind the work.",
  },
  {
    href: "/projects",
    title: "Projects",
    description: "Seven applied projects, from clinical data to national road-safety records.",
  },
  {
    href: "/certifications",
    title: "Certifications",
    description: "Job simulations from Lloyds, TATA and Citi, plus academic distinctions.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <section className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <h1 className="font-display text-4xl font-medium text-ink sm:text-5xl">{profile.name}</h1>
          <p className="mt-2 font-display text-2xl text-teal">{profile.headline}</p>

          <div className="mt-5 border-t border-hairline pt-4">
            <ul className="flex flex-col gap-1 text-sm text-slate">
              {shortEducation.map((item) => (
                <li key={item.degree}>
                  <span className="font-medium text-slate">{item.degree}</span>, {item.institution}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-ink/90">{profile.positioning}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <CTALink href={profile.cvPath} download>
              Download CV
            </CTALink>
            <CTALink href="/contact" variant="secondary">
              Contact
            </CTALink>
          </div>
        </div>

        <div className="relative mx-auto h-64 w-64 shrink-0 overflow-hidden rounded-full sm:h-72 sm:w-72 md:h-80 md:w-80">
          <ImageWithFallback
            src={profile.portraitPath}
            alt={`Portrait of ${profile.name}`}
            fallbackLabel="Portrait coming soon"
            sizes="(min-width: 768px) 320px, (min-width: 640px) 288px, 256px"
            widths={[300, 600]}
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="mt-16 grid grid-cols-1 gap-8 border-y border-hairline py-8 sm:grid-cols-3">
        {homeStats.map((stat) => (
          <div key={stat.id} className="sm:border-l sm:border-hairline sm:pl-6 sm:first:border-l-0 sm:first:pl-0">
            <p className="font-display text-4xl font-medium text-ink">{stat.value}</p>
            <p className="mt-1 text-sm text-ink/90">{stat.detail}</p>
            <p className="text-xs text-slate">{stat.context}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {overviewCards.map((card) => (
          <a
            key={card.href}
            href={card.href}
            className="flex flex-col gap-2 rounded-card bg-paper p-5 shadow-card transition-shadow duration-150 hover:shadow-card-hover"
          >
            <h2 className="font-display text-lg font-medium text-ink">{card.title}</h2>
            <p className="text-sm text-slate">{card.description}</p>
          </a>
        ))}
      </section>

      <section className="mt-16 flex flex-col items-start gap-3 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base text-ink/90">
          Fastest way to reach me: <a href={`mailto:${profile.email}`} className="font-medium text-teal">{profile.email}</a>
        </p>
        <CTALink href="/contact" variant="secondary">
          All contact details
        </CTALink>
      </section>
    </div>
  );
}
