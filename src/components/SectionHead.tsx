import Link from "next/link";
import Reveal from "./Reveal";

/**
 * Faculty Department'ın bölüm başlığı satırı:
 * başlık solda · açıklama ortada (dar ölçü) · VERSAL eylem sağda.
 */
export function SectionHead({
  title,
  description,
  href,
  action = "Tümü",
}: {
  title: string;
  description?: string;
  href?: string;
  action?: string;
}) {
  return (
    <Reveal className="grid grid-cols-12 gap-x-3 gap-y-3 items-start px-4 md:px-5">
      <h2 className="col-span-12 md:col-span-3 display text-[13px]">{title}</h2>
      {description && (
        <p className="col-span-12 md:col-span-6 intro">{description}</p>
      )}
      {href && (
        <div className="col-span-12 md:col-span-3 md:text-right">
          <Link href={href} className="label u-link">
            {action}
          </Link>
        </div>
      )}
    </Reveal>
  );
}

/** Sayfa girişi: dar ölçüde açılış paragrafı, altında adet etiketi. */
export function PageIntro({
  text,
  count,
  children,
}: {
  text: string;
  count?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="px-4 md:px-5 pt-10 pb-8">
      <p className="intro">{text}</p>
      {count && <p className="label mt-6">{count}</p>}
      {children}
    </Reveal>
  );
}
