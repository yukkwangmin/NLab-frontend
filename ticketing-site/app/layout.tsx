// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 1. AuthProvider를 import 합니다.
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TicketHub",
  description: "Ticketing service for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. <AuthProvider>로 {children}을 감싸줍니다. */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}