"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner"

import { AuthProvider } from "@/components/context/AuthProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
          {children}
        <Toaster />
      </body>
    </html>
  );
}
