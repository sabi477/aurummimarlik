/**
 * CSS-generated stand-ins for photography.
 *
 * Every "image" on the site is a layered gradient built from a seed string, so
 * the same project always renders the same frame. The palettes are sampled from
 * the warm interior photography the layout is designed around: oiled wood,
 * lime plaster, lamp-light amber, cool stone.
 */

export type Tone =
  | "wood"
  | "plaster"
  | "amber"
  | "stone"
  | "dusk"
  | "sage"
  | "clay";

type Ramp = {
  /** far field */
  base: string;
  /** near field / floor */
  floor: string;
  /** light pool */
  glow: string;
  /** vertical architectural band (window reveal, column, door jamb) */
  band: string;
};

const RAMPS: Record<Tone, Ramp> = {
  wood: {
    base: "#8f5f38",
    floor: "#4a2b16",
    glow: "#f2d3a4",
    band: "#a86f38",
  },
  plaster: {
    base: "#d6c6ad",
    floor: "#a98f70",
    glow: "#f3e6cd",
    band: "#c2ab8c",
  },
  amber: {
    base: "#5e3312",
    floor: "#2c1708",
    glow: "#f0ad46",
    band: "#8a4d18",
  },
  stone: {
    base: "#c3bdb0",
    floor: "#8e887b",
    glow: "#e9e4d8",
    band: "#aca596",
  },
  dusk: {
    base: "#33200f",
    floor: "#160d05",
    glow: "#c98a3f",
    band: "#4b3018",
  },
  sage: {
    base: "#7c8470",
    floor: "#4a5041",
    glow: "#d8cfa8",
    band: "#8e9682",
  },
  clay: {
    base: "#a85d3e",
    floor: "#6b3521",
    glow: "#efb684",
    band: "#bd7350",
  },
};

/** Cheap deterministic hash so a seed always yields the same composition. */
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function toneFor(seed: string): Tone {
  const tones: Tone[] = [
    "wood",
    "plaster",
    "amber",
    "stone",
    "dusk",
    "sage",
    "clay",
  ];
  return tones[hash(seed) % tones.length];
}

/**
 * Builds the stacked `background-image` for a frame. Layers, front to back:
 * light pool → secondary bounce → vertical band → floor/wall split.
 */
export type FrameStyle = {
  backgroundColor: string;
  backgroundImage: string;
  backgroundSize?: string;
  backgroundPosition?: string;
};

/**
 * Hero'ya ayrılmış kare. Havuzun dışında tutuluyor: aksi hâlde aynı fotoğraf
 * bir alt bölümde tekrar seçilip sayfayı tekrara düşürüyor.
 */
export const HERO_IMAGE = "1600585154526-990dced4db0d"; // koyu ahşap cephe

/**
 * Unsplash foto ID'leri.
 *
 * İki kural var:
 * 1. Her ID tarayıcıda tek tek yüklenerek doğrulandı — geçersiz bir ID sessizce
 *    boş bir renk bloğuna düşer, o yüzden yeni ID eklerken yüklendiğinden emin
 *    olun.
 * 2. Liste bilinçli olarak kısa. Havuza dekore edilmiş emlak fotoğrafı
 *    girdiğinde site bir mimarlık stüdyosu gibi durmuyor; yalnızca mimari
 *    karakteri güçlü kareler tutuluyor.
 */
export const ARCH_IMAGES = [
  // Dış cepheler
  "1600566753190-17f0baa2a6c3", // siyah ahşap ev
  "1600585154340-be6161a56a0c", // alacakaranlıkta ev, ağaç
  "1600596542815-ffad4c1539a9", // beyaz villa, havuz
  "1512917774080-9991f1c4c750", // villa, havuz, palmiye
  "1580587771525-78b9dba3b914", // modern ev, havuz
  "1600047509807-ba8f99d2cdde", // tuğla modern ev
  "1600047509358-9dc75507daeb", // tuğla cephe
  "1567496898669-ee935f5f647a", // sıra evler
  "1416331108676-a22ccb276e35", // avlu ve havuz, akşam
  "1486406146926-c627a92ad1ab", // kule cepheleri, alttan
  // İç mekânlar
  "1497366216548-37526070297c", // beton koridor
  "1502005229762-cf1b2da7c5d6", // merdiven boşluğu
  "1502005097973-6a7082348e28", // koridor, bahçeye açılan
  "1600573472550-8090b5e0745e", // iç mekân, havuz manzarası
  "1503174971373-b1f69850bded", // aydınlık salon
  "1524758631624-e2822e304c36", // yüksek tavanlı oturma
  "1600585152220-90363fe7e115", // ada tezgâh, loş
  // Havuz, proje sayısını (28) geçecek kadar geniş tutuluyor; aksi hâlde aynı
  // kare ızgarada iki kez çıkıyor.
  "1487958449943-2429e8be8625", // açılı müze cephesi
  "1494526585095-c41746248156", // alacakaranlıkta ev, sıcak ışık
  "1439337153520-7082a56a81f4", // rotunda, iç
  "1497604401993-f2e922e5cb0a", // desenli beyaz cephe detayı
  "1523217582562-09d0def993a6", // beyaz modernist ev
  "1600607688969-a5bfcd646154", // ağaçlı bahçe, modern ev
  "1600566752355-35792bedcfea", // minimal ıslak hacim
  "1600585153490-76fb20a32601", // siyah cephe, aydınlık yarıklar
  "1600563438938-a9a27216b4f5", // beyaz modern ev
  "1600566753151-384129cf4e3e", // iç mekân, havuza bakan
  "1600607688066-890987f18a86", // ahşap ve taş banyo
  "1600607687939-ce8a6c25118c", // minimal beyaz oturma
  "1600047509782-20d39509f26d", // beyaz ev, dış
];

/** Hero gibi kritik yerlerde kare elle sabitlenebilsin diye `image` geçilir. */
export function frameStyle(
  seed: string,
  tone: Tone = toneFor(seed),
  image?: string,
): FrameStyle {
  const h = hash(seed);
  const ramp = RAMPS[tone];
  const imgId = image ?? ARCH_IMAGES[h % ARCH_IMAGES.length];

  return {
    backgroundColor: ramp.base,
    backgroundImage: `url(https://images.unsplash.com/photo-${imgId}?w=1200&q=80)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}

/** Flat swatch used for material samples and thumbnails. */
export function swatchStyle(
  seed: string,
  tone: Tone = toneFor(seed),
  image?: string,
): FrameStyle {
  const h = hash(seed);
  const ramp = RAMPS[tone];
  const imgId = image ?? ARCH_IMAGES[h % ARCH_IMAGES.length];
  
  return {
    backgroundColor: ramp.base,
    backgroundImage: `url(https://images.unsplash.com/photo-${imgId}?w=400&q=80)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}

