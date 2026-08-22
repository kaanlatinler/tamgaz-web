import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-emerald-400">
            Satıştaki Ürünler
          </h1>
          <p className="text-slate-400">
            Yüksek verimli kombi, radyatör ve iklimlendirme sistemleri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition"
            >
              <div className="h-48 bg-slate-950 flex items-center justify-center p-4">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full object-contain"
                  />
                ) : (
                  <ShoppingBag className="w-12 h-12 text-slate-700" />
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <Badge
                    variant="outline"
                    className="border-slate-700 text-slate-400 mb-2"
                  >
                    {product.brand}
                  </Badge>
                  <h3 className="font-semibold text-lg text-white">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <span className="text-xl font-bold text-emerald-400">
                    {product.price.toLocaleString("tr-TR")} ₺
                  </span>
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-500"
                  >
                    {/* <Link
                      href={`/randevu?urun=${encodeURIComponent(product.name)}`}
                    >
                      Teklif Al
                    </Link> */}
                    <Link
                      href={`/urunler/${product.id}`}
                      className="hover:text-emerald-400 font-semibold text-lg"
                    >
                      İncele
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
