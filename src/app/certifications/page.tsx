import type { Metadata } from "next";
import { CertificationsBoard } from "@/components/CertificationsBoard";
import { profile } from "@/content/profile";
import { certifications, certificationCategories } from "@/content/certifications";

export const metadata: Metadata = {
  title: "Certifications & Credentials",
  description: `Job simulations and academic distinctions earned by ${profile.name}.`,
  openGraph: {
    title: `Certifications & Credentials — ${profile.name}`,
    description: `Job simulations and academic distinctions earned by ${profile.name}.`,
  },
};

export default function CertificationsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="font-display text-4xl font-medium text-ink">Certifications & Credentials</h1>
      <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-ink/90">
        Employer-designed job simulations completed through Forage, alongside academic
        distinctions earned during the MSc.
      </p>

      <div className="mt-12">
        <CertificationsBoard certifications={certifications} categories={certificationCategories} />
      </div>
    </div>
  );
}
