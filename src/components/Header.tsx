"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import {
  categories,
  collections,
  countByCategory,
  countByCollection,
  projects,
  studio,
} from "@/lib/data";
import { useCart } from "@/lib/shortlist";
import Frame from "./Frame";
import SearchOverlay from "./SearchOverlay";
import ShortlistDrawer from "./ShortlistDrawer";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  /**
   * `overlay` sits transparently on top of a full-bleed hero, `dark` stays
   * light-on-black for the editorial collection pages.
   */
  variant?: "overlay" | "solid" | "dark";
};

export default function Header({ variant = "solid" }: Props) {
  const pathname = usePathname();
  const { count, setOpen: setCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<null | "projeler" | "koleksiyonlar">(null);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Rota değişince açık olan her geçici yüzey kapanır. Bu, bir efekt değil,
  // render sırasında yapılan bir state düzeltmesi — React'in önerdiği biçim.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenu(null);
    setMobile(false);
    setSearch(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Light text while floating over the hero image, or throughout on dark pages.
  const dark = variant === "dark";
  const light = dark || (variant === "overlay" && !scrolled && !menu);
  const filled = (variant !== "overlay" || scrolled || !!menu) && !mobile;

  const link = "u-link transition-opacity duration-300 hover:opacity-100";

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          light ? "text-white" : "text-ink",
          filled
            ? dark
              ? "bg-void border-b rule-invert"
              : "bg-paper border-b rule"
            : "bg-transparent border-b border-transparent",
        )}
        onMouseLeave={() => setMenu(null)}
      >
        <div className="grid grid-cols-12 items-center gap-2 px-4 md:px-5 h-[52px] text-[12px]">
          {/* Marka */}
          <div className="col-span-8 md:col-span-3">
            <Link href="/" className="font-medium tracking-tight u-link">
              {studio.name}
            </Link>
          </div>

          {/* Birincil gezinti */}
          <nav className="hidden md:flex md:col-span-4 items-center gap-7">
            <button
              type="button"
              onMouseEnter={() => setMenu("projeler")}
              onFocus={() => setMenu("projeler")}
              className={link}
              data-active={pathname.startsWith("/projeler") || undefined}
            >
              Projeler
            </button>
            <button
              type="button"
              onMouseEnter={() => setMenu("koleksiyonlar")}
              onFocus={() => setMenu("koleksiyonlar")}
              className={link}
              data-active={pathname.startsWith("/koleksiyonlar") || undefined}
            >
              Koleksiyonlar
            </button>
            <Link
              href="/hakkimizda"
              onMouseEnter={() => setMenu(null)}
              className={link}
              data-active={pathname.startsWith("/hakkimizda") || undefined}
            >
              Hakkımızda
            </Link>
          </nav>

          {/* İkincil gezinti */}
          <nav className="hidden md:flex md:col-span-3 items-center gap-6 opacity-80">
            <Link
              href="/blog"
              onMouseEnter={() => setMenu(null)}
              className={link}
              data-active={pathname.startsWith("/blog") || undefined}
            >
              Blog
            </Link>
            <Link
              href="/bilgi"
              onMouseEnter={() => setMenu(null)}
              className={link}
              data-active={pathname.startsWith("/bilgi") || undefined}
            >
              Bilgi
            </Link>
            <button type="button" onClick={() => setSearch(true)} className={link}>
              Ara
            </button>
          </nav>

          {/* Hesap + liste */}
          <div className="col-span-4 md:col-span-2 flex items-center justify-end gap-5">
            <Link href="/iletisim" className={clsx(link, "hidden md:inline-block")}>
              İletişim
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className={clsx(link, "hidden md:inline-block")}
            >
              Liste ({count})
            </button>
            <button
              type="button"
              className="md:hidden"
              aria-label="Menü"
              aria-expanded={mobile}
              onClick={() => setMobile((v) => !v)}
            >
              {mobile ? "Kapat" : `Menü (${count})`}
            </button>
          </div>
        </div>

        {/* ── Mega menü ───────────────────────────────────────────── */}
        <AnimatePresence>
          {menu && (
            <motion.div
              key={menu}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className={clsx(
                "hidden md:block overflow-hidden border-t",
                dark ? "bg-void rule-invert" : "bg-paper rule",
              )}
            >
              {menu === "projeler" ? <ProjectsMenu /> : <CollectionsMenu />}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobil menü ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-40 bg-paper pt-[52px] md:hidden overflow-y-auto"
          >
            <div className="px-4 py-8 text-ink">
              <MobileGroup title="Projeler" href="/projeler">
                {categories.map((c) => (
                  <MobileLink key={c.slug} href={`/projeler?kategori=${c.slug}`}>
                    {c.name}
                    <span className="count">{countByCategory(c.slug)}</span>
                  </MobileLink>
                ))}
              </MobileGroup>

              <MobileGroup title="Koleksiyonlar" href="/koleksiyonlar">
                {collections.map((c) => (
                  <MobileLink key={c.slug} href={`/koleksiyonlar/${c.slug}`}>
                    {c.name}
                    <span className="count">{countByCollection(c.slug)}</span>
                  </MobileLink>
                ))}
              </MobileGroup>

              <div className="mt-10 flex flex-col gap-3 text-[15px] border-t rule pt-8">
                <Link href="/hakkimizda">Hakkımızda</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/bilgi">Bilgi</Link>
                <Link href="/malzeme">Malzeme Paleti</Link>
                <Link href="/is-ortakligi">İş Ortaklığı</Link>
                <Link href="/iletisim">İletişim</Link>
                <button
                  type="button"
                  className="text-left"
                  onClick={() => {
                    setMobile(false);
                    setCartOpen(true);
                  }}
                >
                  Liste ({count})
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={search} onClose={() => setSearch(false)} />
      <ShortlistDrawer />
    </>
  );
}

/* ── Mega menü içerikleri ─────────────────────────────────────────── */

function ProjectsMenu() {
  const featured = projects.filter((p) => p.isNew).slice(0, 3);

  return (
    <div className="grid grid-cols-12 gap-6 px-4 md:px-5 py-8 text-[12px]">
      <div className="col-span-3">
        <p className="opacity-50 mb-4">Kataloğumuz</p>
        <ul className="flex flex-col gap-[6px]">
          <li>
            <Link href="/projeler" className="u-link">
              Tüm Projeler
              <span className="count">{projects.length}</span>
            </Link>
          </li>
          <li>
            <Link href="/projeler?filtre=yeni" className="u-link">
              Yeni Tamamlanan
            </Link>
          </li>
          <li>
            <Link href="/projeler?filtre=devam" className="u-link">
              Devam Eden
            </Link>
          </li>
          <li>
            <Link href="/malzeme" className="u-link">
              Malzeme Paleti
            </Link>
          </li>
        </ul>
      </div>

      <div className="col-span-3">
        <p className="opacity-50 mb-4">Kategoriler</p>
        <ul className="flex flex-col gap-[6px]">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/projeler?kategori=${c.slug}`} className="u-link">
                {c.name}
                <span className="count">{countByCategory(c.slug)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-6 grid grid-cols-3 gap-4">
        {featured.map((p) => (
          <Link key={p.slug} href={`/projeler/${p.slug}`} className="group">
            <Frame
              seed={p.slug}
              tone={p.tone}
              className="aspect-[4/5] transition-transform duration-1000 group-hover:scale-[1.02]"
            />
            <p className="mt-2">{p.title}</p>
            <p className="opacity-50">
              {p.area} m² · {p.year}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function CollectionsMenu() {
  return (
    <div className="px-4 md:px-5 py-8 text-[12px]">
      <div className="flex items-baseline justify-between mb-5">
        <p className="opacity-50">Koleksiyonlar</p>
        <Link href="/koleksiyonlar" className="u-link">
          Tümünü Gör →
        </Link>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {collections.map((c) => (
          <Link key={c.slug} href={`/koleksiyonlar/${c.slug}`} className="group">
            <Frame
              seed={`kol-${c.slug}`}
              tone={c.tone}
              className="aspect-[3/4] transition-transform duration-1000 group-hover:scale-[1.02]"
            />
            <p className="mt-2">
              {c.name}
              <span className="count">{countByCollection(c.slug)}</span>
            </p>
            <p className="opacity-50">{c.year}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── Mobil yardımcıları ───────────────────────────────────────────── */

function MobileGroup({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <Link href={href} className="block text-[20px] mb-3">
        {title}
      </Link>
      <ul className="flex flex-col gap-2 opacity-70">{children}</ul>
    </div>
  );
}

function MobileLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href}>{children}</Link>
    </li>
  );
}
