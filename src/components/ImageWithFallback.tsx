"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

type Props = ImageProps & { fallbackLabel: string };

export function ImageWithFallback({ fallbackLabel, alt, className, ...props }: Props) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        role="img"
        aria-label={typeof alt === "string" && alt ? alt : fallbackLabel}
        className={`flex items-center justify-center border border-hairline bg-hairline/40 px-4 text-center text-sm text-slate ${className ?? ""}`}
      >
        {fallbackLabel}
      </div>
    );
  }

  return <Image alt={alt} className={className} onError={() => setErrored(true)} {...props} />;
}
