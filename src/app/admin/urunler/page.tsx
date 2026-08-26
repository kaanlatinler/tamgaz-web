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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Trash2, Edit, Package } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Silme İşlemi
  const handleDelete = async (id: string) => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;

    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Ürün başarıyla silindi.");
      fetchProducts();
    } else {
      toast.error("Ürün silinirken bir hata oluştu.");
    }
  };

  // Ekleme ve Güncelleme İşlemi
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const url = editProduct
      ? `/api/admin/products/${editProduct.id}`
      : "/api/admin/products";
    const method = editProduct ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success(
        editProduct
          ? "Ürün bilgileri güncellendi."
          : "Yeni ürün başarıyla eklendi.",
      );
      setOpen(false);
      setEditProduct(null);
      fetchProducts();
    } else {
      toast.error("İşlem gerçekleştirilemedi.");
    }
  };

  const handleEditOpen = (product: Product) => {
    setEditProduct(product);
    setOpen(true);
  };

  const handleCreateOpen = () => {
    setEditProduct(null);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Ürün Kataloğu Yönetimi
          </h1>
          <p className="text-slate-400 text-sm">
            Satıştaki ürünleri ekleyin, düzenleyin veya kaldırın.
          </p>
        </div>

        <button
          onClick={handleCreateOpen}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Yeni Ürün Ekle
        </button>

        <Dialog
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            if (!v) setEditProduct(null);
          }}
        >
          <DialogContent className="bg-slate-900 border-slate-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-emerald-400">
                {editProduct ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
              </DialogTitle>
            </DialogHeader>
            <form
              key={editProduct?.id || "new-product"}
              onSubmit={handleSubmit}
              className="space-y-4 pt-4"
            >
              <div>
                <label className="text-xs text-slate-300">Ürün Adı</label>
                <Input
                  name="name"
                  defaultValue={editProduct?.name || ""}
                  required
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300">Marka</label>
                  <Input
                    name="brand"
                    defaultValue={editProduct?.brand || ""}
                    required
                    className="bg-slate-950 border-slate-800"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300">Fiyat (₺)</label>
                  <Input
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={editProduct?.price || ""}
                    required
                    className="bg-slate-950 border-slate-800"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-300">Görsel URL</label>
                <Input
                  name="imageUrl"
                  defaultValue={editProduct?.imageUrl || ""}
                  required
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500"
              >
                {editProduct ? "Değişiklikleri Kaydet" : "Ürünü Ekle"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50">
        <Table>
          <TableHeader className="bg-slate-950">
            <TableRow className="border-slate-800">
              <TableHead className="text-slate-400">Görsel</TableHead>
              <TableHead className="text-slate-400">Ürün Adı</TableHead>
              <TableHead className="text-slate-400">Marka</TableHead>
              <TableHead className="text-slate-400">Fiyat</TableHead>
              <TableHead className="text-right text-slate-400">
                İşlemler
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-12 text-slate-400"
                >
                  Veriler yükleniyor...
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 space-y-3">
                  <Package className="w-10 h-10 text-slate-600 mx-auto stroke-1" />
                  <p className="text-slate-400 text-sm">
                    Henüz eklenmiş bir ürün bulunmuyor.
                  </p>
                  <button
                    onClick={handleCreateOpen}
                    className="text-xs text-emerald-400 hover:underline inline-block font-medium"
                  >
                    + İlk ürünü ekle
                  </button>
                </TableCell>
              </TableRow>
            ) : (
              products.map((item) => (
                <TableRow key={item.id} className="border-slate-800">
                  <TableCell>
                    <div className="w-10 h-10 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center overflow-hidden">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <Package className="w-4 h-4 text-slate-600" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-white">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-slate-400">{item.brand}</TableCell>
                  <TableCell className="text-emerald-400 font-bold">
                    {item.price.toLocaleString("tr-TR")} ₺
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-cyan-400 hover:bg-cyan-500/10"
                      onClick={() => handleEditOpen(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-rose-400 hover:bg-rose-500/10"
                      onClick={() => handleDelete(item.id)}
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
