# Aurum Design Studio — Tasarım Sistemi

Site iki referans üzerine kurulu:

- **In Common With** — üst menü, katalog/proje detay mantığı, ince çizgi
  ızgarası, üst simge sayaçlar, S/M/L görünüm ve "Işık" anahtarı.
- **Faculty Department** — ekranı tam ikiye bölen paneller, satır içinde
  değişken genişlikli editoryal ızgara ve künye biçimi.

Hero ve üst menü **In Common With** yapısındadır ve korunur.

---

## 1. Tipografi

Tek aile: **Montserrat**. Ölçek `globals.css` içinden kalibre edilir; sayfalarda
punto elle yazılmaz, sınıf kullanılır.

| Rol | Sınıf | Değer |
| --- | --- | --- |
| Gövde | (varsayılan) | 14px / 1.6 |
| Paragraf | `.editorial` | 14px / 1.75 |
| Giriş cümlesi | `.editorial-lg` | 17px, ağırlık 300 |
| Sayfa girişi | `.intro` | 15px, ağırlık 300, `max-w 56ch` |
| Başlık | `.display` | ağırlık 300, `tracking -0.02em` |
| Kart adı | `.entry-title` | 14px |
| Künye / konum | `.entry-meta` | 10px VERSAL, gri |
| Bölüm etiketi | `.label` | 10px VERSAL, `tracking 0.14em`, gri |

Kurallar:

- Bölüm başlıkları (`PROJELER`, `ÖNE ÇIKAN`, `EKİP`) her zaman `.label`.
- Kart künyesi iki satırdır: `.entry-title` ("Ad, Kategori") + `.entry-meta`
  (konum). Bu biçim tüm ızgaralarda aynıdır.
- `.label` kendi grisini taşır; yanına `opacity-*` eklenmez. Koyu zeminde
  `!text-white/75` gibi açık bir renk verilir.

---

## 2. Renk

| Token | Değer | Kullanım |
| --- | --- | --- |
| `--paper` | `#F4F1E9` | Ana zemin |
| `--paper-2` | `#ECE8DD` | Vurgulu blok |
| `--ink` | `#1C1815` | Metin — sıcak, siyaha yakın |
| `--ink-2` | `#8A8378` | Künye, konum, etiket grisi |
| `--void` | `#0E0B08` | Koyu editoryal koleksiyon sayfaları |

Çizgiler `.rule` (koyu zeminde `.rule-invert`): 1px, `ink %22`.

---

## 3. Izgara ve Boşluk

- Sayfa kenarı `px-4 md:px-5`; bölünmüş panellerde `px-4 md:px-6`.
- 12 kolon, `gap-x-3`/`gap-x-4`.
- Navigasyon 52px sabit; içerik sayfaları `pt-[52px]` ile başlar.
- Bölünmüş bölümler `md:grid-cols-2 md:min-h-[86svh]`, taraflar dönüşümlü.

### Editoryal ızgara (`EditorialGrid.tsx`)

Uniform grid **değildir**. Satır yüksekliği sabit, kart genişlikleri satır
içinde değişir. Desenler 12 kolon üzerinden sırayla döner:
`[3,6,3] → [3,3,3,3] → [4,4,4] → [6,3,3] → [3,3,6]`. Dergi hissini veren şey bu
düzensizliktir.

### Split paneli (`Split.tsx`)

```
┌─────────────────────────┬─────────────────────────┐
│ ETİKET (üst sol)        │                         │
│   [inset görsel]        │   tam kanamalı görsel   │
│   ETİKET altyazı        │                         │
│ Başlık        DAHA FAZLA│   Başlık                │
│ ────────────────────────│   VERSAL META           │
│ 01 │ paragraf           │                         │
└─────────────────────────┴─────────────────────────┘
```

İçerik panelde aşağıya yaslanır; üstteki boşluk tasarımın parçasıdır.

---

## 4. Hareket

- Easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- Geçişler 0.5–0.6s; görsel ölçekleme 1.2–1.6s.
- Görsel hover `scale(1.03)`; renk ya da gölge değişimi yok.
- `prefers-reduced-motion` altında tüm giriş animasyonları kapanır.

### Scroll reveal (`Reveal.tsx`)

Bölümler ve kartlar görünüm alanına girerken 20px aşağıdan, 0.9s'de belirir.
Izgaralarda satır içi kartlara `delay={i * 0.07}` ile kademe verilir; bölünmüş
panellerde inset görsel → başlık → fotoğraf altyazısı sırayla gelir.

Sunucu bileşenleri `Reveal`'i sarmalayıcı olarak kullanabilir; istemciye inen
tek parça bu dosyadır.

**Dikkat:** yalnızca `IntersectionObserver` kullanmak yeterli değil. Sayfa
hızlıca ya da sıçrayarak kaydırıldığında (çapa bağlantısı, sayfa ortasında
yenileme) gözlemci hiç tetiklenmeyip içeriği kalıcı olarak görünmez
bırakabiliyor. Bu yüzden `Reveal` içinde kaydırmada konum kontrolü yapan bir ağ
var: ekranın altına girmiş ya da yukarıda kalmış her blok beklemeden açılır.
Yeni bir reveal yazılacaksa bu güvenlik ağı korunmalı.

---

## 5. Görseller

Fotoğraflar `src/lib/frames.ts` içindeki doğrulanmış Unsplash havuzundan gelir;
`<Frame seed="..." image="..." scrim />` ile kullanılır.

Üç kural:

1. **Her ID tarayıcıda yüklenerek doğrulanır.** Geçersiz bir ID sessizce düz
   renk bloğuna düşer — hata vermez, sadece çirkin durur.
2. **Havuz proje sayısından geniş tutulur.** Görseller `data.ts` içinde proje
   sırasına göre dağıtılır (hash ile değil); havuz kısalırsa aynı kare ızgarada
   iki kez çıkar.
3. **Havuza dekore edilmiş emlak fotoğrafı girmez.** Sahnelenmiş salon/mutfak
   kareleri sitenin mimarlık stüdyosu gibi durmasını bozuyor; yalnızca mimari
   karakteri güçlü kareler tutulur.

Hero karesi (`HERO_IMAGE`) havuzun dışındadır, böylece alt bölümlerde tekrar
etmez. Üzerine metin binen her karede `scrim` açılır.

---

## 6. Özel CSS sınıfları

`globals.css` içindeki tüm özel sınıflar `@layer components` içindedir. Bu
zorunludur: aksi hâlde `.u-link { display: inline-block }` gibi kurallar
Tailwind'in `hidden`, `md:inline-block` yardımcılarını ezer ve responsive
davranış bozulur.
