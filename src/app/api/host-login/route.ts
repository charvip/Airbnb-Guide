import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const attempt = String(form.get("password") ?? "");
  const rawNext = String(form.get("next") ?? "/host");
  const next = rawNext.startsWith("/host") ? rawNext : "/host";

  const password = process.env.HOST_PASSWORD;
  if (!password || attempt !== password) {
    return NextResponse.redirect(new URL(`/host/login?error=1&next=${encodeURIComponent(next)}`, request.url), 303);
  }

  const response = NextResponse.redirect(new URL(next, request.url), 303);
  response.cookies.set("host_access", password, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
