import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Frame from "@/components/Frame";
import Reveal from "@/components/Reveal";
import { postBySlug, postHref, posts } from "@/lib/data";

type Params = { slug: string };

/** Altı yazı da build sırasında üretiliyor. */
export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return { title: "Yazı bulunamadı" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const index = posts.findIndex((p) => p.slug === post.slug);
  const next = posts[(index + 1) % posts.length];
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Header />
      <main className="pt-[52px]">
        {/* Yazı — sayfa ikiye bölünüyor: solda metin akıyor, sağdaki kapak
            ekrana sabitleniyor. Yapışkanlığın sınırı dış kutu olduğu için
            görsel, metin bitene kadar yerinde kalıyor. */}
        <section className="border-t rule">
          <div className="grid grid-cols-12 items-stretch">
            <div className="col-span-12 md:col-span-6 order-2 md:order-1 px-4 md:px-10 py-12 md:py-20">
              <Reveal>
                <p className="label">
                  {post.kind} · {post.date} · {post.minutes} dk okuma
                </p>
                <h1 className="display text-[32px] md:text-[46px] leading-[1.05] mt-5 max-w-[18ch]">
                  {post.title}
                </h1>
                <p className="editorial-lg mt-6 max-w-[46ch]">{post.excerpt}</p>
              </Reveal>

              <Reveal delay={0.08} className="mt-12 border-t rule pt-8">
                <dl className="grid grid-cols-3 gap-x-6 max-w-[46ch]">
                  <Meta label="Konu" value={post.kind} />
                  <Meta label="Tarih" value={post.date} />
                  <Meta label="Okuma" value={`${post.minutes} dakika`} />
                </dl>
              </Reveal>

              <Reveal delay={0.12} className="mt-12">
                <div className="editorial flex flex-col gap-6 max-w-[54ch]">
                  {post.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-3 mt-12">
                  <Link href="/blog" className="label u-link">
                    Tüm Yazılar
                  </Link>
                  <Link href={postHref(next)} className="label u-link">
                    Sonraki Yazı
                  </Link>
                  <Link href="/iletisim" className="label u-link">
                    Brief Gönder
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="col-span-12 md:col-span-6 order-1 md:order-2">
              <Reveal className="relative overflow-hidden h-[52svh] md:h-[100svh] md:sticky md:top-0">
                <Frame
                  seed={`gunluk-${post.slug}`}
                  tone={post.tone}
                  className="h-full w-full"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Devamı — diğer üç yazı */}
        <section className="px-4 md:px-5 mt-16 md:mt-24 border-t rule pt-8">
          <h2 className="display text-[22px] md:text-[26px]">Devamı</h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-10">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 0.06}>
                <Link href={postHref(other)} className="group block">
                  <div className="overflow-hidden aspect-[4/3]">
                    <Frame
                      seed={`gunluk-${other.slug}`}
                      tone={other.tone}
                      className="h-full w-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="label mt-4">{other.kind}</p>
                  <p className="display text-[17px] mt-2 leading-[1.25]">
                    {other.title}
                  </p>
                  <span className="label u-link inline-block mt-3">
                    Devamını Oku
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/** Metin sütunundaki künye kutusu: etiket üstte, değer altta. */
function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label">{label}</dt>
      <dd className="editorial mt-1">{value}</dd>
    </div>
  );
}
