import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { title, slug, category, description } = await req.json();

    const updated = await prisma.service.update({
      where: { id },
      data: { title, slug, category, description },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Hizmet güncellenemedi." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Hizmet silinemedi." }, { status: 500 });
  }
}