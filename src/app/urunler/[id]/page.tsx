import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, ShieldCheck, Truck, Wrench } from "lucide-react";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Geri Dön Butonu */}
        <Link
          href="/urunler"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Tüm Ürünlere Dön
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-slate-900 border border-slate-800 rounded-2xl p-8">
          {/* Ürün Görseli */}
          <div className="bg-slate-950 rounded-xl p-8 flex items-center justify-center border border-slate-800/50">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-80 object-contain hover:scale-105 transition duration-300"
            />
          </div>

          {/* Ürün Bilgileri */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <Badge
                variant="outline"
                className="border-emerald-500/30 text-emerald-400"
              >
                {product.brand}
              </Badge>
              <h1 className="text-3xl font-bold text-white">{product.name}</h1>
              <p className="text-3xl font-extrabold text-emerald-400">
                {product.price.toLocaleString("tr-TR")} ₺
              </p>

              <div className="space-y-2 pt-4 border-t border-slate-800 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>
                    Stok Durumu:{" "}
                    <strong className="text-white">
                      {product.stock > 0 ? "Stokta Var" : "Tükendi"}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>2 Yıl Resmi Üretici Garantisi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>İzmir İçi Ücretsiz Keşif & Teslimat</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-emerald-400" />
                  <span>Yetkili Servis Montaj Desteği</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 space-y-3">
              <Button
                size="lg"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
              >
                <Link
                  href={`/randevu?urun=${encodeURIComponent(product.name)}`}
                >
                  Bu Ürün İçin Teklif & Keşif İste
                </Link>
              </Button>
              <p className="text-xs text-center text-slate-500">
                Montaj ve proje dâhil paket fiyat almak için hemen iletişime
                geçebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
