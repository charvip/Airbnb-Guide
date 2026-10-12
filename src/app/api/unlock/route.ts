import { NextResponse, type NextRequest } from "next/server";

// Checks the passcode a guest typed on /unlock. If it matches, sets an
// httpOnly cookie so the middleware lets them into protected pages.
export async function POST(request: NextRequest) {
  const form = await request.formData();
  const attempt = String(form.get("code") ?? "").trim();
  const rawNext = String(form.get("next") ?? "/essentials");
  // Only allow redirects to pages on this site.
  const next = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/essentials";

  const code = process.env.GUEST_CODE;
  if (!code || attempt !== code) {
    return NextResponse.redirect(new URL(`/unlock?error=1&next=${encodeURIComponent(next)}`, request.url), 303);
  }

  const response = NextResponse.redirect(new URL(next, request.url), 303);
  response.cookies.set("guest_access", code, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14, // two weeks, long enough for a stay
  });
  return response;
}
