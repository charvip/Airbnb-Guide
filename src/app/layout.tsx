import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guest Guide",
  description: "Everything you need for your stay: room tour, appliance how-tos, essentials and things to do.",
};

// Content can change any time a host saves an edit, so render on every request.
export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <main className="mx-auto max-w-xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
