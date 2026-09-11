import Link from "next/link";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-1.5 hover:text-teal"
          >
            <Mail aria-hidden="true" size={16} />
            <span>Email</span>
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-teal"
          >
            <LinkedInIcon aria-hidden="true" size={16} />
            <span>LinkedIn</span>
          </a>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-teal"
          >
            <GitHubIcon aria-hidden="true" size={16} />
            <span>GitHub</span>
          </a>
          <Link href="/contact" className="hover:text-teal">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
