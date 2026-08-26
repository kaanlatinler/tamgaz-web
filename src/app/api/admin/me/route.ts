import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const payload = await verifyJWT(token);
    if (!payload || !payload.userId) {
      return NextResponse.json({ error: "Geçersiz token" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}