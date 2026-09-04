import Link from "next/link";
import type { ReactNode } from "react";

interface CTALinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  download?: boolean;
  icon?: ReactNode;
}

export function CTALink({
  href,
  children,
  variant = "primary",
  external = false,
  download = false,
  icon,
}: CTALinkProps) {
  const base =
    "inline-flex items-center gap-2 rounded-control px-5 py-2.5 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-teal text-paper hover:bg-ink"
      : "border border-ink text-ink hover:border-teal hover:text-teal";

  if (external || download) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        download={download}
        className={`${base} ${styles}`}
      >
        {icon}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {icon}
      {children}
    </Link>
  );
}
