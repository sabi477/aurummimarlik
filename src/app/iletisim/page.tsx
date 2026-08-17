import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Frame from "@/components/Frame";
import { BriefForm } from "@/components/Forms";
import { studio } from "@/lib/data";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Aurum Design Studio'ya proje briefi gönderin ya da Alaşehir'deki stüdyo için randevu alın. Manisa, İzmir ve çevresi.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-[52px]">
        <div className="grid grid-cols-12 gap-6 px-4 md:px-5 py-6 border-b rule text-[12px]">
          <h1 className="col-span-12 md:col-span-3 display text-[17px]">
            İletişim
          </h1>
          <p className="col-span-12 md:col-span-6 editorial max-w-[58ch]">
            Yeni bir iş için ilk adım kısa bir brief. Aşağıdaki formu doldurmanız
            yeterli; mekân, program ve yaşam biçiminiz hakkında bildiklerinizle
            başlayın, gerisini birlikte tamamlarız. Sonrasında izlediğimiz beş
            aşamalı süreci{" "}
            <Link href="/hakkimizda" className="u-link">
              Hakkımızda
            </Link>{" "}
            sayfasında bulabilirsiniz.
          </p>
        </div>

        <section className="grid grid-cols-12 gap-6 px-4 md:px-5 py-10">
          <div className="col-span-12 md:col-span-3 text-[12px] flex flex-col gap-6">
            <div>
              <p className="label mb-2">Stüdyo</p>
              {studio.address.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
            <div>
              <p className="label mb-2">Doğrudan</p>
              <a href={`mailto:${studio.email}`} className="u-link block">
                {studio.email}
              </a>
              <a
                href={`tel:${studio.phone.replace(/[^\d+]/g, "")}`}
                className="u-link block mt-1"
              >
                {studio.phone}
              </a>
            </div>
            <div>
              <p className="label mb-2">Saatler</p>
              {studio.hours.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
            <div>
              <p className="label mb-2">Basın</p>
              <a href={`mailto:${studio.email}`} className="u-link">
                Basın kiti talep edin →
              </a>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6">
            <BriefForm />
          </div>

          <div className="col-span-12 md:col-span-3">
            <p className="label mb-2">Konum</p>
            <Frame seed="iletisim-harita" tone="sage" className="aspect-[3/4]" />
            <p className="mt-2 editorial opacity-55">
              Stüdyo {studio.city} merkezindedir; {studio.region} kapsamındaki
              işlerde arazi ve şantiye ziyaretlerini biz üstleniriz.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
