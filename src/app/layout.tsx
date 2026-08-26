// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tamgazmuhendislik.com"),
  title: {
    default: "Tamgaz Mühendislik | Doğalgaz Tesisatı & İklimlendirme Çözümleri",
    template: "%s | Tamgaz Mühendislik",
  },
  description:
    "İzmir ve çevresinde doğalgaz tesisatı, kombi montajı, proje çizimi, yetkili doğalgaz firması hizmetleri ve mühendislik çözümleri.",
  keywords: [
    "Doğalgaz Tesisatı",
    "Kombi Montajı",
    "Doğalgaz Proje Çizimi",
    "Yetkili Mühendislik Firması",
    "İzmir Doğalgaz",
    "Isıtma ve Soğutma Sistemleri",
  ],
  authors: [{ name: "Tamgaz Mühendislik" }],
  openGraph: {
    title: "Tamgaz Mühendislik | Doğalgaz Tesisatı & İklimlendirme Çözümleri",
    description:
      "İzmir ve çevresinde doğalgaz tesisatı, kombi montajı ve mühendislik çözümleri.",
    url: "https://tamgazmuhendislik.com",
    siteName: "Tamgaz Mühendislik",
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "GOOGLE_SEARCH_CONSOLE_DOGRULAMA_KODUNUZ",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

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
        {/* Sayfa Geçiş Çubuğu */}
        <NextTopLoader
          color="#10b981"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #10b981,0 0 5px #10b981"
        />
        <Navbar />
        <main className="flex-1">
          {children}
          <Toaster theme="dark" position="bottom-right" richColors />
        </main>
        <Footer />
      </body>
    </html>
  );
}
