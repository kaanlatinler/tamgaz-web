import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Flame, Snowflake, Wrench, FileCheck, ArrowRight } from "lucide-react";

export default async function ServicesPage() {
  const services = await prisma.service.findMany();

  const getServiceIcon = (category: string) => {
    switch (category) {
      case "ISITMA":
        return <Flame className="w-8 h-8 text-orange-500" />;
      case "SOGUTMA":
        return <Snowflake className="w-8 h-8 text-cyan-400" />;
      case "PROJE_TISIM":
        return <FileCheck className="w-8 h-8 text-emerald-400" />;
      default:
        return <Wrench className="w-8 h-8 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-emerald-400">
            Mühendislik ve Tesisat Hizmetlerimiz
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Doğalgaz tesisatından iklimlendirme sistemlerine kadar geniş hizmet
            yelpazemizle yanınızdayız.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-6 hover:border-emerald-500/40 transition"
            >
              <div className="space-y-4">
                <div className="p-3 bg-slate-950 w-fit rounded-lg border border-slate-800">
                  {getServiceIcon(service.category)}
                </div>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <Button className="w-full bg-slate-800 hover:bg-emerald-600 text-white transition">
                <Link
                  href={`/hizmetler/${service.slug}`}
                  className="flex items-center justify-center gap-2"
                >
                  Detaylı Bilgi & İncele
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
