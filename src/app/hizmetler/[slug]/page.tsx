import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, ShieldAlert, PhoneCall } from "lucide-react";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;

  const service = await prisma.service.findUnique({
    where: { slug },
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Geri Dön */}
        <Link
          href="/hizmetler"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Tüm Hizmetlere Dön
        </Link>

        {/* Başlık Kartı */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            MÜHENDİSLİK HİZMETİ
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            {service.title}
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Süreç ve Uygulama Adımları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-emerald-400">
              Süreç Nasıl İşler?
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>1. Adım:</strong> Adresinizde ücretsiz yerinde keşif
                  yapılması.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>2. Adım:</strong> Uygun proje çizimi ve yetkili kurum
                  onayı.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>3. Adım:</strong> Sertifikalı ustalarımızca eksiksiz
                  montaj.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>4. Adım:</strong> Gaz açımı ve garanti belgesi
                  teslimi.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-orange-400">
              Neden Tamgaz Mühendislik?
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <ShieldAlert className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <span>%100 Sızdırmazlık ve Güvenlik Garantisi</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldAlert className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <span>Bölge Gaz Dağıtım Şirketi Onaylı Mühendislik</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldAlert className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <span>TSE Belgeli Kaliteli Tesisat Malzemeleri</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Aksiyon Çağrısı (CTA) */}
        <div className="bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold">
            Bu Hizmet İçin Hemen Keşif İsteğinizi Oluşturun
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            İzmir içi ücretsiz keşif ve detaylı fiyat teklifi almak için formu
            doldurun veya uzman mühendislerimizle görüşün.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              <Link
                href={`/randevu?hizmet=${encodeURIComponent(service.title)}`}
              >
                Hemen Keşif Al
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-900"
            >
              <a href="tel:02320000000" className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400" /> Bizi Arayın
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
