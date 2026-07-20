import type { MetadataRoute } from "next";
import { categories, getProductSlug, products } from "../lib/catalog";

const origin = "https://kiswani-website-82jb.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/support", "/privacy", "/terms"];
  return [
    ...staticRoutes.map((pathname) => ({
      url: `${origin}${pathname}`,
      changeFrequency: pathname === "" ? ("weekly" as const) : ("monthly" as const),
      priority: pathname === "" ? 1 : 0.6,
    })),
    ...categories.map((category) => ({
      url: `${origin}/collections/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: `${origin}/products/${getProductSlug(product)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
