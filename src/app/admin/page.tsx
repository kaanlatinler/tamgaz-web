import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Package, FolderCheck, PlusCircle } from "lucide-react";

export default async function AdminDashboardPage() {
  const [totalAppointments, totalProducts, totalProjects] = await Promise.all([
    prisma.appointment.count(),
    prisma.product.count(),
    prisma.project.count(),
  ]);

  return (
    <div className="p-8 bg-slate-950 text-white min-h-screen space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-emerald-400">
            Yönetim Paneli
          </h1>
          <p className="text-slate-400 text-sm">
            Tamgaz Mühendislik sistem istatistikleri ve hızlı işlemler.
          </p>
        </div>
      </div>

      {/* Metrik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Gelen Keşif Talepleri
            </CardTitle>
            <Calendar className="w-5 h-5 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalAppointments}</div>
            <Link
              href="/admin/randevular"
              className="text-xs text-emerald-400 hover:underline mt-2 inline-block"
            >
              Randevuları Yönet →
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Satıştaki Ürünler
            </CardTitle>
            <Package className="w-5 h-5 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalProducts}</div>
            <Link
              href="/urunler"
              className="text-xs text-cyan-400 hover:underline mt-2 inline-block"
            >
              Kataloğu İncele →
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              Tamamlanan Projeler
            </CardTitle>
            <FolderCheck className="w-5 h-5 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalProjects}</div>
            <Link
              href="/projeler"
              className="text-xs text-orange-400 hover:underline mt-2 inline-block"
            >
              Referansları Gör →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
