import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, phone, serviceType, address, note } = body;

    if (!fullName || !phone || !serviceType || !address) {
      return NextResponse.json({ error: "Lütfen gerekli alanları doldurun." }, { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: { fullName, phone, serviceType, address, note },
    });

    return NextResponse.json({ success: true, data: appointment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Randevu oluşturulamadı." }, { status: 500 });
  }
}