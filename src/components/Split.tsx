import Link from "next/link";
import clsx from "clsx";
import Frame from "./Frame";
import Reveal from "./Reveal";
import type { Tone } from "@/lib/frames";

/**
 * Faculty Department's signature move: the viewport cut exactly in half — one
 * side a full-bleed photograph with its caption set into the image, the other a
 * cream editorial panel whose content is anchored to the bottom.
 *
 * The panel's internal structure is theirs too: a title row with a small
 * uppercase action on the right, a hairline, then a numbered gutter beside a
 * serif paragraph.
 */

export type SplitImage = {
  seed: string;
  tone?: Tone;
  /** Fotoğrafın içine yerleşen başlık */
  caption?: string;
  /** Başlığın altındaki versal künye satırı */
  meta?: string;
};

type Props = {
  eyebrow?: string;
  index?: string;
  title: string;
  body: React.ReactNode;
  href?: string;
  action?: string;
  image: SplitImage;
  /** Panelin içine giren ikinci, küçük görsel */
  inset?: SplitImage;
  /** Fotoğrafın hangi yarıda duracağı */
  side?: "left" | "right";
  className?: string;
};

export default function Split({
  eyebrow,
  index,
  title,
  body,
  href,
  action = "Daha Fazla",
  image,
  inset,
  side = "right",
  className,
}: Props) {
  const panel = (
    <div className="relative flex flex-col justify-end px-4 md:px-6 py-6 md:py-8 min-h-[52svh] md:min-h-0">
      {eyebrow && (
        <span className="label absolute top-6 md:top-8 left-4 md:left-6">
          {eyebrow}
        </span>
      )}

      {inset && (
        <Reveal className="mb-8 md:mb-10 max-w-[60%]">
          <Frame
            seed={inset.seed}
            tone={inset.tone}
            className="aspect-[4/3]"
          />
          {inset.caption && (
            <p className="label mt-2">{inset.caption}</p>
          )}
        </Reveal>
      )}

      <Reveal delay={0.08}>
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="display text-[15px] md:text-[16px]">{title}</h2>
          {href && (
            <Link href={href} className="label u-link shrink-0">
              {action}
            </Link>
          )}
        </div>

        <div className="border-t rule mt-3 pt-3 grid grid-cols-12 gap-4">
          {index && <span className="col-span-2 label">{index}</span>}
          <div className={clsx("editorial", index ? "col-span-10" : "col-span-12")}>
            {body}
          </div>
        </div>
      </Reveal>
    </div>
  );

  const photo = (
    <div className="relative min-h-[62svh] md:min-h-0">
      <Frame
        seed={image.seed}
        tone={image.tone}
        scrim={!!(image.caption || image.meta)}
        className="absolute inset-0 h-full w-full"
      />
      {(image.caption || image.meta) && (
        <Reveal
          delay={0.15}
          className="absolute left-4 md:left-6 bottom-6 md:bottom-8 text-white pr-6"
        >
          {image.caption && (
            <p className="display text-[16px] md:text-[18px]">{image.caption}</p>
          )}
          {image.meta && (
            <p className="label mt-2 !text-white/75">{image.meta}</p>
          )}
        </Reveal>
      )}
    </div>
  );

  return (
    <section
      className={clsx(
        "grid md:grid-cols-2 md:min-h-[86svh] border-t rule",
        className,
      )}
    >
      {side === "left" ? (
        <>
          {photo}
          {panel}
        </>
      ) : (
        <>
          {panel}
          {photo}
        </>
      )}
    </section>
  );
}
