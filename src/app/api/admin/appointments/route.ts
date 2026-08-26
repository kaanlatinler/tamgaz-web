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
    return NextResponse.json({ error: "Randevular alınamadı." }, { status: 500 });
  }
}

