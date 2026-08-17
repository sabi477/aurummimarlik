import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Frame from "@/components/Frame";
import { TradeForm } from "@/components/Forms";

export const metadata: Metadata = {
  title: "İş Ortaklığı",
  description:
    "Mimar, iç mimar, müteahhit ve geliştiriciler için künye dosyaları, detay kütüphanesi ve iş birliği koşulları.",
};

const benefits = [
  {
    no: "01",
    title: "Künye ve Çizim Dosyaları",
    text: "Tamamlanmış işlerin künye sayfaları, sistem detayları ve DWG / IFC dosyaları onaylı hesaplara açılır.",
  },
  {
    no: "02",
    title: "Detay Kütüphanesi",
    text: "Uygulamada test edilmiş cephe, saçak ve birleşim detayları; malzeme ve montaj notlarıyla birlikte.",
  },
  {
    no: "03",
    title: "Malzeme Örnekleri",
    text: "Kullandığımız yüzeylerin fiziksel örnek setini ofisinize gönderiyoruz; yılda iki kez güncelleniyor.",
  },
  {
    no: "04",
    title: "Ortak Yürütme",
    text: "Kendi projeniz için yalnızca 3D görselleştirme, detay geliştirme ya da şantiye kontrollüğü hizmeti alabilirsiniz.",
  },
];

export default function TradePage() {
  return (
    <>
      <Header />
      <main className="pt-[52px]">
        <div className="grid grid-cols-12 gap-6 px-4 md:px-5 py-6 border-b rule text-[12px]">
          <h1 className="col-span-12 md:col-span-3 display text-[17px]">
            İş Ortaklığı
          </h1>
          <p className="col-span-12 md:col-span-6 editorial max-w-[58ch]">
            Meslektaşlarımızla açık çalışmayı tercih ediyoruz. Onaylı hesaplar,
            projelerimizin künye dosyalarına ve test ettiğimiz detay kütüphanesine
            erişir; dilerseniz kendi işleriniz için birlikte çalışırız.
          </p>
        </div>

        <Frame seed="ortaklik-hero" tone="stone" className="aspect-[21/9]" />

        {/* Kapsam */}
        <section className="border-t rule py-6">
          <div className="grid grid-cols-12 gap-6 px-4 md:px-5 text-[12px]">
            <div className="col-span-12 md:col-span-3 label">
              Kapsam<span className="count">{benefits.length}</span>
            </div>
          </div>
          <div className="mt-6 px-4 md:px-5">
            {benefits.map((b) => (
              <div
                key={b.no}
                className="grid grid-cols-12 gap-6 border-t rule py-5 text-[12px]"
              >
                <span className="col-span-2 md:col-span-1 label pt-[3px]">{b.no}</span>
                <p className="col-span-10 md:col-span-3 display text-[16px]">
                  {b.title}
                </p>
                <p className="col-span-12 md:col-span-6 editorial opacity-85 max-w-[62ch]">
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Başvuru */}
        <section className="border-t rule py-10">
          <div className="grid grid-cols-12 gap-6 px-4 md:px-5">
            <div className="col-span-12 md:col-span-3 label">
              Başvuru
            </div>
            <div className="col-span-12 md:col-span-6">
              <TradeForm />
            </div>
            <div className="col-span-12 md:col-span-3 editorial opacity-55">
              <p>Başvurular iki iş günü içinde değerlendirilir.</p>
              <p className="mt-3">
                Onaylı hesaplar için indirme bağlantıları kişiye özeldir ve
                paylaşılamaz.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
