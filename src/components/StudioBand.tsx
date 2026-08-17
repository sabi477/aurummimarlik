import Link from "next/link";
import { studio } from "@/lib/data";
import Frame from "./Frame";
import Reveal from "./Reveal";

/**
 * The studio band, cut in half: the workshop photograph holds the left of the
 * viewport, the founding story sits in a serif column on the right with its
 * content anchored low, Faculty Department style.
 */
export default function StudioBand({ withLink = true }: { withLink?: boolean }) {
  return (
    <section className="grid md:grid-cols-2 min-h-[100svh] border-t rule">
      <div className="relative min-h-[50svh] md:min-h-0">
        <Frame
          seed="studyo-atolye"
          tone="wood"
          scrim
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute left-4 md:left-6 bottom-6 md:bottom-8 text-white pr-6">
          <p className="display text-[16px] md:text-[18px]">
            {studio.city} Stüdyo
          </p>
          <p className="label mt-2 !text-white/75">{studio.region}</p>
        </div>
      </div>

      <div className="relative flex flex-col justify-end px-4 md:px-6 py-6 md:py-8">
        <span className="label absolute top-6 md:top-8 left-4 md:left-6">
          Stüdyo
        </span>

        {/* Anasayfadaki Hakkımızda bandı zaten `studio.lede`yi kullanıyor;
            burada tekrar etmemek için markanın vaadiyle giriliyor. */}
        <Reveal>
          <p className="editorial-lg max-w-[46ch]">{studio.promise}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-t rule mt-6 pt-4 grid grid-cols-12 gap-4">
            <span className="col-span-2 label">01</span>
            <div className="col-span-10 editorial max-w-[52ch] flex flex-col gap-4">
              {studio.about.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              {withLink && (
                <Link href="/hakkimizda" className="label u-link self-start mt-1">
                  Hakkımızda
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
