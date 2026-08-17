import { categoryName, collectionName, getProject } from "@/lib/data";
import Split from "./Split";

/**
 * The featured project, given the half-and-half treatment: the scene fills the
 * right of the viewport with its caption set into the photograph, while the
 * left panel carries the numbered index and the serif description.
 */
export default function FeaturedSection({
  slug,
  index = "01",
  side = "right",
}: {
  slug: string;
  index?: string;
  side?: "left" | "right";
}) {
  const p = getProject(slug);
  if (!p) return null;

  return (
    <Split
      eyebrow="Öne Çıkan"
      index={index}
      title={p.title}
      href={`/projeler/${p.slug}`}
      action="İncele"
      side={side}
      body={
        <>
          <p className="max-w-[48ch]">{p.overview}</p>
          <p className="label mt-4">
            {categoryName(p.category)} · {p.area.toLocaleString("tr-TR")} m² ·{" "}
            {p.year}
          </p>
        </>
      }
      inset={{
        seed: `${p.slug}-inset`,
        tone: p.tone,
        caption: `${collectionName(p.collection)} koleksiyonu`,
      }}
      image={{
        seed: `${p.slug}-featured`,
        tone: p.tone,
        caption: p.lede,
        meta: `${p.location} · ${collectionName(p.collection)} · ${p.status}`,
      }}
    />
  );
}
