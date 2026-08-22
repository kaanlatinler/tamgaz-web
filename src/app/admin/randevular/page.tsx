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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Appointment {
  id: string;
  fullName: string;
  phone: string;
  serviceType: string;
  address: string;
  note?: string;
  status: "BEKLEMEDE" | "ONAYLANDI" | "TAMAMLANDI" | "IPTAL";
  createdAt: string;
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/admin/appointments");
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error("Randevular yüklenemedi", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    await fetch("/api/admin/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    fetchAppointments();
  };

  return (
    <div className="p-8 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-emerald-400">
          Gelen Keşif & Servis Talepleri
        </h1>

        <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900">
          <Table>
            <TableHeader className="bg-slate-950">
              <TableRow className="border-slate-800">
                <TableHead className="text-slate-300">Müşteri</TableHead>
                <TableHead className="text-slate-300">İletişim</TableHead>
                <TableHead className="text-slate-300">Hizmet</TableHead>
                <TableHead className="text-slate-300">Adres / Not</TableHead>
                <TableHead className="text-slate-300">Durum</TableHead>
                <TableHead className="text-right text-slate-300">
                  İşlemler
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Yükleniyor...
                  </TableCell>
                </TableRow>
              ) : (
                appointments.map((item) => (
                  <TableRow key={item.id} className="border-slate-800">
                    <TableCell className="font-medium text-white">
                      {item.fullName}
                    </TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-emerald-400 border-emerald-500/30"
                      >
                        {item.serviceType}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className="max-w-xs truncate text-slate-400"
                      title={item.address}
                    >
                      {item.address}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          item.status === "BEKLEMEDE"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : item.status === "ONAYLANDI"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-emerald-500/20 text-emerald-400"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {item.status === "BEKLEMEDE" && (
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-500 text-xs"
                          onClick={() => updateStatus(item.id, "ONAYLANDI")}
                        >
                          Onayla
                        </Button>
                      )}
                      {item.status === "ONAYLANDI" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-700 text-xs"
                          onClick={() => updateStatus(item.id, "TAMAMLANDI")}
                        >
                          Tamamlandı
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
