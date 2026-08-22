import { ShieldCheck, Award, Users, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-slate-950 text-white min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Başlık & Giriş */}
        <div className="text-center space-y-4">
          <span className="text-emerald-400 font-semibold text-sm tracking-wider uppercase">
            Kurumsal
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Tamgaz Mühendislik Hakkında
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            İzmir ve çevresinde mühendislik disiplini, yüksek emniyet
            standartları ve müşteri memnuniyeti ilkesiyle hizmet veriyoruz.
          </p>
        </div>

        {/* 3 Temel Değer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
            <ShieldCheck className="w-10 h-10 text-emerald-400" />
            <h3 className="text-xl font-bold">Yetkili & Sertifikalı</h3>
            <p className="text-slate-400 text-sm">
              Bölge gaz dağıtım şirketleri tarafından yetkilendirilmiş mühendis
              kadrosuyla çalışıyoruz.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
            <Award className="w-10 h-10 text-orange-500" />
            <h3 className="text-xl font-bold">Yüksek Kalite Standartları</h3>
            <p className="text-slate-400 text-sm">
              Kullandığımız tüm malzeme ve cihazlar TSE belgeli ve uzun ömürlü
              garanti kapsamındadır.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
            <Users className="w-10 h-10 text-cyan-400" />
            <h3 className="text-xl font-bold">Uzman Saha Ekibi</h3>
            <p className="text-slate-400 text-sm">
              Tesisat çekiminden proje onayına, cihaz montajından ilk
              çalıştırmaya kadar uçtan uca hizmet.
            </p>
          </div>
        </div>

        {/* Detay Metni */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-emerald-400">
            Vizyonumuz & Taahhüdümüz
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Tamgaz Mühendislik olarak konut, iş yeri ve endüstriyel tesislerde
            doğalgaz dönüşüm süreçlerini en güvenli ve hızlı şekilde
            tamamlıyoruz. Teknolojik gelişmeleri yakından takip ederek enerjiyi
            en verimli şekilde kullanmanızı sağlayan çözümler üretiyoruz.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" /> Yetkili
              Mühendis Onaylı Projelendirme
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" /> Sızdırmazlık
              ve Basınç Testi Garantisi
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" /> Zamanında
              Proje Teslimi
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" /> 7/24
              Kesintisiz Arıza & Destek Servisi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
