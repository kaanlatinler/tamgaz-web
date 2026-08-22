import Link from "next/link";
import {
  LayoutDashboard,
  CalendarDays,
  Package,
  FolderGit2,
  Wrench,
  LogOut,
  Flame,
  Search,
  Bell,
  ShieldAlert,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* --- SABİT SOL SİDEBAR --- */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 flex flex-col justify-between p-4 shrink-0">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white leading-none">
                TAMGAZ
              </h2>
              <span className="text-[10px] text-emerald-400 font-medium tracking-wider">
                PANEL v1.0
              </span>
            </div>
          </div>

          {/* Menü Linkleri */}
          <nav className="space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              <span>Genel Bakış</span>
            </Link>

            <Link
              href="/admin/randevular"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition"
            >
              <CalendarDays className="w-4 h-4 text-emerald-400" />
              <span>Keşif & Randevular</span>
            </Link>

            <Link
              href="/admin/urunler"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition"
            >
              <Package className="w-4 h-4 text-cyan-400" />
              <span>Ürün Yönetimi</span>
            </Link>

            <Link
              href="/admin/projeler"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition"
            >
              <FolderGit2 className="w-4 h-4 text-orange-400" />
              <span>Referans Projeler</span>
            </Link>

            <Link
              href="/admin/hizmetler"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition"
            >
              <Wrench className="w-4 h-4 text-yellow-400" />
              <span>Hizmet Alanları</span>
            </Link>
            <Link
              href="/admin/kullanicilar"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition"
            >
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Yöneticiler</span>
            </Link>
          </nav>
        </div>

        {/* Alt Profil / Çıkış */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between px-2">
          <div className="text-xs">
            <p className="font-semibold text-white">Yönetici</p>
            <p className="text-slate-500">admin@tamgaz.com</p>
          </div>
          <Link
            href="/"
            title="Siteye Dön"
            className="text-slate-400 hover:text-rose-400 p-1.5 rounded-md hover:bg-slate-800 transition"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* --- SAĞ İÇERİK ALANI --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Üst Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/30 px-6 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Panelde ara..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-1 right-1" />
            </button>
          </div>
        </header>

        {/* Dinamik Sayfa İçeriği */}
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
