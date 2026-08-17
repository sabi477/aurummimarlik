import { reels, reelUrl, studio, REEL_RATIO, REEL_SCALE } from "@/lib/data";
import InstagramEmbed from "./InstagramEmbed";
import Reveal from "./Reveal";

/** Üç reel, Instagram gömüsüyle doğrudan sitede oynuyor. */
export default function ReelsStrip() {
  return (
    <section className="border-t rule py-8 md:py-10 min-h-[100svh] flex flex-col justify-center">
      <div className="grid grid-cols-12 gap-6 px-4 md:px-5">
        <div className="col-span-12 md:col-span-3 label pt-[2px]">
          Reels<span className="count">{reels.length}</span>
        </div>
        <p className="col-span-12 md:col-span-6 editorial max-w-[52ch]">
          Şantiyeden, atölyeden ve render masasından kısa kayıtlar.
        </p>
        {/* Bağlantı sütunu değil, yalnızca kendi metnini kaplasın — alt çizgi
            sütun genişliğince uzamasın diye sarmalayıcı sütunu üstleniyor. */}
        <div className="col-span-12 md:col-span-3 self-start md:text-right">
          <a
            href={studio.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="label u-link inline-block"
          >
            Instagram’da İzle →
          </a>
        </div>
      </div>

      {/* Mobilde kareler alt alta yığılmıyor: yan yana durup parmakla kayan
          bir şerit oluyor. sm'den itibaren üç sütunlu ızgaraya dönüyor;
          kareler 360px'de sınırlı, sütun genişse ortalanıyor. */}
      <div className="mt-8 flex sm:grid sm:grid-cols-3 gap-4 px-4 md:px-5 sm:justify-items-center overflow-x-auto sm:overflow-visible no-bar snap-x snap-mandatory scroll-px-4">
        {reels.map((r, i) => (
          <Reveal
            key={r.code}
            delay={i * 0.07}
            className="shrink-0 snap-start w-[68vw] sm:w-full max-w-[360px]"
          >
            <InstagramEmbed
              kind="reel"
              code={r.code}
              title={r.title}
              ratio={REEL_RATIO}
              scale={REEL_SCALE}
            />
            <a
              href={reelUrl(r)}
              target="_blank"
              rel="noopener noreferrer"
              className="group block mt-3"
            >
              <p className="entry-title u-link inline-block">{r.title}</p>
              <p className="entry-meta">{r.meta}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
