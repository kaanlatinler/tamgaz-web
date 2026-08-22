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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2, Package } from "lucide-react";

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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    setOpen(false);
    fetchProducts();
  };

  return (
    <div className="space-y-6">
      {/* Üst Başlık & Ekle Butonu */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Ürün Kataloğu Yönetimi
          </h1>
          <p className="text-slate-400 text-sm">
            Sitede satıştaki tüm kombi ve iklimlendirme malzemeleri.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition">
            <Plus className="w-4 h-4" /> Yeni Ürün Ekle
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-emerald-400">
                Yeni Ürün Ekle
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProduct} className="space-y-4 pt-4">
              <div>
                <label className="text-xs text-slate-300">Ürün Adı</label>
                <Input
                  name="name"
                  required
                  placeholder="E.C.A Proteus Premix"
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-300">Marka</label>
                  <Input
                    name="brand"
                    required
                    placeholder="E.C.A / Vaillant"
                    className="bg-slate-950 border-slate-800"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300">Fiyat (₺)</label>
                  <Input
                    name="price"
                    type="number"
                    step="0.01"
                    required
                    placeholder="24000"
                    className="bg-slate-950 border-slate-800"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-300">Görsel URL</label>
                <Input
                  name="imageUrl"
                  required
                  placeholder="https://..."
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500"
              >
                {loading ? "Kaydediliyor..." : "Ürünü Yayınla"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tablo */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50">
        <Table>
          <TableHeader className="bg-slate-950">
            <TableRow className="border-slate-800">
              <TableHead className="text-slate-400">Görsel</TableHead>
              <TableHead className="text-slate-400">Ürün Adı</TableHead>
              <TableHead className="text-slate-400">Marka</TableHead>
              <TableHead className="text-slate-400">Fiyat</TableHead>
              <TableHead className="text-right text-slate-400">İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((item) => (
              <TableRow
                key={item.id}
                className="border-slate-800 hover:bg-slate-800/40"
              >
                <TableCell>
                  <div className="w-12 h-12 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center overflow-hidden">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <Package className="w-5 h-5 text-slate-600" />
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
                <TableCell className="text-right">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
