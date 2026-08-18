"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import clsx from "clsx";
import {
  categories,
  countByCategory,
  projects,
} from "@/lib/data";
import ProjectCard from "./ProjectCard";

type Size = "S" | "M" | "L";
type Sort = "yeni" | "alan-artan" | "alan-azalan" | "yil";

const SORTS: { key: Sort; label: string }[] = [
  { key: "yeni", label: "En yeni" },
  { key: "yil", label: "Yıla göre" },
  { key: "alan-azalan", label: "Alan: büyükten küçüğe" },
  { key: "alan-artan", label: "Alan: küçükten büyüğe" },
];

const COLS: Record<Size, string> = {
  S: "grid-cols-3 md:grid-cols-6",
  M: "grid-cols-2 md:grid-cols-4",
  L: "grid-cols-1 md:grid-cols-3",
};

export default function ProjectsBrowser() {
  const router = useRouter();
  const params = useSearchParams();

  const kategori = params.get("kategori");
  const filtre = params.get("filtre");

  const [size, setSize] = useState<Size>("M");
  const [sort, setSort] = useState<Sort>("yeni");
  const [filterOpen, setFilterOpen] = useState(false);
  // In Common With'in "Light" anahtarının karşılığı: fotoğrafları akşam
  // paletine çevirir.
  const [lights, setLights] = useState(true);

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value === null) next.delete(key);
    else next.set(key, value);
    // Kategori ve hazır filtreler birbirini dışlar.
    if (key === "kategori") next.delete("filtre");
    if (key === "filtre") next.delete("kategori");
    const qs = next.toString();
    router.push(qs ? `/projeler?${qs}` : "/projeler", { scroll: false });
  };

  const list = useMemo(() => {
    let out = [...projects];
    if (kategori) out = out.filter((p) => p.category === kategori);
    if (filtre === "yeni") out = out.filter((p) => p.isNew);
    if (filtre === "devam") out = out.filter((p) => p.status !== "Tamamlandı");

    switch (sort) {
      case "yil":
        out.sort((a, b) => Number(b.year) - Number(a.year));
        break;
      case "alan-azalan":
        out.sort((a, b) => b.area - a.area);
        break;
      case "alan-artan":
        out.sort((a, b) => a.area - b.area);
        break;
      default:
        out.sort(
          (a, b) =>
            Number(!!b.isNew) - Number(!!a.isNew) || Number(b.year) - Number(a.year),
        );
    }
    return out;
  }, [kategori, filtre, sort]);

  const title = kategori
    ? categories.find((c) => c.slug === kategori)?.name ?? "Projeler"
    : filtre === "yeni"
      ? "Yeni Tamamlanan"
      : filtre === "devam"
        ? "Devam Eden"
        : "Tüm Projeler";

  const active = (cond: boolean) => (cond ? "true" : undefined);

  return (
    <div className="pt-[52px]">
      {/* Işık anahtarı */}
      <div className="flex justify-end items-center gap-3 px-4 md:px-5 py-4 text-[12px]">
        <span className="label">Işık:</span>
        <button
          type="button"
          role="switch"
          aria-checked={lights}
          aria-label="Fotoğraf ışığı"
          onClick={() => setLights((v) => !v)}
          className={clsx(
            "relative h-[16px] w-[30px] rounded-full border rule transition-colors duration-500",
            lights ? "bg-paper" : "bg-ink",
          )}
        >
          <span
            className={clsx(
              "absolute top-[2px] h-[10px] w-[10px] rounded-full transition-all duration-500",
              lights ? "left-[2px] bg-ink" : "left-[16px] bg-paper",
            )}
          />
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6 px-4 md:px-5 pb-24">
        {/* Kenar çubuğu */}
        <aside className="hidden md:block md:col-span-2 text-[12px]">
          <div className="sticky top-[72px] flex flex-col gap-6 border-t rule pt-3">
            <ul className="flex flex-col gap-[5px]">
              <SideItem
                label="Tüm Projeler"
                active={!kategori && !filtre}
                onClick={() => router.push("/projeler", { scroll: false })}
              />
              <SideItem
                label="Yeni Tamamlanan"
                active={filtre === "yeni"}
                onClick={() => setParam("filtre", filtre === "yeni" ? null : "yeni")}
              />
              <SideItem
                label="Devam Eden"
                active={filtre === "devam"}
                onClick={() => setParam("filtre", filtre === "devam" ? null : "devam")}
              />
              <li>
                <Link href="/malzeme" className="u-link">
                  Malzeme Paleti
                </Link>
              </li>
            </ul>

            <div>
              <p className="label mb-2">Kategoriler</p>
              <ul className="flex flex-col gap-[5px]">
                <SideItem
                  label="Tüm Kategoriler"
                  active={!kategori}
                  onClick={() => setParam("kategori", null)}
                />
                {categories.map((c) => (
                  <SideItem
                    key={c.slug}
                    label={c.name}
                    count={countByCategory(c.slug)}
                    active={kategori === c.slug}
                    onClick={() =>
                      setParam("kategori", kategori === c.slug ? null : c.slug)
                    }
                  />
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Sonuçlar */}
        <div className="col-span-12 md:col-span-10">
          <div className="flex items-baseline justify-between gap-4 border-t rule pt-3 text-[12px]">
            <h1 className="display text-[17px]">
              {title}
              <span className="count">{list.length}</span>
            </h1>

            <button
              type="button"
              onClick={() => setFilterOpen((v) => !v)}
              className="u-link"
              aria-expanded={filterOpen}
            >
              {filterOpen ? "− Filtre" : "+ Filtre"}
            </button>

            <div className="hidden md:flex items-center gap-3">
              <span className="label">Görünüm:</span>
              {(["S", "M", "L"] as Size[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className="u-link"
                  data-active={active(size === s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {filterOpen && (
            <div className="mt-4 border-t rule pt-4 text-[12px] flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="label">Sırala:</span>
              {SORTS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSort(s.key)}
                  className="u-link"
                  data-active={active(sort === s.key)}
                >
                  {s.label}
                </button>
              ))}
              {(kategori || filtre) && (
                <button
                  type="button"
                  onClick={() => router.push("/projeler", { scroll: false })}
                  className="u-link ml-auto opacity-60"
                >
                  Filtreleri temizle ×
                </button>
              )}
            </div>
          )}

          {list.length === 0 ? (
            <p className="mt-16 text-[12px] opacity-60">
              Bu seçimle eşleşen proje yok.
            </p>
          ) : (
            <div className={clsx("mt-6 grid gap-x-4 gap-y-10", COLS[size])}>
              {list.map((p) => (
                <ProjectCard key={p.slug} project={p} dusk={!lights} size={size} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SideItem({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <li className="flex items-center gap-[6px]">
      <span
        className={clsx(
          "h-[5px] w-[5px] rounded-full bg-ink transition-opacity duration-300",
          active ? "opacity-100" : "opacity-0",
        )}
      />
      <button type="button" onClick={onClick} className="u-link" data-active={active || undefined}>
        {label}
        {count !== undefined && <span className="count">{count}</span>}
      </button>
    </li>
  );
}
