import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

export const dynamic = "force-static";

const siteUrl = "https://zubair-jalal.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/projects",
    "/certifications",
    "/contact",
    ...projects.map((project) => `/projects/${project.id}`),
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
