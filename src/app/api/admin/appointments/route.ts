import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Gelen tüm randevuları listele
export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error: "Veriler alınamadı." }, { status: 500 });
  }
}

// Randevu durumunu güncelle (Örn: BEKLEMEDE -> ONAYLANDI)
export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    const updated = await prisma.appointment.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Güncelleme başarısız." }, { status: 500 });
  }
}