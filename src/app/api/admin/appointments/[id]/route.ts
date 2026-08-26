import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status, note } = await req.json();

    const updated = await prisma.appointment.update({
      where: { id },
      data: { status, note },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Randevu güncellenemedi." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.appointment.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Randevu silinemedi." }, { status: 500 });
  }
}