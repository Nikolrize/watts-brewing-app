import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthGuard from "@/components/custom/auth-guard";

const InterSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Watt's Brewing",
  description: "Rail Energy Regeneration Network (RERN) | Turning every railway into a power generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${InterSans.variable} h-full antialiased dark`}>
      <body>
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}
