"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import {
  categoryName,
  collectionName,
  galleryFor,
  projects,
  type Project,
} from "@/lib/data";
import { useCart } from "@/lib/shortlist";
import Frame from "./Frame";
import Lightbox from "./Lightbox";
import LocationMap from "./LocationMap";
import ProjectCard from "./ProjectCard";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ProjectDetail({ project }: { project: Project }) {
  const { has, toggle } = useCart();
  const saved = has(project.slug);
  const gallery = galleryFor(project);
  // Görüntüleyicideki kareler galeriyle aynı sırayı ve tonu taşıyor.
  const galleryItems = gallery.map((seed, i) => ({
    seed,
    tone: i % 3 === 1 ? ("dusk" as const) : project.tone,
  }));
  const [zoomed, setZoomed] = useState<number | null>(null);

  const related = projects
    .filter((p) => p.collection === project.collection && p.slug !== project.slug)
    .slice(0, 4);

  return (
    <>
      <div className="grid grid-cols-12 gap-6 px-4 md:px-5 pt-[52px]">
        {/* ── Sol sütun: künye ve eylemler ───────────────────────── */}
        <div className="col-span-12 md:col-span-6 text-[12px]">
          <div className="md:sticky md:top-[52px] md:h-[calc(100vh-52px)] md:overflow-y-auto no-bar py-5 md:pr-10 flex flex-col">
            {/* Kırıntı yolu */}
            <div className="grid grid-cols-3 gap-4">
              <div className="border-t rule pt-2">
                <Link href="/projeler" className="label u-link">
                  Projeler
                </Link>
              </div>
              <div className="border-t rule pt-2">
                <Link
                  href={`/projeler?kategori=${project.category}`}
                  className="label u-link"
                >
                  {categoryName(project.category)}
                </Link>
              </div>
              <div className="border-t rule pt-2 editorial italic opacity-70">
                {project.lede}
              </div>
            </div>

            {/* Başlık */}
            <h1 className="mt-24 md:mt-32 display text-[22px] md:text-[26px]">
              {project.title}
            </h1>

            {/* Künye satırları */}
            <div className="mt-24 md:mt-32">
              <SpecRow label="Kategori" options={[categoryName(project.category)]} />
              <SpecRow label="Malzeme" options={project.materials} />
              <SpecRow label="Program" options={project.program} />
            </div>

            <div className="mt-4 opacity-60">
              <p>Tasarım süresi: {Math.max(8, Math.round(project.area / 24))} hafta</p>
              <p>
                Durum: {project.status} · {project.year}
              </p>
            </div>

            {/* Eylem çubuğu */}
            <div className="mt-5 grid grid-cols-12 border rule">
              <div className="col-span-4 flex items-center justify-between px-3 py-[10px] border-r rule">
                <span className="opacity-50">Alan</span>
                <span>{project.area.toLocaleString("tr-TR")} m²</span>
              </div>
              <div className="col-span-4 flex items-center px-3 py-[10px] border-r rule">
                {project.location}
              </div>
              <button
                type="button"
                onClick={() => toggle(project.slug)}
                aria-pressed={saved}
                className={clsx(
                  "col-span-4 px-3 py-[10px] text-left transition-colors duration-500",
                  saved ? "bg-ink text-paper" : "hover:bg-ink hover:text-paper",
                )}
              >
                {saved ? "Listede ✓" : "Listeye Ekle"}
              </button>
            </div>

            {/* Açılır bölümler */}
            <div className="mt-8">
              <Accordion title="Genel Bakış" defaultOpen>
                <p className="editorial max-w-[54ch]">{project.overview}</p>
              </Accordion>

              <Accordion title="Açıklama">
                <p className="editorial max-w-[54ch]">{project.story}</p>
              </Accordion>

              <Accordion title="Künye + İndirmeler">
                <dl className="grid grid-cols-2 gap-y-2 max-w-[46ch]">
                  <Meta label="Yer" value={project.location} />
                  <Meta label="Yıl" value={project.year} />
                  <Meta
                    label="Alan"
                    value={`${project.area.toLocaleString("tr-TR")} m²`}
                  />
                  <Meta label="Durum" value={project.status} />
                  <Meta
                    label="Koleksiyon"
                    value={collectionName(project.collection)}
                  />
                  <Meta label="Kategori" value={categoryName(project.category)} />
                </dl>
              </Accordion>

              <Accordion title="Koleksiyonu Keşfet">
                <p className="editorial mb-3 max-w-[54ch]">
                  Bu proje {collectionName(project.collection)} koleksiyonunun bir
                  parçası.
                </p>
                <Link
                  href={`/koleksiyonlar/${project.collection}`}
                  className="label u-link"
                >
                  {collectionName(project.collection)} Koleksiyonu
                </Link>
              </Accordion>

              <Accordion title="Malzeme Örnekleri">
                <div className="flex flex-wrap gap-3">
                  {project.materials.map((m) => (
                    <div key={m} className="w-[86px]">
                      <Frame
                        seed={`${project.slug}-${m}`}
                        tone={project.tone}
                        variant="swatch"
                        className="aspect-square"
                      />
                      <p className="mt-[6px] opacity-60 leading-tight">{m}</p>
                    </div>
                  ))}
                </div>
              </Accordion>
            </div>

            {/* Ok bağlantıları */}
            <div className="mt-8 flex flex-col gap-2 pb-10">
              <Link href="/iletisim" className="label u-link self-start">
                → Bu Proje Hakkında Sorun
              </Link>
              <Link href="/is-ortakligi" className="label u-link self-start">
                → Künye Sayfasını İndir
              </Link>
            </div>
          </div>
        </div>

        {/* ── Sağ sütun: galeri ──────────────────────────────────── */}
        <div className="col-span-12 md:col-span-6 flex flex-col gap-[2px] pb-24">
          {gallery.map((seed, i) => (
            // Kareye tıklamak görüntüleyiciyi açıyor; oradan yakınlaştırılıyor.
            <button
              key={seed}
              type="button"
              onClick={() => setZoomed(i)}
              aria-label={`${project.title} — görsel ${i + 1}, büyüt`}
              className="group relative block cursor-zoom-in"
            >
              <Frame
                seed={seed}
                tone={i % 3 === 1 ? "dusk" : project.tone}
                className={
                  i === 0
                    ? "aspect-[3/4]"
                    : i % 3 === 0
                      ? "aspect-[4/5]"
                      : "aspect-square"
                }
              />
              <span className="absolute bottom-3 right-3 label !text-white opacity-0 group-hover:opacity-90 transition-opacity duration-500">
                Büyüt +
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Konum ────────────────────────────────────────────────── */}
      <LocationMap
        location={project.location}
        className="border-t rule py-8 md:py-10"
      />

      <Lightbox
        items={galleryItems}
        index={zoomed}
        onClose={() => setZoomed(null)}
        onIndexChange={setZoomed}
      />

      {/* ── İlgili projeler ──────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t rule py-6">
          <div className="flex items-baseline justify-between px-4 md:px-5 text-[12px]">
            <p className="display text-[15px]">
              {collectionName(project.collection)} Koleksiyonundan
              <span className="count">{related.length}</span>
            </p>
            <Link
              href={`/projeler?koleksiyon=${project.collection}`}
              className="label u-link"
            >
              Tümü
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 px-4 md:px-5">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

/* ── Parçalar ─────────────────────────────────────────────────── */

function SpecRow({ label, options }: { label: string; options: string[] }) {
  const [value, setValue] = useState(options[0]);
  return (
    <div className="flex items-center justify-between border-t rule py-[10px] last:border-b">
      <span>{label}</span>
      {options.length > 1 ? (
        <div className="relative flex items-center">
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label={label}
            className="spec-select opacity-70"
          >
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-0 opacity-50">⌄</span>
        </div>
      ) : (
        <span className="opacity-70">{options[0]}</span>
      )}
    </div>
  );
}

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-2 py-[5px] text-left"
      >
        <span
          className={clsx(
            "h-[5px] w-[5px] rounded-full bg-ink transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <span className="u-link" data-active={open || undefined}>
          {title}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pl-[13px] pb-4 pt-1 opacity-80">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="opacity-50">{label}</dt>
      <dd>{value}</dd>
    </>
  );
}
