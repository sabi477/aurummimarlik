"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { categoryName, postHref, posts, projects } from "@/lib/data";
import Frame from "./Frame";

const EASE = [0.16, 1, 0.3, 1] as const;

const normalize = (s: string) =>
  s
    .toLocaleLowerCase("tr")
    .replaceAll("ı", "i")
    .replaceAll("ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c");

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Panel her açıldığında sorgu sıfırlanır — render sırasında düzeltilir.
  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    if (open) setQ("");
  }

  useEffect(() => {
    if (!open) return;
    // Panel geçişi bitmeden odağı almıyoruz.
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const n = normalize(q.trim());
    if (n.length < 2) return { projects: [], posts: [] };
    const match = (...fields: string[]) =>
      fields.some((f) => normalize(f).includes(n));

    return {
      projects: projects
        .filter((p) =>
          match(
            p.title,
            p.location,
            p.lede,
            categoryName(p.category),
            p.materials.join(" "),
          ),
        )
        .slice(0, 6),
      posts: posts.filter((p) => match(p.title, p.excerpt, p.kind)).slice(0, 3),
    };
  }, [q]);

  const empty =
    q.trim().length >= 2 &&
    !results.projects.length &&
    !results.posts.length;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Aramayı kapat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-ink/30 backdrop-blur-[2px] cursor-default"
          />
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-x-0 top-0 z-[61] bg-paper text-ink"
          >
            <div className="px-4 md:px-5 pt-4 pb-8">
              <div className="flex items-center gap-4 border-b rule pb-3">
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Proje, malzeme veya yer ara"
                  className="flex-1 bg-transparent outline-none text-[22px] md:text-[34px] tracking-tight placeholder:opacity-30"
                />
                <button type="button" onClick={onClose} className="u-link text-[12px]">
                  Kapat
                </button>
              </div>

              {q.trim().length < 2 && (
                <div className="mt-6 text-[12px] flex flex-wrap gap-x-6 gap-y-2 opacity-60">
                  <span>Öneriler:</span>
                  {["kireç sıva", "avlu", "restorasyon", "Ayvalık", "meşe"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="u-link"
                      onClick={() => setQ(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {empty && (
                <p className="mt-6 text-[12px] opacity-60">
                  “{q}” için sonuç bulunamadı.
                </p>
              )}

              {!!results.projects.length && (
                <div className="mt-8">
                  <p className="text-[12px] opacity-50 mb-3">
                    Projeler<span className="count">{results.projects.length}</span>
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {results.projects.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/projeler/${p.slug}`}
                        onClick={onClose}
                        className="group text-[12px]"
                      >
                        <Frame
                          seed={p.slug}
                          tone={p.tone}
                          className="aspect-[4/5] transition-transform duration-1000 group-hover:scale-[1.02]"
                        />
                        <p className="mt-2">{p.title}</p>
                        <p className="opacity-50">{p.location}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {!!results.posts.length && (
                <div className="mt-8 grid md:grid-cols-2 gap-8 text-[12px]">
                  {!!results.posts.length && (
                    <div>
                      <p className="opacity-50 mb-3">Günlük</p>
                      <ul className="flex flex-col gap-2">
                        {results.posts.map((p) => (
                          <li key={p.slug}>
                            <Link href={postHref(p)} onClick={onClose} className="u-link">
                              {p.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
