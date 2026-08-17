"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/shortlist";
import { categoryName, getProject } from "@/lib/data";
import Frame from "./Frame";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The cart drawer's counterpart: a shortlist the visitor carries into the
 * briefing form.
 */
export default function ShortlistDrawer() {
  const { items, open, setOpen, remove, clear } = useCart();
  const projects = items.map(getProject).filter((p) => p !== undefined);
  const totalArea = projects.reduce((sum, p) => sum + p.area, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Listeyi kapat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-ink/30 cursor-default"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed right-0 top-0 bottom-0 z-[61] w-full max-w-[400px] bg-paper text-ink flex flex-col border-l rule"
          >
            <div className="flex items-center justify-between px-4 h-[52px] border-b rule text-[12px]">
              <span>
                Listem<span className="count">{projects.length}</span>
              </span>
              <button type="button" onClick={() => setOpen(false)} className="u-link">
                Kapat
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 text-center text-[12px]">
                <p className="opacity-60">
                  Listeniz boş. Projelerin yanındaki “Listeye Ekle” ile bir seçki
                  oluşturup brief formuna taşıyabilirsiniz.
                </p>
                <Link
                  href="/projeler"
                  onClick={() => setOpen(false)}
                  className="u-link"
                >
                  Projelere Göz At →
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto no-bar">
                  {projects.map((p) => (
                    <li
                      key={p.slug}
                      className="flex gap-3 px-4 py-4 border-b rule text-[12px]"
                    >
                      <Frame
                        seed={p.slug}
                        tone={p.tone}
                        className="w-16 h-20 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/projeler/${p.slug}`}
                          onClick={() => setOpen(false)}
                          className="u-link block"
                        >
                          {p.title}
                        </Link>
                        <p className="opacity-50 mt-1">
                          {categoryName(p.category)} · {p.location}
                        </p>
                        <p className="opacity-50">
                          {p.area} m² · {p.year}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(p.slug)}
                        className="u-link self-start opacity-50"
                        aria-label={`${p.title} listeden çıkar`}
                      >
                        Çıkar
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="px-4 py-4 border-t rule text-[12px] flex flex-col gap-3">
                  <div className="flex justify-between opacity-60">
                    <span>Toplam referans alanı</span>
                    <span>{totalArea.toLocaleString("tr-TR")} m²</span>
                  </div>
                  <Link
                    href="/iletisim"
                    onClick={() => setOpen(false)}
                    className="border rule py-3 text-center hover:bg-ink hover:text-paper transition-colors duration-500"
                  >
                    Brief Gönder
                  </Link>
                  <button
                    type="button"
                    onClick={clear}
                    className="u-link self-start opacity-50"
                  >
                    Listeyi temizle
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
