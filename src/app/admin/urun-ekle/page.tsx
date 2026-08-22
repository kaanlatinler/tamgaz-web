"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setMsg("Ürün başarıyla eklendi!");
      (e.target as HTMLFormElement).reset();
    } else {
      setMsg("Bir hata oluştu.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 flex justify-center items-center">
      <Card className="w-full max-w-lg bg-slate-900 border-slate-800 text-white">
        <CardHeader>
          <CardTitle className="text-emerald-400">Yeni Ürün Ekle</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-slate-300">Ürün Adı</label>
              <Input
                name="name"
                required
                placeholder="E.C.A Proteus Premix Kombi"
                className="bg-slate-950 border-slate-800"
              />
            </div>
            <div>
              <label className="text-sm text-slate-300">Marka</label>
              <Input
                name="brand"
                required
                placeholder="E.C.A / Vaillant"
                className="bg-slate-950 border-slate-800"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-300">Fiyat (TL)</label>
                <Input
                  name="price"
                  type="number"
                  step="0.01"
                  required
                  placeholder="25000"
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Stok</label>
                <Input
                  name="stock"
                  type="number"
                  defaultValue="10"
                  className="bg-slate-950 border-slate-800"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-300">Görsel URL</label>
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
              {loading ? "Ekleniyor..." : "Ürünü Kaydet"}
            </Button>
            {msg && (
              <p className="text-sm text-center text-emerald-400 mt-2">{msg}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
