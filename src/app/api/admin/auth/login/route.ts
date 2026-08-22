import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createAccessToken, createRefreshToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "E-posta ve şifre zorunludur." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Geçersiz kimlik bilgileri veya yetkisiz erişim." }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "E-posta veya şifre hatalı." }, { status: 401 });
    }

    const accessToken = await createAccessToken({ userId: user.id, role: user.role });
    const refreshToken = await createRefreshToken({ userId: user.id });

    const response = NextResponse.json({ success: true, user: { name: user.name, email: user.email } });

    // Access Token Cookie (15 Dakika)
    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60,
      path: "/",
    });

    // Refresh Token Cookie (7 Gün)
    response.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Giriş işlemi sırasında hata oluştu." }, { status: 500 });
  }
}