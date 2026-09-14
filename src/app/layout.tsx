import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import Navbar from "@/components/Navbar";
import ParticleCursor from "@/components/ParticleCursor";
import { LangProvider } from "@/components/LangContext";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...createMetadata({
    title: "Maxim Kuzilov | Full-Stack разработчик, SEO-специалист",
    description:
      "Портфолио Кузилова Максима — Full-Stack разработчик и SEO-специалист. Веб-разработка, мобильные приложения, десктопное ПО, SEO-оптимизация. 5+ лет опыта на FL и Kwork.",
    path: "/",
  }),
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable} ${geistMono.variable}`}>
      <body className="bg-black text-white font-sans selection:bg-white selection:text-black min-h-screen">
        <LangProvider>
          <ParticleCursor />
          <SmoothScrolling>
            <div className="relative z-10">
              <Navbar />
              <main className="pt-28 sm:pt-20 md:pt-24 min-h-screen">
                {children}
              </main>
            </div>
          </SmoothScrolling>
        </LangProvider>
      </body>
    </html>
  );
}
