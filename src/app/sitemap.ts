import type { MetadataRoute } from "next";

const BASE = "https://waqarahmed.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    {
      url: `${BASE}/blog/full-stack-ai-development`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/blog/why-ai-agents-are-harder-than-chatbots`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
