import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://zubair-jalal.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/projects", "/certifications", "/contact"];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
