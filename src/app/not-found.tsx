import { CTALink } from "@/components/CTALink";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-start px-4 py-24 sm:px-6">
      <h1 className="font-display text-4xl font-medium text-ink">Page not found</h1>
      <p className="mt-3 max-w-[50ch] text-base leading-relaxed text-ink/90">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </p>
      <div className="mt-8">
        <CTALink href="/">Back to home</CTALink>
      </div>
    </div>
  );
}
