// src/components/footer.tsx
"use client";
import Link from "next/link";
import { Flame, Phone, Mail, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Admin sayfalarında public Navbar'ı render etmiyoruz
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Şirket Bilgisi */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Flame className="w-5 h-5 text-orange-500" />
            <span>
              TAMGAZ <span className="text-emerald-500">MÜHENDİSLİK</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Güvenli, kaliteli ve profesyonel mühendislik çözümleriyle İzmir ve
            çevresinde doğalgaz tesisatı ve iklimlendirme hizmetleri veriyoruz.
          </p>
        </div>

        {/* Hızlı Linkler */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold">Hızlı Erişim</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/" className="hover:text-emerald-400">
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link href="/hizmetler" className="hover:text-emerald-400">
                Hizmetlerimiz
              </Link>
            </li>
            <li>
              <Link href="/urunler" className="hover:text-emerald-400">
                Satıştaki Ürünler
              </Link>
            </li>
            <li>
              <Link href="/projeler" className="hover:text-emerald-400">
                Referans Projeler
              </Link>
            </li>
            <li>
              <Link href="/randevu" className="hover:text-emerald-400">
                Keşif / Randevu
              </Link>
            </li>
          </ul>
        </div>

        {/* Hizmetler */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold">Uzmanlık Alanlarımız</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>Doğalgaz Daire Tesisatı</li>
            <li>Yetkili Proje Çizimi & Onay</li>
            <li>Kombi Değişimi & Montajı</li>
            <li>Kat Kalorifer Sistemleri</li>
            <li>7/24 Arıza & Bakım Servisi</li>
          </ul>
        </div>

        {/* İletişim */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold">İletişim</h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" /> İzmir ve Çevresi
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" /> 0232 000 00 00
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" />{" "}
              info@tamgazmuhendislik.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-900 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Tamgaz Mühendislik. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
