// src/components/navbar.tsx
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Flame, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Admin sayfalarında public Navbar'ı render etmiyoruz
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-white"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <span>
            TAMGAZ <span className="text-emerald-500">MÜHENDİSLİK</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Ana Sayfa
          </Link>
          <Link
            href="/hakkimizda"
            className="hover:text-emerald-400 transition-colors"
          >
            Hakkımızda
          </Link>
          <Link
            href="/hizmetler"
            className="hover:text-emerald-400 transition-colors"
          >
            Hizmetlerimiz
          </Link>
          <Link
            href="/urunler"
            className="hover:text-emerald-400 transition-colors"
          >
            Ürünler
          </Link>
          <Link
            href="/projeler"
            className="hover:text-emerald-400 transition-colors"
          >
            Referans Projeler
          </Link>
          <Link
            href="/iletisim"
            className="hover:text-emerald-400 transition-colors"
          >
            İletişim
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="hidden sm:inline-flex border-slate-700 text-slate-200 hover:bg-slate-900"
          >
            <a href="tel:02320000000" className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" /> 0232 000 00 00
            </a>
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-500 text-white">
            <Link href="/randevu">Keşif İste</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
