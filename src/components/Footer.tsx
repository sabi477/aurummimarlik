import Link from "next/link";
import { categories, studio } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t rule text-[12px]">
      {/* Adres bandı */}
      <div className="grid grid-cols-12 gap-6 px-4 md:px-5 py-10 border-b rule">
        <div className="col-span-12 md:col-span-3 label">Stüdyo</div>
        <div className="col-span-12 md:col-span-9 md:text-right label leading-[2]">
          {studio.address.map((l) => (
            <p key={l}>{l}</p>
          ))}
          <p className="mt-3">{studio.region}</p>
          <p>{studio.hours.join(" · ")}</p>
        </div>
      </div>

      {/* Bağlantılar */}
      <div className="grid grid-cols-12 gap-6 px-4 md:px-5 py-10">
        <FooterCol title="Projeler">
          <FooterLink href="/projeler">Tüm Projeler</FooterLink>
          <FooterLink href="/projeler?filtre=yeni">Yeni Tamamlanan</FooterLink>
          <FooterLink href="/projeler?filtre=devam">Devam Eden</FooterLink>
          {categories.map((c) => (
            <FooterLink key={c.slug} href={`/projeler?kategori=${c.slug}`}>
              {c.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Stüdyo">
          <FooterLink href="/hakkimizda">Hakkımızda</FooterLink>
          <FooterLink href="/bilgi">Bilgi</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/malzeme">Malzeme Paleti</FooterLink>
          <FooterLink href="/is-ortakligi">İş Ortaklığı</FooterLink>
        </FooterCol>

        <FooterCol title="İletişim">
          <FooterLink href="/iletisim">Brief Gönder</FooterLink>
          <FooterLink href={`mailto:${studio.email}`}>{studio.email}</FooterLink>
          <FooterLink href={`tel:${studio.phone.replace(/[^\d+]/g, "")}`}>
            {studio.phone}
          </FooterLink>
          <FooterLink href={studio.social.instagram}>Instagram</FooterLink>
          <FooterLink href={studio.social.linkedin}>LinkedIn</FooterLink>
        </FooterCol>
      </div>

      {/* Künye */}
      <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between px-4 md:px-5 py-5 border-t rule opacity-50">
        <span>
          © {new Date().getFullYear()} {studio.name}. Tüm hakları saklıdır.
        </span>
        <span>
          {studio.city}, {studio.province}
        </span>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="col-span-6 md:col-span-3">
      <p className="label mb-4">{title}</p>
      <ul className="flex flex-col gap-[6px]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="u-link">
        {children}
      </Link>
    </li>
  );
}
