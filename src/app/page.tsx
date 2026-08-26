import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Flame,
  Snowflake,
  ShieldCheck,
  Wrench,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Phone,
  Settings,
  Clock,
} from "lucide-react";
import JsonLd from "@/components/json-ld";

export default async function HomePage() {
  // Veritabanından öne çıkan projeleri ve ürünleri çekiyoruz
  const featuredProjects = await prisma.project.findMany({
    where: { isFeatured: true },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const products = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <JsonLd/>
      {/* --- HERO SECTION (ATEŞ & BUZ KONSEPTİ) --- */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-6 py-16 overflow-hidden border-b border-slate-800">
        {/* Arka Plan Glow Efektleri */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-orange-600/10 blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-600/10 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full z-10 text-center">
          <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 rounded-full text-emerald-400 text-sm mb-6">
            <ShieldCheck className="w-4 h-4" /> Güvenli, Kaliteli & Profesyonel
            Mühendislik
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-4 uppercase">
            TAMGAZ <span className="text-emerald-500">MÜHENDİSLİK</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light">
            İzmir ve çevresinde doğalgaz tesisatı, yetkili proje çizimi, kombi
            montajı ve 7/24 iklimlendirme çözümleri.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 h-12 text-base"
            >
              <Link href="/randevu">Ücretsiz Keşif & Randevu</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-900 h-12 text-base"
            >
              <Link href="/urunler">Ürünlerimizi İnceleyin</Link>
            </Button>
          </div>

          {/* 4 Ana Hizmet Kartı */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <Card className="bg-slate-900/80 border-slate-800 p-5 backdrop-blur hover:border-orange-500/50 transition">
              <Flame className="w-8 h-8 text-orange-500 mb-3" />
              <h3 className="font-semibold text-lg text-white">
                Doğalgaz Tesisatı
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Standartlara uygun, emniyetli daire içi ve kolon tesisatı.
              </p>
            </Card>

            <Card className="bg-slate-900/80 border-slate-800 p-5 backdrop-blur hover:border-cyan-400/50 transition">
              <Snowflake className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="font-semibold text-lg text-white">
                Isıtma Sistemleri
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Kat kaloriferi, radyatör ve modern iklimlendirme çözümleri.
              </p>
            </Card>

            <Card className="bg-slate-900/80 border-slate-800 p-5 backdrop-blur hover:border-emerald-500/50 transition">
              <Settings className="w-8 h-8 text-emerald-400 mb-3" />
              <h3 className="font-semibold text-lg text-white">Proje Çizimi</h3>
              <p className="text-sm text-slate-400 mt-1">
                Yetkili mühendisler tarafından onaylı gaz açma projeleri.
              </p>
            </Card>

            <Card className="bg-slate-900/80 border-slate-800 p-5 backdrop-blur hover:border-yellow-500/50 transition">
              <Clock className="w-8 h-8 text-yellow-500 mb-3" />
              <h3 className="font-semibold text-lg text-white">
                Bakım & Onarım
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                7/24 teknik servis, kombi bakımı ve arıza tespiti.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* --- ÖNE ÇIKAN ÜRÜNLER SECTION --- */}
      <section className="py-20 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <Badge
                variant="outline"
                className="border-emerald-500/30 text-emerald-400 mb-2"
              >
                Satıştaki Ekipmanlar
              </Badge>
              <h2 className="text-3xl font-bold">
                Popüler Kombi ve Isıtma Sistemleri
              </h2>
            </div>
            <Link
              href="/urunler"
              className="text-emerald-400 hover:underline flex items-center gap-1 text-sm font-medium"
            >
              Tüm Ürünleri Gör <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition"
              >
                <div className="h-44 bg-slate-950 flex items-center justify-center p-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full object-contain"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <Badge
                      variant="outline"
                      className="border-slate-700 text-slate-400 mb-2"
                    >
                      {product.brand}
                    </Badge>
                    <h3 className="font-semibold text-sm text-white line-clamp-2">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <span className="text-lg font-bold text-emerald-400">
                      {product.price.toLocaleString("tr-TR")} ₺
                    </span>
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-500 text-xs"
                    >
                      <Link
                        href={`/randevu?urun=${encodeURIComponent(product.name)}`}
                      >
                        Teklif Al
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- REFERANS PROJELER SECTION --- */}
      <section className="py-20 px-6 border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <Badge
                variant="outline"
                className="border-emerald-500/30 text-emerald-400 mb-2"
              >
                Saha Tecrübemiz
              </Badge>
              <h2 className="text-3xl font-bold">
                Tamamlanan Referans Projeler
              </h2>
            </div>
            <Link
              href="/projeler"
              className="text-emerald-400 hover:underline flex items-center gap-1 text-sm font-medium"
            >
              Tüm Projeleri İncele <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col md:flex-row"
              >
                <div className="md:w-1/2 h-56 md:h-auto bg-slate-950 relative">
                  {project.images?.[0] && (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-emerald-400 flex items-center gap-1 border border-emerald-500/30">
                    <MapPin className="w-3 h-3" /> {project.location}
                  </div>
                </div>
                <div className="p-6 md:w-1/2 space-y-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 pt-3 border-t border-slate-800">
                    <CheckCircle2 className="w-4 h-4" /> Proje Onaylandı ve
                    Teslim Edildi
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BİLGİ & İLETİŞİM CTA SECTION --- */}
      <section className="py-16 px-6 bg-gradient-to-b from-slate-900 to-slate-950 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">
            Doğalgaz Projeniz İçin Hemen Fiyat Alın
          </h2>
          <p className="text-slate-400">
            İzmir ve çevresindeki ücretsiz keşif avantajından yararlanmak için
            formu doldurun veya doğrudan bizi arayın.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500">
              <Link href="/randevu">Keşif İsteği Oluştur</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-slate-200"
            >
              <a href="tel:02320000000" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" /> 0232 000 00 00
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
