import Link from "next/link";
import type { Collection } from "@/lib/data";
import { countByCollection } from "@/lib/data";
import Frame from "./Frame";

/**
 * The dark collection spread: two captioned details high on the page, a wide
 * band of empty ground, then a serif paragraph sitting low and right.
 */
export default function EditorialDark({
  collection,
  withLink = true,
}: {
  collection: Collection;
  withLink?: boolean;
}) {
  const [a, b] = collection.captions;

  return (
    <section className="bg-void text-paper">
      <div className="grid grid-cols-12 gap-6 px-4 md:px-5 pt-24 pb-16 text-[12px]">
        <div className="col-span-6 md:col-span-3 md:col-start-2">
          <Frame seed={a.seed} tone={a.tone} className="aspect-[4/5]" />
          <p className="label !text-paper/55 mt-2 max-w-[24ch]">{a.text}</p>
        </div>

        <div className="col-span-4 md:col-span-2">
          <Frame seed={b.seed} tone={b.tone} className="aspect-square" />
        </div>
        <div className="col-span-12 md:col-span-3 md:pt-1">
          <p className="label !text-paper/55">{b.text}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 px-4 md:px-5 pb-24">
        <div className="col-span-12 md:col-span-6 md:col-start-6 font-serif text-[15px] md:text-[17px] leading-[1.5]">
          {collection.essay.map((para, i) => (
            <p key={i} className={i > 0 ? "mt-5" : undefined}>
              {para}
            </p>
          ))}
          {withLink && (
            <Link
              href={`/koleksiyonlar/${collection.slug}`}
              className="u-link label !text-paper/75 mt-6 inline-block"
            >
              {collection.name} Koleksiyonu
              <span className="count">{countByCollection(collection.slug)}</span>
            </Link>
          )}
        </div>
      </div>

      <div className="px-4 md:px-5 pb-6 label !text-paper/50 border-t rule-invert pt-5">
        Bilgi — {collection.name}, {collection.year}
      </div>
    </section>
  );
}
