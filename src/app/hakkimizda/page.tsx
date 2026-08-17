import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Frame from "@/components/Frame";
import StudioBand from "@/components/StudioBand";
import { studio } from "@/lib/data";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Aurum Design Studio; mimarlık, iç mimarlık ve mimari görselleştirme alanlarında hizmet veren, Alaşehir merkezli butik bir tasarım stüdyosudur.",
};

const process = [
  {
    no: "01",
    title: "Tanışma ve Brief",
    text: "İlk görüşme mekânda ya da arazide yapılır. Kullanıcının yaşam biçimi, ihtiyaç programı ve bütçe aralığı bu aşamada birlikte yazılır.",
  },
  {
    no: "02",
    title: "Konsept Tasarım",
    text: "Mekânın karakterine göre kurulan ilk kurgu: ölçek, oran, ışık ve malzeme ilişkisi. Hazır bir dil uygulanmaz, her proje kendi diliyle başlar.",
  },
  {
    no: "03",
    title: "3D Görselleştirme",
    text: "Tasarım, uygulamaya girmeden gerçeğe en yakın biçimde görünür kılınır. Kararlar render üzerinden verildiği için şantiyede sürpriz kalmaz.",
  },
  {
    no: "04",
    title: "Uygulama Projesi",
    text: "Detay çizimleri, malzeme ve donatı listeleri, imalatçı seçimi. Ruhsat gerektiren işlerde süreç stüdyodan yürütülür.",
  },
  {
    no: "05",
    title: "Şantiye ve Teslim",
    text: "Düzenli şantiye ziyareti ve mimari kontrollük. Teslimde her mekân için bakım ve yaşlandırma notları bırakılır.",
  },
];

export default function StudioPage() {
  return (
    <>
      <Header />
      <main className="pt-[52px]">
        {/* Açılış */}
        <section className="relative h-[64svh]">
          <Frame seed="studyo-hero" tone="wood" scrim className="h-full w-full" />
          <div className="absolute left-4 md:left-5 bottom-8 text-white">
            <h1 className="display text-[38px] md:text-[56px]">
              Hakkımızda
            </h1>
            <p className="label !text-white/80 mt-3 max-w-[38ch]">
              {studio.city} merkezli; {studio.region}. Randevuyla ziyarete açıktır.
            </p>
          </div>
        </section>

        {/* Hakkımızda metni — marka dosyasındaki tam anlatım */}
        <section className="border-b rule py-10">
          <div className="grid grid-cols-12 gap-6 px-4 md:px-5">
            <p className="col-span-12 md:col-span-3 label pt-1">Stüdyo</p>
            <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
              <p className="editorial-lg max-w-[46ch]">{studio.promise}</p>
              {studio.about.map((para, i) => (
                <p key={i} className="editorial opacity-85 max-w-[62ch]">
                  {para}
                </p>
              ))}
              <p className="editorial opacity-85 max-w-[62ch]">{studio.scope}</p>
            </div>

            {/* Marka özü — "şunu değil, bunu" */}
            <div className="col-span-12 md:col-span-3">
              <p className="label mb-3">Bizim için altın</p>
              <dl className="text-[12px]">
                {studio.values.map((v) => (
                  <div key={v.but} className="border-t rule py-3">
                    <dt className="opacity-45 line-through">{v.not}</dt>
                    <dd className="mt-1">{v.but}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Ziyaret bilgileri */}
        <section className="grid grid-cols-12 gap-6 px-4 md:px-5 py-10 border-b rule text-[12px]">
          <div className="col-span-12 md:col-span-3 label">Ziyaret</div>
          <div className="col-span-6 md:col-span-3">
            <p className="label mb-2">Adres</p>
            {studio.address.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="label mb-2">Saatler</p>
            {studio.hours.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
          <div className="col-span-12 md:col-span-3">
            <p className="label mb-2">Randevu</p>
            <Link href="/iletisim" className="u-link block">
              Ziyaret Talep Et →
            </Link>
            <a href={`mailto:${studio.email}`} className="u-link block mt-1">
              {studio.email}
            </a>
            <a
              href={`tel:${studio.phone.replace(/[^\d+]/g, "")}`}
              className="u-link block mt-1"
            >
              {studio.phone}
            </a>
          </div>
        </section>

        {/* Mekân */}
        <section className="grid grid-cols-12 gap-[2px] px-4 md:px-5 py-8">
          <Frame seed="studyo-1" tone="wood" className="col-span-12 md:col-span-8 aspect-[16/10]" />
          <Frame seed="studyo-2" tone="amber" className="col-span-6 md:col-span-4 aspect-square md:aspect-auto" />
          <Frame seed="studyo-3" tone="plaster" className="col-span-6 md:col-span-4 aspect-[4/5]" />
          <Frame seed="studyo-4" tone="stone" className="col-span-6 md:col-span-4 aspect-[4/5]" />
          <Frame seed="studyo-5" tone="dusk" className="col-span-12 md:col-span-4 aspect-[4/5]" />
        </section>

        {/* Çalışma biçimi */}
        <section className="border-t rule py-6">
          <div className="grid grid-cols-12 gap-6 px-4 md:px-5 text-[12px]">
            <div className="col-span-12 md:col-span-3 label">Çalışma Biçimi</div>
            <div className="col-span-12 md:col-span-6">
              <p className="editorial max-w-[58ch]">
                Beş aşamalı, her aşamanın çıktısı belli bir süreç izliyoruz. Stüdyo
                butik ölçekte kalıyor; bir projeyi başından sonuna aynı iki kurucu
                ortak takip ediyor.
              </p>
            </div>
          </div>

          <ol className="mt-8 px-4 md:px-5">
            {process.map((s) => (
              <li
                key={s.no}
                className="grid grid-cols-12 gap-6 border-t rule py-5 text-[12px]"
              >
                <span className="col-span-2 md:col-span-1 label pt-[3px]">{s.no}</span>
                <span className="col-span-10 md:col-span-3 display text-[16px]">
                  {s.title}
                </span>
                <p className="col-span-12 md:col-span-6 editorial opacity-85 max-w-[62ch]">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Ekip */}
        <section className="border-t rule py-6">
          <div className="grid grid-cols-12 gap-6 px-4 md:px-5 text-[12px]">
            <div className="col-span-12 md:col-span-3 label">
              Kurucular<span className="count">{studio.team.length}</span>
            </div>
            <p className="col-span-12 md:col-span-6 editorial max-w-[58ch]">
              Marka adındaki “Au”, kurucularımızın baş harflerinden oluşur; altının
              Latince karşılığı “Aurum” ile aynı kökten gelir.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-5">
            {studio.team.map((m) => (
              <div key={m.name} className="text-[12px]">
                <Frame seed={`ekip-${m.name}`} className="aspect-[4/5]" />
                <p className="entry-title mt-2">{m.name}</p>
                <p className="entry-meta">{m.role}</p>
              </div>
            ))}
          </div>
        </section>

        <StudioBand withLink={false} />
      </main>
      <Footer />
    </>
  );
}
