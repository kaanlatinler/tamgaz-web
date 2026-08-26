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
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Wrench, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
interface Service {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editService, setEditService] = useState<Service | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Silme İşlemi
  const handleDelete = async (id: string) => {
    if (!confirm("Bu hizmeti silmek istediğinize emin misiniz?")) return;
    const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });

    if (res.ok) {
      toast.success("Hizmet alanı silindi.");
      fetchServices();
    } else {
      toast.error("Hizmet silinirken bir sorun oluştu.");
    }
  };

  // Ekleme ve Güncelleme İşlemi
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;

    const url = editService
      ? `/api/admin/services/${editService.id}`
      : "/api/admin/services";
    const method = editService ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug, category, description }),
    });

    if (res.ok) {
      toast.success(
        editService ? "Hizmet başarıyla güncellendi." : "Yeni hizmet eklendi.",
      );
      setOpen(false);
      setEditService(null);
      fetchServices();
    } else {
      toast.error("İşlem başarısız oldu.");
    }
  };

  const handleEditOpen = (service: Service) => {
    setEditService(service);
    setOpen(true);
  };

  const handleCreateOpen = () => {
    setEditService(null);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Hizmet Alanları Yönetimi
          </h1>
          <p className="text-slate-400 text-sm">
            Sunulan mühendislik hizmetlerini yönetin.
          </p>
        </div>

        <button
          onClick={handleCreateOpen}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Yeni Hizmet Ekle
        </button>

        <Dialog
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            if (!v) setEditService(null);
          }}
        >
          <DialogContent className="bg-slate-900 border-slate-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-emerald-400">
                {editService ? "Hizmeti Düzenle" : "Yeni Hizmet Ekle"}
              </DialogTitle>
            </DialogHeader>
            <form
              key={editService?.id || "new-service"}
              onSubmit={handleSubmit}
              className="space-y-4 pt-4"
            >
              <div>
                <label className="text-xs text-slate-300">Hizmet Başlığı</label>
                <Input
                  name="title"
                  defaultValue={editService?.title || ""}
                  required
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300">Kategori</label>
                <select
                  name="category"
                  defaultValue={editService?.category || "ISITMA"}
                  className="w-full h-10 px-3 rounded-md bg-slate-950 border border-slate-800 text-sm text-white"
                >
                  <option value="ISITMA">ISITMA</option>
                  <option value="SOGUTMA">SOĞUTMA</option>
                  <option value="PROJE_TISIM">PROJE ÇİZİMİ</option>
                  <option value="BAKIM_ONARIM">BAKIM & ONARIM</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-300">Açıklama</label>
                <Textarea
                  name="description"
                  defaultValue={editService?.description || ""}
                  required
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500"
              >
                {editService ? "Değişiklikleri Kaydet" : "Hizmeti Kaydet"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50">
        <Table>
          <TableHeader className="bg-slate-950">
            <TableRow className="border-slate-800">
              <TableHead className="text-slate-400">Başlık</TableHead>
              <TableHead className="text-slate-400">Kategori</TableHead>
              <TableHead className="text-slate-400">Açıklama</TableHead>
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
                  Hizmetler yükleniyor...
                </TableCell>
              </TableRow>
            ) : services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 space-y-3">
                  <Wrench className="w-10 h-10 text-slate-600 mx-auto stroke-1" />
                  <p className="text-slate-400 text-sm">
                    Tanımlanmış hizmet alanı bulunamadı.
                  </p>
                  <button
                    onClick={handleCreateOpen}
                    className="text-xs text-emerald-400 hover:underline inline-block font-medium"
                  >
                    + Yeni Hizmet Tanımla
                  </button>
                </TableCell>
              </TableRow>
            ) : (
              services.map((s) => (
                <TableRow key={s.id} className="border-slate-800">
                  <TableCell className="font-semibold text-white flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-emerald-400" /> {s.title}
                  </TableCell>
                  <TableCell className="text-emerald-400 text-xs">
                    {s.category}
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm max-w-md truncate">
                    {s.description}
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-cyan-400 hover:bg-cyan-500/10"
                      onClick={() => handleEditOpen(s)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-rose-400 hover:bg-rose-500/10"
                      onClick={() => handleDelete(s.id)}
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
