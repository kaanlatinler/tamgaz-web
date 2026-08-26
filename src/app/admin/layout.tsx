"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  CalendarDays,
  Package,
  FolderGit2,
  Wrench,
  LogOut,
  Flame,
  Bell,
  ShieldAlert,
  Check,
  Menu,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface AdminUser {
  name: string | null;
  email: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/admin/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (e) {
      console.error("Bildirimler çekilemedi", e);
    }
  };

  useEffect(() => {
    let prevUnreadCount = 0;

    const checkNotifications = async () => {
      const res = await fetch("/api/admin/notifications");
      if (res.ok) {
        const data: NotificationItem[] = await res.json();
        setNotifications(data);

        const unread = data.filter((n) => !n.isRead).length;
        if (unread > prevUnreadCount && prevUnreadCount !== 0) {
          toast.info("🚨 Yeni bir keşif talebi düştü!", {
            description: data[0]?.message,
          });
        }
        prevUnreadCount = unread;
      }
    };

    checkNotifications();
    const interval = setInterval(checkNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Yetkisiz");
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const markAllAsRead = async () => {
    await fetch("/api/admin/notifications", { method: "PUT" });
    fetchNotifications();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const navigation = [
    {
      name: "Genel Bakış",
      href: "/admin",
      icon: LayoutDashboard,
      iconColor: "text-emerald-400",
    },
    {
      name: "Keşif & Randevular",
      href: "/admin/randevular",
      icon: CalendarDays,
      iconColor: "text-emerald-400",
    },
    {
      name: "Ürün Yönetimi",
      href: "/admin/urunler",
      icon: Package,
      iconColor: "text-cyan-400",
    },
    {
      name: "Referans Projeler",
      href: "/admin/projeler",
      icon: FolderGit2,
      iconColor: "text-orange-400",
    },
    {
      name: "Hizmet Alanları",
      href: "/admin/hizmetler",
      icon: Wrench,
      iconColor: "text-yellow-400",
    },
    {
      name: "Yöneticiler",
      href: "/admin/kullanicilar",
      icon: ShieldAlert,
      iconColor: "text-rose-400",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans relative">
      {/* MOBİL ARKA PLAN KARARTMA */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* SİDEBAR (SOL MENÜ) */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900/95 md:bg-slate-900/50 border-r border-slate-800 flex flex-col justify-between p-4 shrink-0 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-between px-2">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3"
            >
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
            </Link>

            {/* Mobil Kapat Butonu */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menü Linkleri */}
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium"
                      : "text-slate-300 hover:bg-slate-800 hover:text-emerald-400"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${item.iconColor}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Profil & Çıkış İşlemi */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between px-2">
          <div className="text-xs min-w-0 pr-2">
            <p className="font-semibold text-white truncate">
              {user?.name || "Yönetici"}
            </p>
            <p className="text-slate-500 truncate" title={user?.email || ""}>
              {user ? user.email : "Yükleniyor..."}
            </p>
          </div>
          <button
            onClick={handleLogout}
            title="Güvenli Çıkış Yap"
            className="text-slate-400 hover:text-rose-400 p-1.5 rounded-md hover:bg-slate-800 transition shrink-0 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* SAĞ İÇERİK ALANI */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <header className="h-16 border-b border-slate-800 bg-slate-900/30 px-4 md:px-6 flex items-center justify-between md:justify-end relative z-30">
          {/* Mobil Menü Açma Butonu */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 border border-slate-800 transition"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Bildirim Zili ve Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 border border-slate-800 transition cursor-pointer flex items-center justify-center"
              title="Bildirimler"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute top-1 right-1 animate-pulse" />
              )}
            </button>

            {/* Bildirim Dropdown Kutusu */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 md:w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-950">
                  <span className="text-xs font-bold text-white">
                    Bildirimler ({unreadCount})
                  </span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3 h-3" /> Tümünü Okundu İşaretle
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/50">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-center text-xs text-slate-500">
                      Okunmamış bildirim bulunmuyor.
                    </p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 text-xs space-y-1 transition ${
                          !n.isRead ? "bg-emerald-500/5" : "bg-transparent"
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold text-slate-200">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-500">
                            {new Date(n.createdAt).toLocaleTimeString("tr-TR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px] leading-relaxed">
                          {n.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Dinamik Sayfa İçeriği */}
        <main className="p-4 md:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
