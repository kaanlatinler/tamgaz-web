// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || "https://tamgazmuhendislik.com";

  const [products, services] = await Promise.all([
    prisma.product.findMany({ select: { id: true, createdAt: true } }),
    prisma.service.findMany({ select: { slug: true, createdAt: true } }),
  ]);

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/urunler/${p.id}`,
    lastModified: p.createdAt,
  }));

  const serviceUrls = services.map((s) => ({
    url: `${baseUrl}/hizmetler/${s.slug}`,
    lastModified: s.createdAt,
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/hakkimizda`, lastModified: new Date() },
    { url: `${baseUrl}/hizmetler`, lastModified: new Date() },
    { url: `${baseUrl}/urunler`, lastModified: new Date() },
    { url: `${baseUrl}/projeler`, lastModified: new Date() },
    { url: `${baseUrl}/randevu`, lastModified: new Date() },
    { url: `${baseUrl}/iletisim`, lastModified: new Date() },
    ...productUrls,
    ...serviceUrls,
  ];
}