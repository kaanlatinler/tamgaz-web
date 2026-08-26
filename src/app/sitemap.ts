import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

// Prisma'dan çekilen alanların tip tanımı
type ServiceSlug = {
  slug: string;
  updatedAt: Date;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://tamgazmuhendislik.com";

  // Tip tanımını ServiceSlug[] olarak açıkça belirtiyoruz
  let services: ServiceSlug[] = [];
  try {
    services = await prisma.service.findMany({ select: { slug: true, updatedAt: true } });
  } catch (e) {
    console.error("Sitemap hizmetler çekilemedi:", e);
  }

  const serviceUrls = services.map((s) => ({
    url: `${baseUrl}/hizmetler/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Sabit Sayfalar
  const routes = [
    "",
    "/hakkimizda",
    "/hizmetler",
    "/urunler",
    "/projeler",
    "/randevu",
    "/iletisim",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return [...routes, ...serviceUrls];
}