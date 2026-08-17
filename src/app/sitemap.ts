import type { MetadataRoute } from "next";
import { collections, posts, projects } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

/** Sabit sayfalar; alt sayfalar verilerden türetiliyor. */
const STATIC_PATHS = [
  "",
  "/projeler",
  "/koleksiyonlar",
  "/blog",
  "/hakkimizda",
  "/bilgi",
  "/malzeme",
  "/is-ortakligi",
  "/iletisim",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC_PATHS,
    ...projects.map((p) => `/projeler/${p.slug}`),
    ...collections.map((c) => `/koleksiyonlar/${c.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];

  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
