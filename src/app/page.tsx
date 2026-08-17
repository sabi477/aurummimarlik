import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import BlogCurtainGrid from "@/components/BlogCurtainGrid";
import CatalogSection from "@/components/CatalogSection";
import InstagramEmbed from "@/components/InstagramEmbed";
import ReelsStrip from "@/components/ReelsStrip";
import { SectionHead } from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import { aboutPost, posts, projects, studio } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Header variant="overlay" />
      <main>
        <Hero />

        {/* Hakkımızda — siteye giren kişinin ilk okuduğu yer: ne yaptığımız,
            nerede olduğumuz ve hangi ölçekte çalıştığımız. */}
        <section className="border-t rule">
          {/* Bölüm ikiye bölünüyor: solda görsel, sağda metin.
              Görsel masaüstünde ekrana yapışıp sabit kalıyor; metin onun
              yanında akıyor. Metin bitince bölüm de bitiyor ve bir sonraki
              bölüm (Kategoriler) görselin üzerine gelip onu iterek giriyor. */}
          <div className="grid grid-cols-12 items-stretch">
            {/* Yapışkan sütun: dış kutu satırın tüm yüksekliğini kaplıyor
                (sticky'nin sınırı bu), içindeki görsel ekrana sabitleniyor. */}
            <div className="col-span-12 md:col-span-6">
              <Reveal className="relative overflow-hidden @container h-[60svh] md:h-[100svh] md:sticky md:top-0">
                {/* Gömü kendi oranını koruyup sütunu dolduruyor; taşan kenar
                    ortadan kırpılıyor (cover). */}
                <InstagramEmbed
                  kind="p"
                  code={aboutPost.code}
                  title="Aurum Design Studio — Instagram gönderisi"
                  ratio={aboutPost.ratio}
                  cover
                />
              </Reveal>
            </div>

            {/* Sağ sütun dört konuya ayrılıyor; aralarındaki büyük boşluk
                kaydırmaya ritim veriyor — her blok kendi başına okunuyor. */}
            <div className="col-span-12 md:col-span-6 px-4 md:px-10 py-16 md:py-[22svh] flex flex-col gap-[16svh] md:gap-[26svh]">
              <Block index="01" label="Hakkımızda">
                <p className="editorial-lg max-w-[46ch]">{studio.lede}</p>
                <p className="editorial mt-8 max-w-[54ch]">{studio.intro}</p>
                <p className="editorial mt-5 max-w-[54ch]">{studio.scope}</p>
              </Block>

              {/* Stüdyonun kendi anlatısı — eskiden ayrı bir bantta duruyordu;
                  sabit görselin yanında akan metnin gövdesi artık bu. */}
              <Block index="02" label="Vaadimiz" delay={0.06}>
                <p className="editorial-lg max-w-[46ch]">{studio.promise}</p>
              </Block>

              <Block index="03" label="Stüdyo" delay={0.06}>
                <div className="editorial max-w-[54ch] flex flex-col gap-6">
                  {studio.about.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </Block>

              {/* Künye — okumak istemeyen için aynı bilgi rakamla */}
              <Block index="04" label="Künye" delay={0.06}>
                <dl className="grid grid-cols-2 gap-x-8 gap-y-2 max-w-[54ch]">
                  <Fact label="Merkez" value={`${studio.city}, ${studio.province}`} />
                  <Fact label="Bölge" value={studio.region} />
                  <Fact label="Katalog" value={`${projects.length} proje`} />
                  <Fact label="Stüdyo" value={`${studio.team.length} kurucu ortak`} />
                </dl>

                <div className="flex flex-wrap gap-x-8 gap-y-3 mt-12">
                  <Link href="/hakkimizda" className="label u-link">
                    Hakkımızda
                  </Link>
                  <Link href="/bilgi" className="label u-link">
                    Hizmetler
                  </Link>
                  <Link href="/iletisim" className="label u-link">
                    Brief Gönder
                  </Link>
                </div>
              </Block>
            </div>
          </div>
        </section>

        {/* Kategoriler — tek satır, yana kayan şerit */}
        <CatalogSection />

        <ReelsStrip />

        {/* Blog */}
        <section className="border-t rule py-16 min-h-[100svh] flex flex-col justify-center">
          <SectionHead
            title="Blog"
            description="Malzeme denemeleri ve şantiye notları."
            href="/blog"
            action="Tüm Yazılar"
          />
          <BlogCurtainGrid posts={posts.slice(0, 3)} />
        </section>
      </main>
      <Footer />
    </>
  );
}

/**
 * Sabit görselin yanında akan metnin tek bir konusu: solda sıra numarası,
 * üstte konu başlığı, altında gövde. Bloklar arasındaki boşluğu sütunun
 * kendisi veriyor.
 */
function Block({
  index,
  label,
  delay = 0,
  children,
}: {
  index: string;
  label: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex items-baseline gap-4 border-t rule pt-4">
        <span className="label">{index}</span>
        <span className="label">{label}</span>
      </div>
      <div className="mt-8">{children}</div>
    </Reveal>
  );
}

/** Hakkımızda bandındaki künye satırı: etiket üstte, değer altta. */
function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t rule py-3">
      <dt className="label">{label}</dt>
      <dd className="editorial mt-1">{value}</dd>
    </div>
  );
}
