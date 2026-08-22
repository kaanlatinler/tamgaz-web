"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function AppointmentPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage(
          "Randevu talebiniz başarıyla alındı! En kısa sürede sizinle iletişime geçeceğiz.",
        );
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    } catch {
      setMessage("Sunucu hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <Card className="w-full max-w-lg bg-slate-900 border-slate-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-emerald-400">
            Ücretsiz Keşif & Randevu
          </CardTitle>
          <CardDescription className="text-slate-400">
            Doğalgaz tesisatı, kombi montajı veya proje çizimi için formu
            doldurun.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-slate-300">Ad Soyad</label>
              <Input
                name="fullName"
                required
                placeholder="Ahmet Yılmaz"
                className="bg-slate-950 border-slate-800 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-300">Telefon Numarası</label>
              <Input
                name="phone"
                required
                type="tel"
                placeholder="05XX XXX XX XX"
                className="bg-slate-950 border-slate-800 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-300">Hizmet Türü</label>
              <select
                name="serviceType"
                required
                className="w-full h-10 px-3 rounded-md bg-slate-950 border border-slate-800 text-white text-sm"
              >
                <option value="Doğalgaz Tesisatı">Doğalgaz Tesisatı</option>
                <option value="Proje Çizimi">Proje Çizimi</option>
                <option value="Kombi Montajı">Kombi Montajı / Değişimi</option>
                <option value="Bakım & Onarım">Bakım & Onarım Servisi</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-300">Adres</label>
              <Textarea
                name="address"
                required
                placeholder="İlçe, Mahalle, Sokak detayları"
                className="bg-slate-950 border-slate-800 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-300">
                Ek Notlar (Opsiyonel)
              </label>
              <Textarea
                name="note"
                placeholder="Daire tipi, özel istekleriniz..."
                className="bg-slate-950 border-slate-800 text-white"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              {loading ? "Gönderiliyor..." : "Randevu Talebi Gönder"}
            </Button>
            {message && (
              <p className="text-sm text-center text-emerald-400 mt-2">
                {message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
