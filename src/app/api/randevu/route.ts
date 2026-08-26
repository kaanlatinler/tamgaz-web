import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendTelegramNotification } from "@/lib/telegram";

export async function POST(req: Request) {
  try {
    const { fullName, phone, address, serviceType } = await req.json();

    if (!fullName || !phone || !address) {
      return NextResponse.json(
        { error: "Lütfen zorunlu alanları doldurun." },
        { status: 400 }
      );
    }

    // 1. Randevu kaydını veritabanına ekle
    const appointment = await prisma.appointment.create({
      data: {
        fullName,
        phone,
        address,
        serviceType: serviceType || "Genel Keşif",
        status: "BEKLEMEDE",
      },
    });

    // 2. 🔔 PANEL ZİLİ İÇİN BİLDİRİM KAYDI OLUŞTUR (Unutulan Kısım)
    await prisma.notification.create({
      data: {
        title: "Yeni Keşif Talebi!",
        message: `${fullName} (${phone}) - ${serviceType || "Genel Keşif"} talebinde bulundu.`,
      },
    });

    // 3. Telegram Bildirimi Gönder
    sendTelegramNotification({
      fullName,
      phone,
      address,
      serviceType: serviceType || "Genel Keşif",
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error("Randevu oluşturma hatası:", error);
    return NextResponse.json(
      { error: "Randevu talebi iletilemedi." },
      { status: 500 }
    );
  }
}