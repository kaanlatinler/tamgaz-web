import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  try {
    const { email, password, name, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Eksik bilgi." }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        email,
        password, // Not: Production'da bcrypt ile hash'lenmelidir
        name,
        role: role || "ADMIN",
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Kullanıcı eklenemedi." }, { status: 500 });
  }
}