import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Temizleme (Opsiyonel)
  await prisma.product.deleteMany();
  await prisma.project.deleteMany();
  await prisma.service.deleteMany();
  await prisma.user.deleteMany();

  // Admin Kullanıcı Oluşturma

  const hashedPassword = await bcrypt.hash("Tamgaz2026!", 10);

await prisma.user.upsert({
  where: { email: "admin@tamgaz.com" },
  update: {},
  create: {
    email: "admin@tamgaz.com",
    name: "Sistem Yöneticisi",
    password: hashedPassword,
    role: "ADMIN",
  },
});

  // Örnek Hizmetler
  await prisma.service.createMany({
    data: [
      {
        title: "Doğalgaz Tesisatı",
        slug: "dogalgaz-tesisati",
        category: "ISITMA",
        description: "Daire içi, bina ve endüstriyel doğalgaz tesisat kurulumu.",
      },
      {
        title: "Proje Çizimi & Onay",
        slug: "proje-cizimi",
        category: "PROJE_TISIM",
        description: "Yetkili mühendisler tarafından onaylı doğalgaz projelendirme.",
      },
      {
        title: "Kombi Montaj & Değişim",
        slug: "kombi-montaj",
        category: "ISITMA",
        description: "Eski kombi değişimi ve sıfır kombi uygunluk montajı.",
      },
    ],
  });

  // Örnek Ürünler
  await prisma.product.createMany({
    data: [
      {
        name: "E.C.A Proteus Premix 24 kW Tam Yoğuşmalı Kombi",
        brand: "E.C.A",
        price: 22500,
        stock: 15,
        imageUrl: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600",
      },
      {
        name: "Vaillant ecoTEC Intro 24/28 kW",
        brand: "Vaillant",
        price: 28900,
        stock: 10,
        imageUrl: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600",
      },
      {
        name: "Demirdöküm Nitromix P 24 kW Yoğuşmalı Kombi",
        brand: "Demirdöküm",
        price: 24200,
        stock: 8,
        imageUrl: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600",
      },
    ],
  });

  // Örnek Projeler
  await prisma.project.createMany({
    data: [
      {
        title: "Buca 48 Daire Komple Tesisat ve Kombi Montajı",
        location: "İzmir / Buca",
        description: "Sıfır binanın doğalgaz kolon tesisatı, proje çizimi ve kombi montajı tamamlanmıştır.",
        images: ["https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800"],
        isFeatured: true,
      },
      {
        title: "Karşıyaka Müstakil Ev Kat Kaloriferi Dönüşümü",
        location: "İzmir / Karşıyaka",
        description: "Eski tesisat yenilerek yoğuşmalı kombi ve panel radyatör kurulumu yapıldı.",
        images: ["https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800"],
        isFeatured: true,
      },
    ],
  });

  console.log("Seed verisi başarıyla eklendi!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });