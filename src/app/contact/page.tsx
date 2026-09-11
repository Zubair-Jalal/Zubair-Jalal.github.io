import type { Metadata } from "next";
import { Mail, FileDown } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name}.`,
  openGraph: {
    title: `Contact | ${profile.name}`,
    description: `Get in touch with ${profile.name}.`,
  },
};

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/zubair-jalal",
    href: profile.linkedinUrl,
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/Zubair-Jalal",
    href: profile.githubUrl,
    icon: GitHubIcon,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="font-display text-4xl font-medium text-ink">Contact</h1>
      <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-ink/90">
        Please get in touch through any of the channels below.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:max-w-md">
        {channels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target={channel.external ? "_blank" : undefined}
            rel={channel.external ? "noreferrer" : undefined}
            className="flex items-center gap-4 rounded-card bg-paper p-4 shadow-card transition-shadow duration-150 hover:shadow-card-hover"
          >
            <channel.icon aria-hidden="true" size={20} className="shrink-0 text-teal" />
            <span>
              <span className="block text-sm text-slate">{channel.label}</span>
              <span className="block font-medium text-ink">{channel.value}</span>
            </span>
          </a>
        ))}

        <a
          href={profile.cvPath}
          download
          className="flex items-center gap-4 rounded-card bg-paper p-4 shadow-card transition-shadow duration-150 hover:shadow-card-hover"
        >
          <FileDown aria-hidden="true" size={20} className="shrink-0 text-teal" />
          <span>
            <span className="block text-sm text-slate">CV</span>
            <span className="block font-medium text-ink">Download PDF</span>
          </span>
        </a>
      </div>
    </div>
  );
}
