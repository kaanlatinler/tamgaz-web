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
} from "@/components/ui/dialog";
import { Plus, MapPin, Trash2, Edit, FolderGit2 } from "lucide-react";
import { toast } from "sonner";

interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  images: string[];
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Silme İşlemi
  const handleDelete = async (id: string) => {
    if (!confirm("Bu projeyi silmek istediğinize emin misiniz?")) return;
    const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });

    if (res.ok) {
      toast.success("Proje başarıyla silindi.");
      fetchProjects();
    } else {
      toast.error("Proje silinirken bir hata oluştu.");
    }
  };

  // Ekleme ve Güncelleme İşlemi
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const location = formData.get("location");
    const description = formData.get("description");
    const imageUrl = formData.get("imageUrl") as string;

    const url = editProject
      ? `/api/admin/projects/${editProject.id}`
      : "/api/admin/projects";
    const method = editProject ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        location,
        description,
        images: imageUrl ? [imageUrl] : editProject?.images || [],
      }),
    });

    if (res.ok) {
      toast.success(
        editProject
          ? "Proje bilgileri güncellendi."
          : "Yeni proje başarıyla eklendi.",
      );
      setOpen(false);
      setEditProject(null);
      fetchProjects();
    } else {
      toast.error("Proje kaydedilirken hata oluştu.");
    }
  };

  const handleEditOpen = (project: Project) => {
    setEditProject(project);
    setOpen(true);
  };

  const handleCreateOpen = () => {
    setEditProject(null);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Referans Projeler</h1>
          <p className="text-slate-400 text-sm">
            Müşterilere sergilenen saha çalışmaları.
          </p>
        </div>

        <button
          onClick={handleCreateOpen}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Yeni Proje Ekle
        </button>

        <Dialog
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            if (!v) setEditProject(null);
          }}
        >
          <DialogContent className="bg-slate-900 border-slate-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-emerald-400">
                {editProject ? "Projeyi Düzenle" : "Referans Proje Ekle"}
              </DialogTitle>
            </DialogHeader>
            <form
              key={editProject?.id || "new-project"}
              onSubmit={handleSubmit}
              className="space-y-4 pt-4"
            >
              <div>
                <label className="text-xs text-slate-300">Proje Başlığı</label>
                <Input
                  name="title"
                  defaultValue={editProject?.title || ""}
                  required
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300">Lokasyon</label>
                <Input
                  name="location"
                  defaultValue={editProject?.location || ""}
                  required
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300">Görsel URL</label>
                <Input
                  name="imageUrl"
                  defaultValue={editProject?.images?.[0] || ""}
                  required
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300">Açıklama</label>
                <Textarea
                  name="description"
                  defaultValue={editProject?.description || ""}
                  required
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500"
              >
                {editProject ? "Değişiklikleri Kaydet" : "Projeyi Kaydet"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">
          Projeler yükleniyor...
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-12 text-center space-y-3">
          <FolderGit2 className="w-12 h-12 text-slate-600 mx-auto stroke-1" />
          <h3 className="text-white font-semibold">Henüz Proje Eklenmemiş</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            Tamamlanan saha çalışmalarını sergilemek için ilk projeyi oluşturun.
          </p>
          <button
            onClick={handleCreateOpen}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium px-4 py-2 rounded-lg inline-flex items-center gap-2 transition mt-2"
          >
            <Plus className="w-3.5 h-3.5" /> Yeni Proje Ekle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between"
            >
              <div className="h-44 bg-slate-950 relative">
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
              <div className="p-3 border-t border-slate-800 flex justify-end gap-2 bg-slate-950/40">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 border-slate-700 text-cyan-400 hover:bg-slate-800"
                  onClick={() => handleEditOpen(item)}
                >
                  <Edit className="w-3.5 h-3.5 mr-1" /> Düzenle
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 border-slate-700 text-rose-400 hover:bg-slate-800"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" /> Sil
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
