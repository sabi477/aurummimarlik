import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: "Aurum Design Studio",
    template: "%s — Aurum Design Studio",
  },
  description:
    "Aurum Design Studio; çağdaş çizgiyi doğal malzemeler, sıcak tonlar ve rafine detaylarla buluşturan bir mimarlık, iç mimarlık ve mimari görselleştirme stüdyosudur. Alaşehir merkezli; Manisa, İzmir ve çevresi.",
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
