import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Frame from "@/components/Frame";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-[52px]">
        <div className="relative h-[62svh]">
          <Frame seed="404" tone="dusk" scrim className="h-full w-full" />
          <div className="absolute left-4 md:left-5 bottom-8 text-white">
            <p className="label !text-white/80">404</p>
            <h1 className="display text-[32px] md:text-[48px] mt-2">
              Bu sayfa bulunamadı
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 px-4 md:px-5 py-10 text-[12px]">
          <div className="col-span-12 md:col-span-3 label">Nereye?</div>
          <ul className="col-span-12 md:col-span-6 flex flex-col gap-2">
            <li>
              <Link href="/projeler" className="u-link">
                Tüm Projeler →
              </Link>
            </li>
            <li>
              <Link href="/koleksiyonlar" className="u-link">
                Koleksiyonlar →
              </Link>
            </li>
            <li>
              <Link href="/hakkimizda" className="u-link">
                Hakkımızda →
              </Link>
            </li>
            <li>
              <Link href="/iletisim" className="u-link">
                İletişim →
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
