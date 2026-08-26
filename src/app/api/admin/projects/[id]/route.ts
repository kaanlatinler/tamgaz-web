import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { title, location, description, images } = await req.json();

    const updated = await prisma.project.update({
      where: { id },
      data: { title, location, description, images },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Proje güncellenemedi." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Proje silinemedi." }, { status: 500 });
  }
}