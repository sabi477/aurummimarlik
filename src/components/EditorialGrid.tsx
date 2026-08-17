import Link from "next/link";
import clsx from "clsx";
import Frame from "./Frame";
import Reveal from "./Reveal";
import type { Tone } from "@/lib/frames";

/**
 * Faculty Department'ın "Selected Stories" ızgarası.
 *
 * Uniform bir grid değil: her satırın yüksekliği sabit, kart genişlikleri
 * satır içinde değişiyor (dar–geniş–dar, sonra dört eşit…). Görüntüyü
 * dergiye benzeten şey bu düzensizlik.
 */

export type Entry = {
  href: string;
  seed: string;
  tone?: Tone;
  /** "Zeytinli Kıyı Evi, Villa" — ad ve rol tek satırda */
  title: string;
  /** "AYVALIK, BALIKESİR" — altında gri versal */
  meta: string;
  /** Kareyi sabitlemek için Unsplash ID'si */
  image?: string;
};

/** 12 kolon üzerinden satır desenleri; sırayla döner. */
const PATTERNS = [
  [3, 6, 3],
  [3, 3, 3, 3],
  [4, 4, 4],
  [6, 3, 3],
  [3, 3, 6],
] as const;

const SPAN: Record<number, string> = {
  3: "col-span-6 md:col-span-3",
  4: "col-span-6 md:col-span-4",
  6: "col-span-12 md:col-span-6",
};

/** Girdileri desenlere göre satırlara böler; her satır kendi dilimini taşır. */
function toRows(entries: Entry[], offset: number) {
  const rows: { spans: number[]; items: Entry[] }[] = [];
  let i = 0;
  let p = offset;
  while (i < entries.length) {
    const pattern = PATTERNS[p % PATTERNS.length];
    const take = Math.min(pattern.length, entries.length - i);
    rows.push({
      spans: [...pattern].slice(0, take),
      items: entries.slice(i, i + take),
    });
    i += take;
    p++;
  }
  return rows;
}

export default function EditorialGrid({
  entries,
  /** Deseni kaydırarak sayfalar arası tekrarı önler */
  offset = 0,
  className,
}: {
  entries: Entry[];
  offset?: number;
  className?: string;
}) {
  const rows = toRows(entries, offset);

  return (
    <div className={clsx("flex flex-col gap-y-12", className)}>
      {rows.map((row, r) => {
        return (
          <div key={r} className="grid grid-cols-12 gap-x-3 gap-y-10">
            {row.items.map((entry, i) => (
              // Satır içindeki kartlar aynı anda değil, kademeli belirir.
              <Reveal
                key={entry.href + i}
                delay={i * 0.07}
                className={SPAN[row.spans[i]] ?? SPAN[3]}
              >
                <Link href={entry.href} className="group block">
                  {/* Satır yüksekliği sabit, genişlik değişken */}
                  <div className="overflow-hidden h-[190px] md:h-[290px]">
                    <Frame
                      seed={entry.seed}
                      tone={entry.tone}
                      image={entry.image}
                      className="h-full w-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="entry-title mt-2 u-link inline-block">
                    {entry.title}
                  </p>
                  <p className="entry-meta">{entry.meta}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        );
      })}
    </div>
  );
}
