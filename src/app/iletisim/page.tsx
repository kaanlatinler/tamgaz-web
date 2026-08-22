import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="bg-slate-950 text-white min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-emerald-400">
            Bizimle İletişime Geçin
          </h1>
          <p className="text-slate-400">
            Sorularınız, keşif talepleriniz ve teknik destek için 7/24
            ulaşabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* İletişim Bilgileri */}
          <div className="space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
              <h2 className="text-2xl font-bold border-b border-slate-800 pb-4">
                İletişim Detayları
              </h2>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold">Adres</h4>
                  <p className="text-slate-400 text-sm">
                    İzmir ve Tüm Çevre İlçeleri
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold">Telefon</h4>
                  <p className="text-slate-400 text-sm">
                    0232 000 00 00 / 0500 000 00 00
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold">E-Posta</h4>
                  <p className="text-slate-400 text-sm">
                    info@tamgazmuhendislik.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold">Calışma Saatleri</h4>
                  <p className="text-slate-400 text-sm">
                    Pazartesi - Cumartesi: 08:30 - 19:00 (7/24 Servis)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* İletişim Formu */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">Mesaj Gönderin</h2>
            <form className="space-y-4">
              <div>
                <label className="text-sm text-slate-300">Ad Soyad</label>
                <Input
                  placeholder="Ahmet Yılmaz"
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">
                  E-Posta veya Telefon
                </label>
                <Input
                  placeholder="iletisim@adresiniz.com"
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300">Mesajınız</label>
                <Textarea
                  placeholder="Projeniz veya sorunuz hakkında detay verin..."
                  className="bg-slate-950 border-slate-800 text-white h-32"
                />
              </div>
              <Button
                type="button"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                Mesajı Gönder
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
