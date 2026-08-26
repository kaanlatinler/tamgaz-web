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
} from "@/components/ui/dialog";
import { UserPlus, ShieldAlert, Trash2, Edit, Users } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Silme İşlemi
  const handleDelete = async (id: string) => {
    if (!confirm("Bu yönetici hesabını silmek istediğinize emin misiniz?"))
      return;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });

    if (res.ok) {
      toast.success("Yönetici hesabı silindi.");
      fetchUsers();
    } else {
      toast.error("Kullanıcı silinirken bir sorun oluştu.");
    }
  };

  // Ekleme ve Güncelleme İşlemi
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const url = editUser
      ? `/api/admin/users/${editUser.id}`
      : "/api/admin/users";
    const method = editUser ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success(
        editUser
          ? "Yönetici bilgileri güncellendi."
          : "Yeni yönetici başarıyla oluşturuldu.",
      );
      setOpen(false);
      setEditUser(null);
      fetchUsers();
    } else {
      const errorData = await res.json();
      toast.error(errorData.error || "İşlem gerçekleştirilemedi.");
    }
  };

  const handleEditOpen = (user: User) => {
    setEditUser(user);
    setOpen(true);
  };

  const handleCreateOpen = () => {
    setEditUser(null);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Yönetici Hesapları</h1>
          <p className="text-slate-400 text-sm">
            Panele erişim yetkisi olan yöneticiler.
          </p>
        </div>

        <button
          onClick={handleCreateOpen}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition cursor-pointer"
        >
          <UserPlus className="w-4 h-4" /> Yeni Admin Ekle
        </button>

        <Dialog
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            if (!v) setEditUser(null);
          }}
        >
          <DialogContent className="bg-slate-900 border-slate-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-emerald-400">
                {editUser ? "Yöneticiyi Düzenle" : "Yeni Yetkili Ekle"}
              </DialogTitle>
            </DialogHeader>
            <form
              key={editUser?.id || "new-user"}
              onSubmit={handleSubmit}
              className="space-y-4 pt-4"
            >
              <div>
                <label className="text-xs text-slate-300">Ad Soyad</label>
                <Input
                  name="name"
                  defaultValue={editUser?.name || ""}
                  required
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300">E-Posta Adresi</label>
                <Input
                  name="email"
                  type="email"
                  defaultValue={editUser?.email || ""}
                  required
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300">
                  {editUser
                    ? "Yeni Şifre (Boş bırakırsanız değişmez)"
                    : "Şifre"}
                </label>
                <Input
                  name="password"
                  type="password"
                  required={!editUser}
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500"
              >
                {editUser ? "Değişiklikleri Kaydet" : "Kullanıcıyı Kaydet"}
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
              <TableHead className="text-right text-slate-400">
                İşlemler
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-12 text-slate-400"
                >
                  Yöneticiler yükleniyor...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 space-y-3">
                  <Users className="w-10 h-10 text-slate-600 mx-auto stroke-1" />
                  <p className="text-slate-400 text-sm">
                    Kullanıcı bulunamadı.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              users.map((u) => (
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
                  <TableCell className="text-right space-x-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-cyan-400 hover:bg-cyan-500/10"
                      onClick={() => handleEditOpen(u)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-rose-400 hover:bg-rose-500/10"
                      onClick={() => handleDelete(u.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
