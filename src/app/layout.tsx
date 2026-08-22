// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Tamgaz Mühendislik | İzmir Doğalgaz & Isıtma Sistemleri",
  description:
    "İzmir ve çevresinde yetkili doğalgaz tesisatı, proje çizimi, kombi satışı ve 7/24 teknik bakım hizmetleri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans bg-slate-950 text-slate-100 antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
