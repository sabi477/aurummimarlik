import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Frame from "@/components/Frame";
import { studio } from "@/lib/data";

export const metadata: Metadata = {
  title: "Bilgi",
  description:
    "Aurum Design Studio hakkında: mimari tasarım, iç mimari tasarım, 3D görselleştirme ve proje danışmanlığı hizmetleri, sık sorulan sorular ve yasal bilgiler.",
};

const services = [
  {
    title: "Mimari Tasarım",
    text: "Ön tasarım, avan proje, uygulama projesi ve ruhsat dosyası. Konut, villa, ofis, klinik ve ticari mekân ölçeğinde çalışıyoruz.",
  },
  {
    title: "İç Mimari Tasarım",
    text: "Salon, mutfak, yatak odası ve banyo dahil mekân kurgusu; sabit mobilya tasarımı, malzeme ve donatı seçimi, imalatçı takibi.",
  },
  {
    title: "3D Görselleştirme",
    text: "İç ve dış mekân renderları, gün ışığı analizi ve kısa animasyon. Tasarım, uygulama başlamadan gerçeğe en yakın biçimde görünür kılınır.",
  },
  {
    title: "Mimari & Dış Cephe",
    text: "Cephe tasarımı, renovasyon ve yenileme projeleri; mevcut yapının karakterini koruyan müdahale kurgusu.",
  },
  {
    title: "Proje Danışmanlığı",
    text: "Yatırım öncesi arazi ve mekân değerlendirmesi, imar okuması, malzeme ve bütçe kurgusu.",
  },
];

const faq = [
  {
    q: "Bir projeye ne zaman dahil olmalıyız?",
    a: "Mümkünse arazi alınmadan önce. Eğim, imar ve yönelim üzerine yapılacak yarım günlük bir okuma, sonraki iki yılın en pahalı kararlarını belirliyor.",
  },
  {
    q: "Ücretlendirme nasıl işliyor?",
    a: "Konut işlerinde toplam yapım bedeli üzerinden yüzde, küçük ölçekli ve danışmanlık işlerinde ise sabit bedel uyguluyoruz. Aşamalar ve ödeme planı sözleşmede baştan tanımlanır.",
  },
  {
    q: "Hangi bölgelerde çalışıyorsunuz?",
    a: "Stüdyomuz Alaşehir merkezli; Manisa, İzmir ve çevresinde çalışıyoruz. Görselleştirme ve tasarım işlerini bölge dışına da veriyoruz.",
  },
  {
    q: "Yalnızca 3D görselleştirme hizmeti alabilir miyiz?",
    a: "Evet. Kendi projeniz ya da başka bir ofisin projesi için iç ve dış mekân renderları, gün ışığı analizi ve kısa animasyon üretiyoruz.",
  },
  {
    q: "Uygulamayı da üstleniyor musunuz?",
    a: "Hayır, müteahhitlik yapmıyoruz. Bunun yerine yükleniciyi birlikte seçiyor ve şantiyeyi mimari kontrollük hizmetiyle takip ediyoruz.",
  },
  {
    q: "Bir projenin süresi ne kadar?",
    a: "Konut iç mekânında tasarım süreci ortalama 2–3 ay, tek ailelik bir konutta 5–7 ay sürüyor. Uygulama takvimi işin ölçeğine göre değişiyor.",
  },
  {
    q: "Malzeme örneği alabilir miyiz?",
    a: "Evet. Stüdyoda kullandığımız yüzeylerin fiziksel örneklerini randevu sırasında inceleyebilir, kısa listeye aldıklarınızı yanınızda götürebilirsiniz.",
  },
];

/** Künye bloğu: altı çizili rol başlığı + içerik listesi. */
const credits = [
  { role: "Kuruluş", names: studio.team.map((m) => m.name) },
  { role: "Merkez", names: [`${studio.city}, ${studio.province}`] },
  { role: "Çalışma Bölgesi", names: [studio.region] },
];

/** Hizmet başlıkları, künyenin sağ sütununda tek liste hâlinde. */
const disciplines = [
  "Mimari Tasarım",
  "İç Mimari Tasarım",
  "3D Görselleştirme",
  "Mimari & Dış Cephe",
  "Proje Danışmanlığı",
];

export default function InfoPage() {
  return (
    <>
      <Header />
      <main className="pt-[52px]">
        {/* ── Hakkında: sayfa tam ikiye bölünüyor ─────────────────── */}
        <section className="grid md:grid-cols-2 md:min-h-[100svh]">
          <div className="relative flex flex-col justify-center px-4 md:px-6 py-10 md:py-12">
            <span className="label absolute top-6 md:top-8 left-4 md:left-6">
              Bilgi
            </span>

            <p className="editorial-lg italic">{studio.promise}</p>

            <div className="editorial mt-5 flex flex-col gap-4 max-w-[54ch]">
              <p>
                Buradaki altın gösterişi değil değeri, geçici trendleri değil
                zamansızlığı, süslemeyi değil nitelikli detayı temsil eder.
                Stüdyonun tamamı bu ölçüye göre çalışır —{" "}
                <Link href="/hakkimizda">hakkımızda</Link> sayfasında uzun
                anlatımını bulabilirsiniz.
              </p>
              <p>{studio.about[0]}</p>
              <p>{studio.scope}</p>
              <p>
                Genel sorular ve başvurular için{" "}
                <a href={`mailto:${studio.email}`}>{studio.email}</a> adresine
                yazabilirsiniz.
              </p>
              <p className="opacity-40">—</p>
            </div>

            {/* Künye */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-2 editorial max-w-[54ch]">
              <div className="flex flex-col gap-5">
                {credits.map((c) => (
                  <div key={c.role}>
                    <p className="label underline underline-offset-[3px]">
                      {c.role}
                    </p>
                    {c.names.map((n) => (
                      <p key={n}>{n}</p>
                    ))}
                  </div>
                ))}
              </div>
              <div>
                <p className="label underline underline-offset-[3px]">
                  Çalışma Alanları
                </p>
                {disciplines.map((n) => (
                  <p key={n}>{n}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Metin uzadıkça görsel yerinde kalır, dört kenardan boşluklu */}
          <div className="px-4 md:px-6 py-8 md:py-0">
            <div className="md:sticky md:top-[52px] md:h-[calc(100svh-52px)] flex items-center">
              <Frame
                seed="bilgi-portre"
                tone="plaster"
                className="w-full aspect-[4/3] md:aspect-auto md:h-[78%]"
              />
            </div>
          </div>
        </section>

        {/* Hizmetler */}
        <section className="border-t rule py-6">
          <div className="grid grid-cols-12 gap-6 px-4 md:px-5">
            <div className="col-span-12 md:col-span-3 label">
              Hizmetler<span className="count">{services.length}</span>
            </div>
          </div>
          <div className="mt-6 px-4 md:px-5">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="grid grid-cols-12 gap-6 border-t rule py-5"
              >
                <span className="col-span-2 md:col-span-1 label pt-[3px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="col-span-10 md:col-span-3 display text-[16px]">
                  {s.title}
                </p>
                <p className="col-span-12 md:col-span-6 editorial opacity-85 max-w-[62ch]">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SSS */}
        <section className="border-t rule py-6">
          <div className="grid grid-cols-12 gap-6 px-4 md:px-5">
            <div className="col-span-12 md:col-span-3 label">
              Sık Sorulanlar<span className="count">{faq.length}</span>
            </div>
          </div>
          <div className="mt-6 px-4 md:px-5">
            {faq.map((f) => (
              <details key={f.q} className="group border-t rule py-4">
                <summary className="cursor-pointer list-none flex items-start gap-3 display text-[16px]">
                  <span className="opacity-40 group-open:rotate-45 transition-transform duration-500 mt-[2px] text-[12px]">
                    +
                  </span>
                  {f.q}
                </summary>
                <p className="mt-3 pl-6 editorial opacity-85 max-w-[62ch]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
