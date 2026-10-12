import { NextResponse, type NextRequest } from "next/server";

// Protects the Essentials page (door code, WiFi password) behind a guest passcode.
// The passcode lives in the GUEST_CODE environment variable (set it in Vercel),
// so it never appears in the public GitHub repo.
// If GUEST_CODE isn't set, the page stays open (handy for local development).

export const ACCESS_COOKIE = "guest_access";

export function middleware(request: NextRequest) {
  const code = process.env.GUEST_CODE;
  if (!code) return NextResponse.next();

  if (request.cookies.get(ACCESS_COOKIE)?.value === code) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/unlock";
  url.search = `?next=${encodeURIComponent(request.nextUrl.pathname)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/essentials/:path*"],
};
