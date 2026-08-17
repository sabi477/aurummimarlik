"use client";

import { useEffect, useRef, useState } from "react";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Görünüm alanına giren içeriği bir kez, aşağıdan yukarı belirtir.
 *
 * Sunucu bileşenleri bunu sarmalayıcı olarak kullanabilir; yalnızca bu dosya
 * istemciye iniyor. Izgaralarda `delay` ile kartlar arasında kademe verilir.
 *
 * IntersectionObserver tek başına yeterli değil: sayfa hızlıca ya da sıçrayarak
 * kaydırıldığında (çapa bağlantısı, sayfa ortasında yenileme) gözlemci hiç
 * tetiklenmeyip içeriği kalıcı olarak görünmez bırakabiliyor. Bu yüzden
 * kaydırmada konum kontrolü yapan bir ağ da var.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setShown(true);
      io.disconnect();
      window.removeEventListener("scroll", check);
    };

    // Ekranın altına girmişse ya da üstünde kalmışsa beklemeden göster.
    const check = () => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.92) reveal();
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) reveal();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    window.addEventListener("scroll", check, { passive: true });

    // İlk değerlendirme bir kare sonraya bırakılıyor: efekt gövdesinde
    // doğrudan setState çağırmamak için.
    const frame = requestAnimationFrame(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        reveal();
        return;
      }
      check();
    });

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("scroll", check);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: `opacity 0.9s ${EASE} ${delay}s, transform 0.9s ${EASE} ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
