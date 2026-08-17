import Link from "next/link";
import { categories, countByCategory, projects } from "@/lib/data";
import Frame from "./Frame";

/**
 * "Kataloğumuz" — solda etiket sütunu, yanında giriş paragrafı, altında
 * çalışma alanları.
 *
 * Kareler eskiden yana kayan bir raydaydı; artık hepsi tek ekranda yan yana
 * duruyor, o yüzden ok tuşlarına da gerek kalmadı. Kare oranı 4:5'ten 3:4'e
 * çekildi ki beş sütuna bölününce yükseklik ekranı taşırmasın.
 */
export default function CatalogSection() {
  return (
    <section className="border-t rule pt-6 pb-12 min-h-[100svh] flex flex-col justify-center">
      <div className="grid grid-cols-12 gap-6 px-4 md:px-5">
        <div className="col-span-12 md:col-span-3 label pt-[2px]">
          Kategoriler<span className="count">{categories.length}</span>
        </div>
        <div className="col-span-12 md:col-span-6">
          <p className="editorial max-w-[56ch]">
            Kataloğumuz {categories.length} çalışma alanı ve {projects.length} işle
            genişliyor: villalardan konut iç mekânlarına, ticari mekânlardan cephe
            ve 3D görselleştirme işlerine.
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-8 px-4 md:px-5">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/projeler?kategori=${c.slug}`}
            className="group block"
          >
            <div className="overflow-hidden">
              <Frame
                seed={`kategori-${c.slug}`}
                className="aspect-[3/4] transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
            </div>
            <p className="mt-3 display text-[15px]">
              {c.name}
              <span className="count">{countByCategory(c.slug)}</span>
            </p>
            <p className="label mt-[6px] group-hover:opacity-90 transition-opacity duration-500">
              {c.note}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 px-4 md:px-5">
        <Link href="/projeler" className="label u-link">
          Tüm Projeler
        </Link>
      </div>
    </section>
  );
}
