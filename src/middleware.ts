import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const accessToken = req.cookies.get("access_token")?.value;
    const refreshToken = req.cookies.get("refresh_token")?.value;

    if (accessToken) {
      const valid = await verifyJWT(accessToken);
      if (valid) return NextResponse.next();
    }

    // Access Token geçersiz ama Refresh Token varsa yenileme tetikle
    if (refreshToken) {
      const validRefresh = await verifyJWT(refreshToken);
      if (validRefresh) {
        const refreshRes = await fetch(new URL("/api/admin/auth/refresh", req.url), {
          method: "POST",
          headers: { cookie: req.headers.get("cookie") || "" },
        });

        if (refreshRes.ok) {
          const res = NextResponse.next();
          const setCookieHeader = refreshRes.headers.get("set-cookie");
          if (setCookieHeader) {
            res.headers.set("set-cookie", setCookieHeader);
          }
          return res;
        }
      }
    }

    // İki token da geçersizse login sayfasına yönlendir
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};