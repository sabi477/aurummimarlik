"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/shortlist";
import { categories, getProject } from "@/lib/data";

/* Formlar bir uç noktaya bağlı değil; gönderim yalnızca arayüzde onaylanır. */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-4 border-t rule py-[10px]">
      <span className="w-[110px] shrink-0 opacity-50">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "flex-1 bg-transparent outline-none placeholder:opacity-30 text-right md:text-left";

export function BriefForm() {
  const { items, remove } = useCart();
  const [sent, setSent] = useState(false);
  const shortlist = items.map(getProject).filter((p) => p !== undefined);

  if (sent) {
    return (
      <div className="border rule p-6 text-[12px]">
        <p className="text-[15px] tracking-tight">Teşekkürler — brief alındı.</p>
        <p className="mt-2 opacity-70 max-w-[52ch]">
          İki iş günü içinde dönüş yapıyoruz. Acil bir konuysa doğrudan
          arayabilirsiniz.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="u-link mt-4"
        >
          Yeni bir brief yaz
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="text-[12px]"
    >
      <Field label="Ad Soyad">
        <input required name="ad" className={inputCls} placeholder="Adınız" />
      </Field>
      <Field label="E-posta">
        <input
          required
          type="email"
          name="eposta"
          className={inputCls}
          placeholder="ornek@eposta.com"
        />
      </Field>
      <Field label="Telefon">
        <input name="telefon" className={inputCls} placeholder="İsteğe bağlı" />
      </Field>
      <Field label="Proje Türü">
        <select name="tur" className="spec-select flex-1 text-right">
          {categories.map((c) => (
            <option key={c.slug}>{c.name}</option>
          ))}
          <option>Henüz belirsiz</option>
        </select>
      </Field>
      <Field label="Yer">
        <input name="yer" className={inputCls} placeholder="İl / ilçe" />
      </Field>
      <Field label="Yaklaşık Alan">
        <input name="alan" className={inputCls} placeholder="m²" />
      </Field>
      <Field label="Başlangıç">
        <select name="baslangic" className="spec-select flex-1 text-right">
          <option>3 ay içinde</option>
          <option>6 ay içinde</option>
          <option>Bu yıl içinde</option>
          <option>Araştırma aşamasında</option>
        </select>
      </Field>

      <div className="border-t border-b rule py-[10px] flex flex-col gap-2">
        <span className="opacity-50">Proje Hakkında</span>
        <textarea
          name="mesaj"
          rows={5}
          className="bg-transparent outline-none resize-none placeholder:opacity-30"
          placeholder="Arazi, program ve sizin için önemli olan üç şey."
        />
      </div>

      {/* Kısa listeden gelen referanslar */}
      {shortlist.length > 0 && (
        <div className="border-b rule py-3">
          <p className="opacity-50 mb-2">
            Listenizden referanslar<span className="count">{shortlist.length}</span>
          </p>
          <ul className="flex flex-wrap gap-2">
            {shortlist.map((p) => (
              <li
                key={p.slug}
                className="flex items-center gap-2 border rule px-2 py-1"
              >
                {p.title}
                <button
                  type="button"
                  onClick={() => remove(p.slug)}
                  aria-label={`${p.title} çıkar`}
                  className="opacity-50"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center justify-between mt-5">
        <p className="opacity-50 max-w-[38ch]">
          Gönderdiğiniz bilgiler yalnızca talebinizi yanıtlamak için kullanılır.
        </p>
        <button
          type="submit"
          className="border rule px-6 py-[10px] hover:bg-ink hover:text-paper transition-colors duration-500"
        >
          Brief Gönder →
        </button>
      </div>
    </form>
  );
}

export function TradeForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border rule p-6 text-[12px]">
        <p className="text-[15px] tracking-tight">Başvurunuz alındı.</p>
        <p className="mt-2 opacity-70 max-w-[52ch]">
          Hesabınız onaylandığında künye dosyalarına, CAD/BIM kütüphanesine ve
          malzeme örneklerine erişim bağlantısını e-posta ile gönderiyoruz.
        </p>
        <Link href="/projeler" className="u-link mt-4 inline-block">
          Projelere dön →
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="text-[12px]"
    >
      <Field label="Firma">
        <input required name="firma" className={inputCls} placeholder="Ofis / firma adı" />
      </Field>
      <Field label="Yetkili">
        <input required name="yetkili" className={inputCls} placeholder="Ad Soyad" />
      </Field>
      <Field label="E-posta">
        <input required type="email" name="eposta" className={inputCls} placeholder="ornek@eposta.com" />
      </Field>
      <Field label="Meslek">
        <select name="meslek" className="spec-select flex-1 text-right">
          <option>Mimar</option>
          <option>İç Mimar</option>
          <option>Müteahhit</option>
          <option>Yatırımcı / Geliştirici</option>
          <option>Peyzaj Mimarı</option>
          <option>Diğer</option>
        </select>
      </Field>
      <Field label="Web sitesi">
        <input name="web" className={inputCls} placeholder="İsteğe bağlı" />
      </Field>

      <div className="border-t border-b rule py-[10px] flex flex-col gap-2">
        <span className="opacity-50">Nasıl çalışmak istersiniz?</span>
        <textarea
          name="mesaj"
          rows={4}
          className="bg-transparent outline-none resize-none placeholder:opacity-30"
          placeholder="Birlikte yürütmeyi düşündüğünüz iş ya da ihtiyaç duyduğunuz dosyalar."
        />
      </div>

      <button
        type="submit"
        className="mt-5 border rule px-6 py-[10px] hover:bg-ink hover:text-paper transition-colors duration-500"
      >
        Başvuru Gönder →
      </button>
    </form>
  );
}
