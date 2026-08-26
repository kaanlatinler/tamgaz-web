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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Trash2,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Eye,
  MapPin,
  Phone,
  User,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";

interface Appointment {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  serviceType: string;
  status: string;
  note?: string;
  createdAt: string;
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/appointments");
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const res = await fetch(`/api/admin/appointments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      toast.success(`Randevu durumu "${newStatus}" olarak güncellendi.`);
      fetchAppointments();
      if (selectedAppointment?.id === id) {
        setSelectedAppointment((prev) =>
          prev ? { ...prev, status: newStatus } : null,
        );
      }
    } else {
      toast.error("Durum güncellenemedi.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu randevu kaydını silmek istediğinize emin misiniz?"))
      return;
    const res = await fetch(`/api/admin/appointments/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Randevu kaydı silindi.");
      if (selectedAppointment?.id === id) setSelectedAppointment(null);
      fetchAppointments();
    } else {
      toast.error("Silme işlemi başarısız.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ONAYLANDI":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            Onaylandı
          </Badge>
        );
      case "TAMAMLANDI":
        return (
          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
            Tamamlandı
          </Badge>
        );
      case "IPTAL":
        return (
          <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/30">
            İptal Edildi
          </Badge>
        );
      default:
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            Beklemede
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Keşif & Randevu Talepleri
        </h1>
        <p className="text-slate-400 text-sm">
          Siteden gelen keşif formları ve durum takibi.
        </p>
      </div>

      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50">
        <Table>
          <TableHeader className="bg-slate-950">
            <TableRow className="border-slate-800">
              <TableHead className="text-slate-400">Ad Soyad</TableHead>
              <TableHead className="text-slate-400">Telefon</TableHead>
              <TableHead className="text-slate-400">Hizmet</TableHead>
              <TableHead className="text-slate-400">Durum</TableHead>
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
                  Randevu talepleri alınıyor...
                </TableCell>
              </TableRow>
            ) : appointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 space-y-2">
                  <CalendarCheck className="w-10 h-10 text-slate-600 mx-auto stroke-1" />
                  <p className="text-slate-400 text-sm font-medium">
                    Henüz gelen bir keşif talebi yok.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((item) => (
                <TableRow key={item.id} className="border-slate-800">
                  <TableCell className="font-semibold text-white">
                    {item.fullName}
                  </TableCell>
                  <TableCell className="text-slate-300">{item.phone}</TableCell>
                  <TableCell className="text-emerald-400 text-xs font-medium">
                    {item.serviceType}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-xs text-cyan-400 hover:bg-cyan-500/10"
                      onClick={() => setSelectedAppointment(item)}
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" /> İncele
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 border-slate-700 text-xs text-emerald-400 hover:bg-emerald-950"
                      onClick={() => handleStatusChange(item.id, "ONAYLANDI")}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Onayla
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 border-slate-700 text-xs text-rose-400 hover:bg-rose-950"
                      onClick={() => handleStatusChange(item.id, "IPTAL")}
                    >
                      <XCircle className="w-3.5 h-3.5 mr-1" /> İptal
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

      {/* DETAY İNCELEME MODALI */}
      <Dialog
        open={!!selectedAppointment}
        onOpenChange={() => setSelectedAppointment(null)}
      >
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-emerald-400 flex items-center justify-between">
              <span>Keşif Talebi Detayları</span>
              {selectedAppointment &&
                getStatusBadge(selectedAppointment.status)}
            </DialogTitle>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4 pt-4 text-sm">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <User className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-white">
                    {selectedAppointment.fullName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <a
                    href={`tel:${selectedAppointment.phone}`}
                    className="hover:underline text-emerald-400 font-medium"
                  >
                    {selectedAppointment.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Wrench className="w-4 h-4 text-emerald-400" />
                  <span>{selectedAppointment.serviceType}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <label className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" /> Keşif
                  Adresi:
                </label>
                <p className="text-slate-200 leading-relaxed text-xs">
                  {selectedAppointment.address}
                </p>
              </div>

              {selectedAppointment.note && (
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                  <label className="text-xs text-slate-500 font-semibold">
                    Müşteri Notu:
                  </label>
                  <p className="text-slate-300 text-xs">
                    {selectedAppointment.note}
                  </p>
                </div>
              )}

              <div className="text-[10px] text-slate-500 text-right">
                Talep Tarihi:{" "}
                {new Date(selectedAppointment.createdAt).toLocaleString(
                  "tr-TR",
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
