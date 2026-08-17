"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Frame from "./Frame";
import { HERO_IMAGE } from "@/lib/frames";
import { studio } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Sahne iki kopya üzerine kurulu: arkada bulanık, önde net aynı kare.
 *
 * Net kopya başlangıçta ince, dikey bir pencereye kırpılı; etrafındaki bulanık
 * alan stüdyo adına yer bırakıyor. Birkaç saniye sonra pencere ekranın tamamına
 * açılıyor, bulanıklık çözülüyor ve fotoğraf net olarak ortaya çıkıyor.
 */

/** Açılıştaki dar pencere — inset(üst sağ alt sol). */
const WINDOW = "inset(9% 10% 12% 54%)";
const OPEN = "inset(0% 0% 0% 0%)";

export default function Hero() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    // Hareket azaltma açıkken bekleme yok: sahne ilk karede açık hâle geçiyor.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setOpened(true), reduced ? 0 : 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* Arka katman — bulanık; açılışta netleşiyor */}
      <motion.div
        initial={{ filter: "blur(18px)", scale: 1.12 }}
        animate={{
          filter: opened ? "blur(0px)" : "blur(18px)",
          scale: opened ? 1 : 1.12,
        }}
        transition={{ duration: 2, ease: EASE }}
        className="absolute inset-0"
      >
        <Frame
          seed="anasayfa-hero"
          tone="dusk"
          image={HERO_IMAGE}
          className="h-full w-full"
        />
      </motion.div>

      {/* Ön katman — net kopya, dar pencereden ekrana açılıyor */}
      <motion.div
        initial={{ clipPath: WINDOW }}
        animate={{ clipPath: opened ? OPEN : WINDOW }}
        transition={{ duration: 1.8, ease: EASE }}
        className="absolute inset-0"
      >
        <Frame
          seed="anasayfa-hero"
          tone="dusk"
          image={HERO_IMAGE}
          scrim
          className="h-full w-full"
        />
      </motion.div>

      {/* Pencerenin ince çerçevesi — açılırken siliniyor */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 0 : 0.7 }}
        transition={{
          duration: opened ? 0.6 : 1.2,
          delay: opened ? 0 : 0.3,
          ease: EASE,
        }}
        className="absolute top-[9%] bottom-[12%] left-[54%] right-[10%] border border-white pointer-events-none"
      />

      {/* Açılış yazısı — bulanık alanda duran kısa cümle ve marka adı */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
        className="absolute inset-0 pointer-events-none text-white"
      >
        {/* Marka adı net pencerenin içinde beliriyor ve pencere ekrana
            açıldıktan sonra da aynı yerde kalıyor — sayfanın tek adı bu.
            Ölçüler çerçeveyle birebir aynı. */}
        <h1 className="absolute top-[9%] bottom-[12%] left-[54%] right-[10%] flex flex-col items-center justify-center text-center px-3">
          {/* Dar ekranda pencere ~135px kalıyor; harf aralığı orada daraltılmasa
              "Design Studio" iki satıra kırılıyor. */}
          <span className="display text-[20px] md:text-[30px] tracking-[0.1em] md:tracking-[0.16em] uppercase">
            Aurum
          </span>
          <span className="label !text-white/80 mt-2 tracking-[0.16em] md:tracking-[0.3em]">
            Design Studio
          </span>
        </h1>
      </motion.div>

      {/* Açıldıktan sonraki künye */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ duration: 1, delay: opened ? 0.9 : 0, ease: EASE }}
        className="absolute inset-0 text-white"
      >
        <div className="absolute left-4 md:left-5 bottom-6 text-[12px] max-w-[280px]">
          <p className="opacity-90">{studio.tagline}</p>
          <Link href="/koleksiyonlar/kiyi" className="u-link mt-3 inline-block">
            Kıyı Koleksiyonunu Keşfedin
          </Link>
        </div>

        <span className="absolute right-4 md:right-5 bottom-6 text-[12px] opacity-80">
          Kaydırın ↓
        </span>
      </motion.div>
    </section>
  );
}
