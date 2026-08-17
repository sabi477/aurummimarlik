"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

/**
 * Instagram gönderisini sitede, kendi beyaz kartı olmadan gösterir.
 *
 * `.../embed/` sayfası iframe'e alınıyor — Instagram'ın embed.js dosyasına
 * ihtiyaç kalmıyor. O sayfa medyayı bir kartın içine koyuyor: üstte hesap
 * başlığı, altta "gönderiyi gör" + beğeni satırı. Sitenin dili buna uymadığı
 * için iframe kutudan büyük tutulup kaydırılıyor; görünen pencerede yalnızca
 * medyanın kendisi kalıyor.
 *
 * Aşağıdaki sabitler gömü sayfası tarayıcıda tek başına açılıp ölçülerek
 * bulundu; genişlikten bağımsız, sabit yüksekliklerdir.
 */
const HEADER = 54;
const FOOTER = 154;

type Props = {
  /** Reels için "reel", normal gönderi için "p". */
  kind: "reel" | "p";
  code: string;
  /** iframe başlığı — ekran okuyucular için. */
  title: string;
  /** Kutunun en/boy oranı, `aspect-ratio` dizgisi olarak (ör. "840 / 1491"). */
  ratio: string;
  /**
   * iframe genişliğinin kutu genişliğine oranı.
   *
   * Reels'te gömü, 16:9 videoyu 4:5'lik bir kutuya `contain` ile oturtuyor;
   * video yalnızca genişliğin %70.4'ünü kaplayıp iki yanında siyah bant
   * bırakıyor. 1.42 katı ölçekleyip ortalayınca bantlar dışarıda kalıyor.
   * Fotoğraf gönderilerinde görsel zaten tam genişlikte, ölçek 1.
   */
  scale?: number;
  /**
   * Kutuyu sarmalayıcısına `cover` gibi oturtur: oran korunur, taşan kenar
   * kırpılır. Sarmalayıcı `relative overflow-hidden @container` olmalı —
   * ölçü konteyner birimleriyle (cqw/cqh) hesaplanıyor.
   */
  cover?: boolean;
  className?: string;
};

export default function InstagramEmbed({
  kind,
  code,
  title,
  ratio,
  scale = 1,
  cover = false,
  className,
}: Props) {
  // "840 / 1491" → 840/1491. Cover'da genişlik iki adayın büyüğü oluyor:
  // konteyner genişliği ya da konteyner yüksekliğini dolduran genişlik.
  const [rw, rh] = ratio.split("/").map((n) => Number(n.trim()));
  const coverStyle = cover
    ? { width: `max(100cqw, ${(rw / rh).toFixed(4)} * 100cqh)` }
    : undefined;

  const box = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // `loading="lazy"` gömüyü ancak kutu görünmeye çok yaklaşınca yüklüyordu;
  // Instagram tarafı yavaş olduğu için kare, ekrana girdikten saniyeler sonra
  // açılıyordu. Bunun yerine iframe'i bir ekran önceden takıyoruz: kullanıcı
  // oraya vardığında video çoktan yüklenmiş oluyor.
  useEffect(() => {
    const el = box.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(el);

    return () => io.disconnect();
  }, []);

  return (
    // Gömü yüklenene kadar arkada sessiz bir blok duruyor.
    <div
      ref={box}
      className={clsx(
        "relative overflow-hidden bg-ink/10",
        cover && "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        className,
      )}
      style={{ aspectRatio: ratio, ...coverStyle }}
    >
      {mounted && (
        <iframe
          src={`https://www.instagram.com/${kind}/${code}/embed/`}
          title={title}
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          scrolling="no"
          className="absolute border-0"
          style={{
            width: `${scale * 100}%`,
            left: `${-((scale - 1) / 2) * 100}%`,
            top: `-${HEADER}px`,
            height: `calc(100% + ${HEADER + FOOTER}px)`,
          }}
        />
      )}
    </div>
  );
}
