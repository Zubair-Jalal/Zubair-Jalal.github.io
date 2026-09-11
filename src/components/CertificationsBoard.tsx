"use client";

import { useState } from "react";
import { FileText, ExternalLink, Image as ImageIcon } from "lucide-react";
import type { Certification, CertificationCategory } from "@/lib/types";
import { parseApproxDate, isPast } from "@/lib/dates";

interface Props {
  certifications: Certification[];
  categories: CertificationCategory[];
}

type FilterValue = "All" | CertificationCategory;

export function CertificationsBoard({ certifications, categories }: Props) {
  const [filter, setFilter] = useState<FilterValue>("All");

  const grouped = categories.map((category) => ({
    category,
    items: certifications
      .filter((c) => c.category === category)
      .sort((a, b) => parseApproxDate(b.dateEarned) - parseApproxDate(a.dateEarned)),
  }));

  return (
    <div>
      <div role="group" aria-label="Filter certifications by category" className="flex flex-wrap gap-2">
        {(["All", ...categories] as FilterValue[]).map((value) => {
          const isActive = filter === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(value)}
              className={`rounded-control border px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "border-teal bg-teal text-paper"
                  : "border-hairline text-ink hover:border-teal hover:text-teal"
              }`}
            >
              {value}
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col gap-12">
        {grouped.map(({ category, items }) => (
          <section
            key={category}
            hidden={filter !== "All" && filter !== category}
            aria-hidden={filter !== "All" && filter !== category}
          >
            <h2 className="font-display text-2xl font-medium text-ink">{category}</h2>
            <div className="mt-2 border-t border-hairline" />

            <ul className="mt-6 flex flex-col gap-5">
              {items.map((cert) => (
                <li key={cert.id}>
                  <CertificationRow cert={cert} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function CertificationRow({ cert }: { cert: Certification }) {
  const expired = cert.expiryDate ? isPast(cert.expiryDate) : false;
  const isImageFile = cert.certificateFile ? /\.(png|jpe?g)$/i.test(cert.certificateFile) : false;
  const link = cert.verificationUrl
    ? { href: cert.verificationUrl, label: "Verify credential", icon: <ExternalLink aria-hidden="true" size={14} /> }
    : cert.certificateFile
      ? isImageFile
        ? { href: cert.certificateFile, label: "View evidence", icon: <ImageIcon aria-hidden="true" size={14} /> }
        : { href: cert.certificateFile, label: "View certificate (PDF)", icon: <FileText aria-hidden="true" size={14} /> }
      : null;

  return (
    <article className="rounded-card bg-paper p-5 shadow-card">
      <h3 className="font-display text-lg font-medium text-ink">{cert.name}</h3>
      <p className="mt-0.5 text-sm text-slate">
        {cert.dateEarned}, {cert.issuer}
      </p>

      <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-ink/90">{cert.description}</p>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
        {cert.credentialId && <span className="text-slate">ID: {cert.credentialId}</span>}
        {expired && (
          <span className="rounded-control border border-rust px-2.5 py-0.5 text-xs font-medium text-rust">
            Expired
          </span>
        )}
        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-medium text-teal hover:text-ink"
          >
            {link.icon}
            {link.label}
          </a>
        )}
      </div>
    </article>
  );
}
