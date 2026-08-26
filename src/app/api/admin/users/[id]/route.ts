import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Kullanıcı Güncelle (UPDATE)
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { name, email, password, role } = await req.json();

    const updateData: any = { name, email, role };
    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true, name: true, email: true, role: true },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Kullanıcı güncellenemedi." }, { status: 500 });
  }
}

// Kullanıcı Sil (DELETE)
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Kullanıcı silinemedi." }, { status: 500 });
  }
}