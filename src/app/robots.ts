import type { MetadataRoute } from "next";

const BASE = "https://waqarahmed.xyz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: [] },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
