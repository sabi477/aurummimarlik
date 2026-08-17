import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Frame from "@/components/Frame";
import { projects } from "@/lib/data";
import { toneFor } from "@/lib/frames";

export const metadata: Metadata = {
  title: "Malzeme Paleti",
  description:
    "Aurum Design Studio'nun projelerinde kullandığı yüzeyler: kireç sıva, yerel taş, yağlı meşe, yaşlandırılmış bakır ve diğerleri.",
};

/** Her malzemeyi kullandığı projelerle birlikte topla. */
function palette() {
  const map = new Map<string, string[]>();
  for (const p of projects) {
    for (const m of p.materials) {
      map.set(m, [...(map.get(m) ?? []), p.title]);
    }
  }
  return [...map.entries()]
    .map(([name, used]) => ({ name, used }))
    .sort((a, b) => b.used.length - a.used.length || a.name.localeCompare(b.name, "tr"));
}

export default function MaterialsPage() {
  const items = palette();

  return (
    <>
      <Header />
      <main className="pt-[52px]">
        <div className="grid grid-cols-12 gap-6 px-4 md:px-5 py-6 border-b rule text-[12px]">
          <h1 className="col-span-12 md:col-span-3 display text-[17px]">
            Malzeme Paleti
            <span className="count">{items.length}</span>
          </h1>
          <p className="col-span-12 md:col-span-6 editorial max-w-[58ch]">
            Kataloğumuzdaki her yüzey, en az bir tamamlanmış işte kullanıldı ve bir
            mevsim boyunca izlendi. Fiziksel örnek setini stüdyoda inceleyebilir ya
            da ofisinize isteyebilirsiniz.
          </p>
        </div>

        <section className="grid grid-cols-2 md:grid-cols-6 gap-x-4 gap-y-10 px-4 md:px-5 py-10">
          {items.map((m) => (
            <div key={m.name} className="text-[12px]">
              <Frame
                seed={`malzeme-${m.name}`}
                tone={toneFor(m.name)}
                variant="swatch"
                className="aspect-square"
              />
              <p className="entry-title mt-2">
                {m.name}
                <span className="count">{m.used.length}</span>
              </p>
              <p className="entry-meta">
                {m.used.slice(0, 2).join(", ")}
                {m.used.length > 2 && ` +${m.used.length - 2}`}
              </p>
            </div>
          ))}
        </section>

        <section className="border-t rule px-4 md:px-5 py-10">
          <div className="grid grid-cols-12 gap-6 text-[12px]">
            <div className="col-span-12 md:col-span-3 label">Örnek Seti</div>
            <div className="col-span-12 md:col-span-6 max-w-[58ch]">
              <p className="editorial">
                On iki parçalık örnek seti; kireç sıva, toprak sıva, yağlı meşe,
                karbonize ahşap, yerel taş ve metal yüzeylerin gerçek uygulama
                örneklerini içerir. Meslektaşlar için ücretsizdir.
              </p>
              <div className="flex gap-6 mt-4">
                <Link href="/iletisim" className="u-link">
                  Örnek Seti İsteyin →
                </Link>
                <Link href="/is-ortakligi" className="u-link">
                  İş Ortaklığı →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
