import { NextResponse, type NextRequest } from "next/server";

// Two gates:
// 1. /essentials (door code, WiFi) needs the guest passcode in GUEST_CODE.
//    If GUEST_CODE isn't set, the page stays open.
// 2. /host (the editor) needs the host password in HOST_PASSWORD.
//    If HOST_PASSWORD isn't set, the host side stays locked.
// Both values live in Vercel environment variables, never in the repo.

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/host")) {
    if (pathname === "/host/login") return NextResponse.next();
    const password = process.env.HOST_PASSWORD;
    if (password && request.cookies.get("host_access")?.value === password) {
      return NextResponse.next();
    }
    return redirectTo(request, "/host/login");
  }

  const code = process.env.GUEST_CODE;
  if (!code || request.cookies.get("guest_access")?.value === code) {
    return NextResponse.next();
  }
  return redirectTo(request, "/unlock");
}

function redirectTo(request: NextRequest, path: string) {
  const url = request.nextUrl.clone();
  url.pathname = path;
  url.search = `?next=${encodeURIComponent(request.nextUrl.pathname)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/essentials/:path*", "/host/:path*"],
};
