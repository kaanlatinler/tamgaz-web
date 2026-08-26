import { Flame } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white">
      {/* Animasyonlu Logo Alanı */}
      <div className="relative flex items-center justify-center">
        {/* Dışındaki Dönmeyen Halka (Glow Effect) */}
        <div className="absolute w-20 h-20 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />

        {/* Dönüş Halkanın Çerçevesi */}
        <div className="w-16 h-16 rounded-full border-2 border-slate-800 border-t-emerald-500 border-r-orange-500 animate-spin" />

        {/* Ortadaki Alev İkonu */}
        <Flame className="w-7 h-7 text-orange-500 absolute animate-bounce" />
      </div>

      {/* Yükleniyor Yazısı */}
      <div className="mt-6 text-center space-y-1">
        <h3 className="font-bold text-base tracking-wider text-slate-200">
          TAMGAZ <span className="text-emerald-400">MÜHENDİSLİK</span>
        </h3>
        <p className="text-xs text-slate-500 font-medium tracking-widest animate-pulse">
          SİSTEM YÜKLENİYOR...
        </p>
      </div>
    </div>
  );
}
