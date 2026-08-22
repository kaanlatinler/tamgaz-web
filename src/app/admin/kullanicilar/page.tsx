"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus, ShieldAlert } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setOpen(false);
    fetchUsers();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Yönetici & Kullanıcı Hesapları
          </h1>
          <p className="text-slate-400 text-sm">
            Panele erişim yetkisi olan yöneticilerin listesi.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> Yeni Admin Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-emerald-400">
                Yeni Yetkili Ekle
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddUser} className="space-y-4 pt-4">
              <div>
                <label className="text-xs text-slate-300">Ad Soyad</label>
                <Input
                  name="name"
                  required
                  placeholder="Ali Yılmaz"
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300">E-Posta Adresi</label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="admin@tamgaz.com"
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300">Şifre</label>
                <Input
                  name="password"
                  type="password"
                  required
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500"
              >
                Kullanıcıyı Kaydet
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50">
        <Table>
          <TableHeader className="bg-slate-950">
            <TableRow className="border-slate-800">
              <TableHead className="text-slate-400">Ad Soyad</TableHead>
              <TableHead className="text-slate-400">E-Posta</TableHead>
              <TableHead className="text-slate-400">Yetki Rolü</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id} className="border-slate-800">
                <TableCell className="font-semibold text-white">
                  {u.name || "İsimsiz"}
                </TableCell>
                <TableCell className="text-slate-300">{u.email}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="border-emerald-500/30 text-emerald-400 flex items-center gap-1 w-fit"
                  >
                    <ShieldAlert className="w-3 h-3" /> {u.role}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
