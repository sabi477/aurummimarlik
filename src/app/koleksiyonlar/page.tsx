import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Split from "@/components/Split";
import { collections, countByCollection } from "@/lib/data";

export const metadata: Metadata = {
  title: "Koleksiyonlar",
  description:
    "Ortak bir arazi tavrını, malzeme ailesini ve detay kütüphanesini paylaşan altı proje koleksiyonu.",
};

export default function CollectionsPage() {
  return (
    <>
      <Header />
      <main className="pt-[52px]">
        <div className="grid grid-cols-12 gap-6 px-4 md:px-5 py-6 border-b rule">
          <h1 className="col-span-12 md:col-span-3 display text-[17px]">
            Koleksiyonlar
            <span className="count">{collections.length}</span>
          </h1>
          <p className="col-span-12 md:col-span-6 editorial max-w-[58ch]">
            Her koleksiyon bir üslup değil, bir yöntem. Arazi okuması, malzeme
            seçimi ve detaylandırma biçimi ortak olan işleri bir araya getiriyor;
            biriken detay kütüphanesi bir sonraki projenin başlangıç noktası oluyor.
          </p>
        </div>

        {/* Her koleksiyon ekranı tam ikiye bölüyor, taraflar dönüşümlü */}
        {collections.map((c, i) => (
          <Split
            key={c.slug}
            eyebrow={`Koleksiyon ${String(i + 1).padStart(2, "0")}`}
            index={String(i + 1).padStart(2, "0")}
            title={c.name}
            href={`/koleksiyonlar/${c.slug}`}
            action="Koleksiyonu Gör"
            side={i % 2 === 0 ? "right" : "left"}
            body={
              <>
                <p className="italic mb-3">{c.tagline}</p>
                {/* Panel tek ekranda kalsın diye denemenin ilk cümleleri */}
                <p className="max-w-[52ch]">
                  {c.essay[0].split(". ").slice(0, 2).join(". ")}.
                </p>
                <p className="label mt-4">
                  {c.year} · {countByCollection(c.slug)} proje
                </p>
              </>
            }
            image={{
              seed: `kol-${c.slug}`,
              tone: c.tone,
              caption: c.name,
              meta: `${c.year} · ${countByCollection(c.slug)} proje`,
            }}
            inset={{
              seed: c.captions[0].seed,
              tone: c.captions[0].tone,
              caption: c.captions[0].text,
            }}
          />
        ))}
      </main>
      <Footer />
    </>
  );
}
