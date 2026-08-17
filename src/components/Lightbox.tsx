"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Frame from "./Frame";
import type { Tone } from "@/lib/frames";

const EASE = [0.16, 1, 0.3, 1] as const;
const MIN = 1;
const MAX = 4;

type Item = { seed: string; tone?: Tone };

/**
 * Galeri görüntüleyici: kareyi ekranı kaplayacak biçimde açar, yakınlaştırıp
 * kaydırmaya izin verir.
 *
 * Yakınlaştırma tekerlek, +/− tuşları ya da çift tıklamayla; yakınken kare
 * sürüklenerek geziliyor. Oklar kareler arasında dolaşıyor, Esc kapatıyor.
 */
export default function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: Item[];
  /** Açık kare; null ise görüntüleyici kapalı. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const open = index !== null;

  const go = useCallback(
    (step: number) => {
      if (index === null) return;
      onIndexChange((index + step + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  // Açıkken arkadaki sayfa kaymasın; Esc ve oklar burada dinleniyor.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };

    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose, go]);

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-0 z-50 bg-ink/95 text-paper"
          role="dialog"
          aria-modal="true"
          aria-label="Görsel görüntüleyici"
        >
          {/* Boş alana tıklamak kapatıyor */}
          <button
            type="button"
            aria-label="Kapat"
            onClick={onClose}
            className="absolute inset-0 cursor-zoom-out"
          />

          {/* Kare değiştiğinde görüntüleyici sıfırdan kuruluyor: yakınlaştırma
              ve kaydırma her karede yeniden başlıyor. */}
          <Viewer key={index} item={items[index]} onClose={onClose} />

          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4 md:px-6 text-[12px]">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Önceki görsel"
              className="text-[22px]"
            >
              ⟵
            </button>
            <span className="opacity-60 tabular-nums">
              {index + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Sonraki görsel"
              className="text-[22px]"
            >
              ⟶
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Tek karenin yakınlaştırma ve kaydırma durumu. */
function Viewer({ item, onClose }: { item: Item; onClose: () => void }) {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number } | null>(null);

  const reset = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  const zoomBy = useCallback((delta: number) => {
    setScale((s) => {
      const next = Math.min(MAX, Math.max(MIN, s + delta));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") zoomBy(0.5);
      else if (e.key === "-") zoomBy(-0.5);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomBy]);

  return (
    <>
      <div
        className="absolute inset-0 flex items-center justify-center p-6 md:p-12 pointer-events-none"
        onWheel={(e) => zoomBy(e.deltaY > 0 ? -0.3 : 0.3)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative w-full max-w-[1100px] h-full pointer-events-auto overflow-hidden"
          style={{ cursor: scale > 1 ? "grab" : "zoom-in" }}
          onDoubleClick={() => (scale > 1 ? reset() : zoomBy(1.5))}
          onPointerDown={(e) => {
            if (scale === 1) return;
            drag.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!drag.current) return;
            setPan({
              x: e.clientX - drag.current.x,
              y: e.clientY - drag.current.y,
            });
          }}
          onPointerUp={() => {
            drag.current = null;
          }}
        >
          <div
            className="h-full w-full transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            }}
          >
            <Frame seed={item.seed} tone={item.tone} className="h-full w-full" />
          </div>
        </motion.div>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-4 text-[12px]">
        <button type="button" onClick={() => zoomBy(-0.5)} aria-label="Uzaklaştır">
          −
        </button>
        <span className="opacity-60 tabular-nums">{Math.round(scale * 100)}%</span>
        <button type="button" onClick={() => zoomBy(0.5)} aria-label="Yakınlaştır">
          +
        </button>
        <button type="button" onClick={onClose}>
          Kapat ✕
        </button>
      </div>
    </>
  );
}
