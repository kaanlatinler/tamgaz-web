import { Loader2, Flame } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full bg-slate-950 text-slate-300">
      <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-xl">
        <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
        <div className="text-xs">
          <p className="font-semibold text-white">Panel Verileri Yükleniyor</p>
          <p className="text-slate-500">Lütfen bekleyin...</p>
        </div>
      </div>
    </div>
  );
}
