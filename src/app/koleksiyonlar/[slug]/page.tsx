import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Frame from "@/components/Frame";
import EditorialDark from "@/components/EditorialDark";
import EditorialGrid from "@/components/EditorialGrid";
import { collections, getCollection, projects, toEntry } from "@/lib/data";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return { title: "Koleksiyon bulunamadı" };
  return { title: `${c.name} Koleksiyonu`, description: c.tagline };
}

export default async function CollectionPage({ params }: Params) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const items = projects.filter((p) => p.collection === collection.slug);
  const index = collections.findIndex((c) => c.slug === collection.slug);
  const next = collections[(index + 1) % collections.length];

  return (
    <>
      <Header variant="dark" />
      <main>
        {/* Koyu editoryal açılış */}
        <section className="bg-void text-paper">
          <div className="relative h-[78svh]">
            <Frame
              seed={`kol-hero-${collection.slug}`}
              tone={collection.tone}
              scrim
              className="h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" />
            <div className="absolute left-4 md:left-5 bottom-8 text-white">
              <p className="label !text-white/70">
                Koleksiyon {String(index + 1).padStart(2, "0")} · {collection.year}
              </p>
              <h1 className="display text-[42px] md:text-[68px] mt-2">
                {collection.name}
              </h1>
              <p className="editorial italic opacity-85 mt-3 max-w-[36ch]">
                {collection.tagline}
              </p>
            </div>
          </div>
        </section>

        <EditorialDark collection={collection} withLink={false} />

        {/* Koleksiyondaki projeler */}
        <section className="py-6">
          <div className="flex items-baseline justify-between px-4 md:px-5 text-[12px] border-b rule pb-3">
            <p className="display text-[17px]">
              {collection.name} Projeleri
              <span className="count">{items.length}</span>
            </p>
            <Link href={`/projeler?koleksiyon=${collection.slug}`} className="label u-link">
              Katalogda Aç
            </Link>
          </div>

          {items.length ? (
            <EditorialGrid
              entries={items.map(toEntry)}
              offset={index}
              className="mt-8 px-4 md:px-5"
            />
          ) : (
            <p className="px-4 md:px-5 mt-8 text-[12px] opacity-60">
              Bu koleksiyonda yayımlanmış proje henüz yok.
            </p>
          )}
        </section>

        {/* Sonraki koleksiyon */}
        <Link
          href={`/koleksiyonlar/${next.slug}`}
          className="group block border-t rule"
        >
          <div className="relative h-[42svh]">
            <Frame
              seed={`kol-hero-${next.slug}`}
              tone={next.tone}
              scrim
              className="h-full w-full transition-transform duration-[1600ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
              <p className="label !text-white/80">Sonraki Koleksiyon</p>
              <p className="display text-[34px] md:text-[48px] mt-2">
                {next.name}
              </p>
            </div>
          </div>
        </Link>
      </main>
      <Footer />
    </>
  );
}
