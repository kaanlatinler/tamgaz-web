import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Sadece okunmamış (isRead: false) olan son bildirimleri getir
    const notifications = await prisma.notification.findMany({
      where: { isRead: false },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json({ error: "Bildirimler alınamadı." }, { status: 500 });
  }
}

export async function PUT() {
  try {
    await prisma.notification.updateMany({
      where: { isRead: false },
      data: { isRead: true },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Güncellenemedi." }, { status: 500 });
  }
}