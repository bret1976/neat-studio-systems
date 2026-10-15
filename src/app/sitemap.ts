import type { MetadataRoute } from "next";
import { pages } from "@/content/pages";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  return base
    ? ["", "contact", ...Object.keys(pages)].map((p) => ({
        url: `${base}/${p}`,
      }))
    : [];
}
