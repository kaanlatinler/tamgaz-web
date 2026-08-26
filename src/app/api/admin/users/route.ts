import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Kullanıcılar alınamadı." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { email, password, name, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "E-posta ve şifre zorunludur." }, { status: 400 });
    }

    // Şifreyi 10 salt round ile hash'liyoruz
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || "ADMIN",
      },
      select: { id: true, email: true, name: true, role: true },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Kullanıcı eklenemedi veya e-posta zaten kullanımda." }, { status: 500 });
  }
}