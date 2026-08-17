import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
});

const DESCRIPTION =
  "Aurum Design Studio; çağdaş çizgiyi doğal malzemeler, sıcak tonlar ve rafine detaylarla buluşturan bir mimarlık, iç mimarlık ve mimari görselleştirme stüdyosudur. Alaşehir merkezli; Manisa, İzmir ve çevresi.";

export const metadata: Metadata = {
  // Alt sayfaların göreli adresleri buradan mutlak hâle geliyor.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aurum Design Studio",
    template: "%s — Aurum Design Studio",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Aurum Design Studio",
    title: "Aurum Design Studio",
    description: DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurum Design Studio",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${montserrat.variable} h-full antialiased`}>
      <head>
        {/* Instagram gömüleri geç açılmasın diye bağlantı elle kuruluyor:
            gömü göründüğünde DNS + TLS zaten hazır oluyor. */}
        <link rel="preconnect" href="https://www.instagram.com" />
        <link rel="preconnect" href="https://scontent.cdninstagram.com" />
        <link rel="preconnect" href="https://static.cdninstagram.com" />
        <link rel="dns-prefetch" href="https://www.instagram.com" />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
