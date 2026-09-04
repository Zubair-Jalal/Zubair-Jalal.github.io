"use client";

import { useState } from "react";
import { webpSrcSet } from "@/lib/images";

interface Props {
  src: string;
  alt: string;
  fallbackLabel: string;
  sizes: string;
  widths: readonly [number, number];
  className?: string;
  priority?: boolean;
}

type Stage = "optimized" | "raw" | "placeholder";

/**
 * Renders a <picture> with WebP srcset variants (from scripts/build-images.mjs)
 * and degrades in two stages on error: optimized WebP -> original raster -> a
 * neutral placeholder. This is what keeps a missing/not-yet-generated asset
 * from ever showing a broken image.
 */
export function ImageWithFallback({ src, alt, fallbackLabel, sizes, widths, className, priority = false }: Props) {
  const [stage, setStage] = useState<Stage>("optimized");

  function handleError() {
    setStage((prev) => (prev === "optimized" ? "raw" : "placeholder"));
  }

  if (stage === "placeholder") {
    return (
      <div
        role="img"
        aria-label={alt || fallbackLabel}
        className={`absolute inset-0 flex items-center justify-center border border-hairline bg-hairline/40 px-4 text-center text-sm text-slate ${className ?? ""}`}
      >
        {fallbackLabel}
      </div>
    );
  }

  const img = (
    // eslint-disable-next-line @next/next/no-img-element -- next/image can't render inside a hand-rolled <picture> with our WebP srcset variants, and unoptimized:true means it wasn't optimizing anyway.
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      onError={handleError}
      className={`absolute inset-0 h-full w-full ${className ?? ""}`}
    />
  );

  if (stage === "raw") {
    return img;
  }

  return (
    <picture>
      <source type="image/webp" srcSet={webpSrcSet(src, widths)} sizes={sizes} />
      {img}
    </picture>
  );
}
