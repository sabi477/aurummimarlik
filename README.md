# Aurum Design Studio

Mimarlık, iç mimarlık ve mimari görselleştirme stüdyosunun tanıtım sitesi.
Next.js 16 (App Router, Turbopack) ve Tailwind CSS 4 ile kurulu; tüm sayfalar
statik olarak önceden basılıyor.

## Geliştirme

```bash
npm install
npm run dev
```

http://localhost:3000 adresinde açılır.

## Yayın için build

Site adresi, kanonik bağlantılar ile `sitemap.xml` ve `robots.txt` içine
**build sırasında** gömülüyor. Bu yüzden değişken yalnızca çalışma anında
değil, derlemede de tanımlı olmalı:

```bash
NEXT_PUBLIC_SITE_URL=https://alan-adiniz.com npm run build
npm start
```

Vercel gibi bir platformda değişkeni proje ayarlarından tanımlamak yeterli.
Örnek dosya: [`.env.example`](.env.example). Tanımlanmazsa
`http://localhost:3000` varsayılır — yayına çıkarken mutlaka ayarlanmalı.

## Komutlar

| Komut | İş |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Üretim derlemesi (TypeScript denetimi dahil) |
| `npm start` | Derlenmiş siteyi sunar |
| `npm run lint` | ESLint |

## Yapı

- `src/app` — sayfalar. Dinamik olanlar: `projeler/[slug]`,
  `koleksiyonlar/[slug]`, `blog/[slug]`; hepsi `generateStaticParams` ile
  önceden üretiliyor. `sitemap.ts` ve `robots.ts` de burada.
- `src/components` — arayüz parçaları (hero, galeri görüntüleyici, konum
  haritası, Instagram gömüleri, perde açılışlı kartlar…).
- `src/lib` — içerik ve yardımcılar: `data.ts` (projeler, koleksiyonlar,
  yazılar, stüdyo künyesi), `frames.ts` (görsel kompozisyonları), `geo.ts`
  (harita koordinatları), `site.ts` (yayın adresi).
- `public/images` — yerel görseller.

## Notlar

- Konum haritası bir harita kütüphanesi kullanmıyor: koordinat döşemeye
  çevrilip CARTO'nun etiketsiz açık teması gri tonlamayla basılıyor.
  Künye zorunlu — “© OpenStreetMap · CARTO” satırı kaldırılmamalı.
- Blog yazılarının gövdeleri `src/lib/data.ts` içinde örnek metinlerdir;
  yayına çıkmadan önce gerçek içerikle değiştirilmeli.
- `src/lib/data.ts` içindeki `TODO` satırları (kurucu adları, LinkedIn
  hesabı) doğrulanmayı bekliyor.
