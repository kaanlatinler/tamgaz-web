import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"], // Yönetim paneli ve API rotaları arama sonuçlarına çıkmasın
      },
    ],
    sitemap: "https://tamgazmuhendislik.com/sitemap.xml",
  };
}