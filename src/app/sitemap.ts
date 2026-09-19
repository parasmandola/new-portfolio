import { PROJECTS } from "@/constants/projects";
import { SOCIAL_MEDIA_HANDLES } from "@/constants/social-media";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.URL || "https://parasmandola.vercel.app";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
    },
  ];

  const projects: MetadataRoute.Sitemap = PROJECTS.filter(
    (proj) => proj.deployedLink || proj.github
  ).map((proj) => ({
    url: proj.deployedLink || proj.github!,
    lastModified: new Date(),
  }));

  const socialMedia: MetadataRoute.Sitemap = SOCIAL_MEDIA_HANDLES.filter(
    (sc) => sc.url
  ).map((sc) => ({
    url: sc.url,
  }));

  return [...staticPages, ...projects, ...socialMedia];
}