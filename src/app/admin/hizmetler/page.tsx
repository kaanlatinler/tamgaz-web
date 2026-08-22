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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Wrench } from "lucide-react";

interface Service {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [open, setOpen] = useState(false);

  const fetchServices = async () => {
    const res = await fetch("/api/admin/services");
    if (res.ok) {
      const data = await res.json();
      setServices(data);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;

    await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug, category, description }),
    });

    setOpen(false);
    fetchServices();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Hizmet Alanları Yönetimi
          </h1>
          <p className="text-slate-400 text-sm">
            Sitede sunulan mühendislik ve tesisat hizmetleri.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2">
              <Plus className="w-4 h-4" /> Yeni Hizmet Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-emerald-400">
                Yeni Hizmet Ekle
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4 pt-4">
              <div>
                <label className="text-xs text-slate-300">Hizmet Başlığı</label>
                <Input
                  name="title"
                  required
                  placeholder="Endüstriyel Gaz Tesisatı"
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300">Kategori</label>
                <select
                  name="category"
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
                  required
                  placeholder="Hizmet kapsamı..."
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500"
              >
                Hizmeti Kaydet
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((s) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
