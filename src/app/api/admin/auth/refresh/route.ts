import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT, createAccessToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "Refresh token bulunamadı." }, { status: 401 });
  }

  const payload = await verifyJWT(refreshToken);
  if (!payload || !payload.userId) {
    return NextResponse.json({ error: "Geçersiz refresh token." }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: payload.userId as string } });
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Kullanıcı bulunamadı." }, { status: 401 });
  }

  const newAccessToken = await createAccessToken({ userId: user.id, role: user.role });

  const response = NextResponse.json({ success: true });
  response.cookies.set("access_token", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60,
    path: "/",
  });

  return response;
}