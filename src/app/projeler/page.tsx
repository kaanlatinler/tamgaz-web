import { prisma } from "@/lib/prisma";
import { MapPin, CheckCircle2 } from "lucide-react";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-emerald-400">Tamamlanan Projelerimiz</h1>
          <p className="text-slate-400">İzmir genelinde teslim ettiğimiz daire, bina ve sanayi doğalgaz projeleri.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="h-56 bg-slate-950 overflow-hidden relative">
                {project.images?.[0] ? (
                  <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-700">Görsel Yok</div>
                )}
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-emerald-400 flex items-center gap-1 border border-emerald-500/30">
                  <MapPin className="w-3 h-3" /> {project.location}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold text-xl text-white">{project.title}</h3>
                <p className="text-sm text-slate-400 line-clamp-3">{project.description}</p>
                <div className="pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Proje Çizimi & Tesisat Tamamlandı
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}