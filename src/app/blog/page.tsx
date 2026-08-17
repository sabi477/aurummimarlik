import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Frame from "@/components/Frame";
import Reveal from "@/components/Reveal";
import { postHref, posts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Malzeme denemeleri, şantiye notları ve yöntem üzerine yazılar — Aurum Design Studio.",
};

/**
 * Blog, dergi düzeninde kurulu: koyu bir manşet panosu, altında "Son Yazılar"
 * kart ızgarası, sonra solda numaralı okuma listesi + sağda iki geniş kart.
 * Sayfanın alt ucunda arşiv notu duruyor.
 */
export default function JournalPage() {
  const [lead] = posts;
  // Manşetten sonraki dört yazı ızgarada; kalanlar aşağıdaki iki geniş kartta.
  const latest = posts.slice(1, 5);
  const spotlight = posts.slice(4, 6);
  // Okuma listesi en çok okunanları taşıyor — manşet dahil, ilk dört yazı.
  const popular = posts.slice(0, 4);

  return (
    <>
      <Header />
      <main className="pt-[52px]">
        {/* Manşet — sayfayı açan koyu pano; kenarlara dayanıyor */}
        <section>
          <Reveal className="relative h-[62svh] md:h-[72svh] overflow-hidden">
            <div className="absolute inset-0">
              <Frame
                seed={`gunluk-${lead.slug}`}
                tone={lead.tone}
                scrim
                className="h-full w-full"
              />
            </div>

            <div className="relative h-full flex flex-col justify-between p-6 md:p-10 text-paper">
              <h1 className="display text-[42px] md:text-[76px] leading-[0.95] max-w-[12ch]">
                Günlük
              </h1>

              <Link href={postHref(lead)} className="group max-w-[52ch]">
                <p className="label !text-paper/70">{lead.kind}</p>
                <p className="display text-[20px] md:text-[26px] mt-3">
                  {lead.title}
                </p>
                <p className="mt-3 text-[13px] leading-[1.6] text-paper/80">
                  {lead.excerpt}
                </p>
                <span className="label !text-paper mt-4 inline-block u-link">
                  Yazının Tamamı
                </span>
              </Link>
            </div>
          </Reveal>
        </section>

        {/* Son Yazılar — dört kart, kapak üstte künye altta */}
        <section className="mt-16 md:mt-24">
          <div className="flex items-baseline justify-between px-4 md:px-5">
            <h2 className="display text-[22px] md:text-[26px]">
              Son Yazılar
              <span className="count">{posts.length}</span>
            </h2>
            <Link href="/iletisim" className="label u-link">
              Bize Yazın
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 px-4 md:px-5 border-t rule pt-8">
            {latest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <Link href={postHref(post)} className="group block">
                  <div className="overflow-hidden aspect-[4/3]">
                    <Frame
                      seed={`gunluk-${post.slug}`}
                      tone={post.tone}
                      className="h-full w-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="label mt-4">{post.kind}</p>
                  <p className="display text-[17px] mt-2 leading-[1.25]">
                    {post.title}
                  </p>
                  <p className="mt-3 text-[13px] leading-[1.65] text-muted line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="label u-link inline-block mt-4">
                    Devamını Oku
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Şu An Popüler — solda numaralı liste, sağda iki geniş kart */}
        <section className="mt-16 md:mt-24 border-t rule pt-8 px-4 md:px-5">
          <h2 className="display text-[22px] md:text-[26px]">Şu An Popüler</h2>

          <div className="mt-8 grid grid-cols-12 gap-x-4 gap-y-10">
            <Reveal className="col-span-12 lg:col-span-4">
              <ol className="flex flex-col">
                {popular.map((post, i) => (
                  <li key={post.slug} className="border-t rule first:border-t-0">
                    <Link
                      href={postHref(post)}
                      className="group flex items-start gap-4 py-4"
                    >
                      <span className="label pt-[3px] w-6 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="w-16 h-16 shrink-0 overflow-hidden">
                        <Frame
                          seed={`gunluk-${post.slug}`}
                          tone={post.tone}
                          className="h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                        />
                      </div>
                      <div>
                        <p className="entry-title">{post.title}</p>
                        <p className="entry-meta">{post.kind}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </Reveal>

            {spotlight.map((post, i) => (
              <Reveal
                key={post.slug}
                delay={0.06 + i * 0.06}
                className="col-span-12 sm:col-span-6 lg:col-span-4"
              >
                <Link href={postHref(post)} className="group block">
                  <div className="overflow-hidden aspect-[3/2]">
                    <Frame
                      seed={`gunluk-${post.slug}`}
                      tone={post.tone}
                      className="h-full w-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="label mt-4">{post.kind}</p>
                  <p className="display text-[18px] mt-2 leading-[1.25]">
                    {post.title}
                  </p>
                  <p className="mt-3 text-[13px] leading-[1.65] text-muted max-w-[46ch]">
                    {post.excerpt}
                  </p>
                  <span className="label u-link inline-block mt-4">
                    Devamını Oku
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-16 md:mt-24 border-t rule px-4 md:px-5 py-10">
          <p className="label mb-3">Arşiv</p>
          <p className="intro">
            Daha eski yazılar ve şantiye günlükleri için doğrudan
            yazabilirsiniz.{" "}
            <Link href="/iletisim" className="u-link">
              İletişim
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
