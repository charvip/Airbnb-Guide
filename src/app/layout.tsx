import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guest Guide",
  description: "Everything you need for your stay: room tour, appliance how-tos, essentials and things to do.",
};

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
