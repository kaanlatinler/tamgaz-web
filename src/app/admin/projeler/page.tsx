"use client";

import { useEffect, useState } from "react";
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
import { Plus, MapPin, Trash2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  images: string[];
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);

  const fetchProjects = async () => {
    const res = await fetch("/api/admin/projects");
    if (res.ok) {
      const data = await res.json();
      setProjects(data);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const location = formData.get("location");
    const description = formData.get("description");
    const imageUrl = formData.get("imageUrl");

    await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        location,
        description,
        images: imageUrl ? [imageUrl] : [],
      }),
    });

    setOpen(false);
    fetchProjects();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Tamamlanan Proje Yönetimi
          </h1>
          <p className="text-slate-400 text-sm">
            Müşterilere sergilenen saha çalışmaları ve referanslar.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2">
              <Plus className="w-4 h-4" /> Yeni Proje Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-emerald-400">
                Referans Proje Ekle
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProject} className="space-y-4 pt-4">
              <div>
                <label className="text-xs text-slate-300">Proje Başlığı</label>
                <Input
                  name="title"
                  required
                  placeholder="Buca 12 Daire Tesisatı"
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300">Lokasyon</label>
                <Input
                  name="location"
                  required
                  placeholder="İzmir / Buca"
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300">
                  Proje Görsel URL
                </label>
                <Input
                  name="imageUrl"
                  required
                  placeholder="https://..."
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300">Açıklama</label>
                <Textarea
                  name="description"
                  required
                  placeholder="Proje kapsamında yapılan işlemler..."
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500"
              >
                Projeyi Kaydet
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Proje Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between"
          >
            <div className="h-40 bg-slate-950 relative">
              {item.images?.[0] && (
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-2 left-2 bg-slate-950/80 px-2.5 py-1 rounded-full text-[10px] text-emerald-400 flex items-center gap-1 border border-emerald-500/30">
                <MapPin className="w-3 h-3" /> {item.location}
              </div>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-bold text-white text-base">{item.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
