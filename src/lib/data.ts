import { ARCH_IMAGES, type Tone } from "./frames";

/* ────────────────────────────────────────────────────────────────
   Stüdyo
   ──────────────────────────────────────────────────────────────── */

/**
 * Marka bilgileri "İnternet Sayfası" branding dosyasından alınmıştır.
 *
 * TODO — dosyada yer almayan, doğrulanması gereken yer tutucular:
 *   founded, address, email, phone, hours, team[].name
 */
export const studio = {
  name: "Aurum Design Studio",
  /** Logoda ve dar alanlarda kullanılan kısa biçim. */
  shortName: "Aurum",
  founded: 2018, // TODO: gerçek kuruluş yılı
  city: "Alaşehir",
  province: "Manisa",
  /** Stüdyonun hizmet verdiği coğrafya. */
  region: "Manisa, İzmir ve çevresi",
  address: ["Alaşehir, Manisa", "Türkiye"], // TODO: açık adres
  email: "info@aurumdesignstudio.com", // TODO
  phone: "+90 (000) 000 00 00", // TODO
  hours: ["Pazartesi – Cumartesi", "09.00 – 18.00", "Randevu ile"], // TODO
  tagline: "Sadece etkileyici görünen değil, iyi yaşanan mekânlar.",
  /** Ana sayfa için kısa tanıtım — branding dosyasındaki metin. */
  lede: "Aurum Design Studio; çağdaş çizgiyi doğal malzemeler, sıcak tonlar ve rafine detaylarla buluşturan bir mimarlık ve iç mimarlık stüdyosudur.",
  intro:
    "Her mekânı, kullanıcısına ait ve zaman içinde değerini koruyacak özgün bir bütün olarak tasarlarız.",
  /** Marka özü: altının neyi temsil ettiği — "şunu değil, bunu" karşıtlıkları. */
  values: [
    { not: "Gösterişi", but: "değeri" },
    { not: "Geçici trendleri", but: "zamansızlığı" },
    { not: "Süslemeyi", but: "nitelikli detayı" },
    { not: "Yalnızca güzel görünmeyi", but: "iyi yaşamayı" },
  ],
  /** Markanın temel vaadi. */
  promise:
    "Sadece etkileyici görünen değil, iyi yaşanan ve zaman içinde değerini koruyan mekânlar tasarlamak.",
  about: [
    "Aurum Design Studio, iki tasarımcının ortak vizyonundan doğan; mimarlık, iç mimarlık ve mimari görselleştirme alanlarında hizmet veren butik bir tasarım stüdyosudur.",
    "İsmimiz, kurucularımızın baş harflerinden oluşan “Au” ile altının Latince karşılığı olan “Aurum”un taşıdığı anlamı bir araya getirir. Bizim için altın; gösterişten çok saflığı, kalıcılığı ve gerçek değeri temsil eder.",
    "Her projeye hazır bir tasarım diliyle değil; mekânın karakterini, kullanıcının ihtiyaçlarını ve yaşam biçimini anlayarak yaklaşırız. Ölçek, oran, ışık, malzeme ve detay arasındaki ilişkiyi titizlikle kurgular; doğal dokularla çağdaş çizgiyi buluşturan, sıcak ve zamansız mekânlar tasarlarız.",
    "Tasarladığımız mekânları daha uygulama başlamadan gerçeğe en yakın biçimde görünür kılan güçlü mimari görselleştirmelerle, tasarım ve uygulama arasındaki belirsizlikleri azaltırız. Amacımız yalnızca güzel görünen değil; iyi işleyen, iyi hissettiren ve zaman içinde değerini koruyan yaşam alanları oluşturmaktır.",
  ],
  /** Hizmet ve coğrafya cümlesi — künye bloklarında tek başına kullanılıyor. */
  scope:
    "Alaşehir merkezli stüdyomuzla Manisa, İzmir ve çevresinde; konut, villa, ofis, klinik ve ticari mekân projelerine mimari tasarım, iç mimari tasarım, 3D görselleştirme ve proje danışmanlığı hizmetleri sunuyoruz.",
  team: [
    // TODO: kurucuların gerçek ad-soyadları. Marka adındaki "Au", kurucuların
    // baş harflerinden geliyor.
    { name: "Kurucu Ortak (A.)", role: "Mimarlık, Proje Yürütme" },
    { name: "Kurucu Ortak (U.)", role: "İç Mimarlık, Görselleştirme" },
  ],
  social: {
    instagram: "https://www.instagram.com/aurum_design_studio/",
    // TODO: LinkedIn hesabı doğrulanmadı.
    linkedin: "https://www.linkedin.com/company/aurumdesignstudio/",
  },
};

/* ────────────────────────────────────────────────────────────────
   Reels — ana sayfadaki "Öne Çıkan" bandının altında duran, doğrudan
   sosyal medyaya çıkan üç dikey kare.
   ──────────────────────────────────────────────────────────────── */

export type Reel = {
  /** Instagram gönderi kodu — hem bağlantı hem gömü adresi bundan türetiliyor. */
  code: string;
  title: string;
  /** Kare altındaki versal künye satırı */
  meta: string;
};

/** Başlıklar reel'lerin kendi açıklamalarından alındı. */
export const reels: Reel[] = [
  {
    code: "DWFBCYhDX-z",
    title: "M|B Villa Şantiye Vol 1.1",
    meta: "Instagram · Reels",
  },
  {
    code: "DbqMresNItC",
    title: "En sevdiğimiz şantiye vlogları",
    meta: "Instagram · Reels",
  },
  {
    code: "DPn501hDYKi",
    title: "Hazırsak başlayalım",
    meta: "Instagram · Reels",
  },
];

export const reelUrl = (r: Reel) => `https://www.instagram.com/reel/${r.code}/`;

/**
 * Reels gömüsünün kutu oranı: gömü videoyu 840×1491 boyutunda taşıyor.
 * `InstagramEmbed`in `scale` değeri bu orana göre hesaplandı.
 */
export const REEL_RATIO = "840 / 1491";
export const REEL_SCALE = 1.42;

/** Ana sayfada Hakkımızda metninin yanında duran gönderi. */
export const aboutPost = {
  code: "DPgYf2kCEdF",
  /** Gömüdeki görselin ölçüsü — kutu oranı buradan geliyor. */
  ratio: "840 / 1114",
};

/* ────────────────────────────────────────────────────────────────
   Koleksiyonlar — her biri ortak bir malzeme ve arazi tavrını paylaşan
   proje ailesi.
   ──────────────────────────────────────────────────────────────── */

export type Collection = {
  slug: string;
  name: string;
  year: string;
  tone: Tone;
  tagline: string;
  /** Koleksiyon sayfasındaki koyu editoryal metin */
  essay: string[];
  captions: { seed: string; text: string; tone: Tone }[];
};

export const collections: Collection[] = [
  {
    slug: "kiyi",
    name: "Kıyı",
    year: "2024",
    tone: "stone",
    tagline: "Tuz, kireç ve rüzgârla aşınmış yüzeyler.",
    essay: [
      "Koleksiyonun merkezinde iki deneysel yüzey tekniği var. İlki, ince öğütülmüş kireç tozunun geleneksel serigrafi araçlarıyla sıva katmanlarına uygulanmasına dayanıyor — bir baskı atölyesinde mürekkebin ağır ağır üst üste bindirilmesine benzer, yavaş ve kasıtlı bir süreç. Sonuç, ışığı kâğıdın pigmenti tuttuğu gibi tutan ince, dokulu bir yüzey: yumuşak, boyutlu ve ölçülü bir değişkenlikle işaretlenmiş.",
      "İkincisi ise deniz suyuyla yaşlandırılmış bakır. Kıyı hattındaki yapılarda cephe panelleri, ilk yılın sonunda mavimsi bir patina kazanacak şekilde işleniyor. Yapının zamanla değişmesi bir kusur değil, tasarımın kendisi.",
    ],
    captions: [
      { seed: "kiyi-detay-1", text: "Kireç sıva yüzey detayı", tone: "plaster" },
      { seed: "kiyi-detay-2", text: "Zeytinli Kıyı Evi, batı cephesi", tone: "stone" },
      { seed: "kiyi-detay-3", text: "Yaşlandırılmış bakır panel", tone: "clay" },
    ],
  },
  {
    slug: "yamac",
    name: "Yamaç",
    year: "2023",
    tone: "sage",
    tagline: "Eğime yerleşen, araziyi bozmayan kesitler.",
    essay: [
      "Yamaç koleksiyonu, topoğrafyayı düzleştirmek yerine onu kabul eden bir kesit mantığı üzerine kurulu. Her yapı, araziye kademeli olarak oturuyor; taşıyıcı sistem eğimin izini sürüyor ve kazı miktarı tasarımın ilk kısıtı olarak ele alınıyor.",
      "Malzeme paleti yerel: bölgede çıkan taş, fırınlanmış toprak ve iç mekânda yağ verilmiş meşe. Yapılar uzaktan bakıldığında araziye ait; yaklaşıldığında ise işçiliğin inceliğiyle ayrışıyor.",
    ],
    captions: [
      { seed: "yamac-detay-1", text: "Kandilli Yamaç Ev, kademeli kesit", tone: "sage" },
      { seed: "yamac-detay-2", text: "Yerel taş istifi", tone: "stone" },
      { seed: "yamac-detay-3", text: "Meşe doğrama birleşimi", tone: "wood" },
    ],
  },
  {
    slug: "avlu",
    name: "Avlu",
    year: "2023",
    tone: "plaster",
    tagline: "İçe dönen plan, gökyüzüne açılan oda.",
    essay: [
      "Avlu, Akdeniz ve Ege yerleşimlerinin en dayanıklı plan tipini bugünün yaşama biçimlerine göre yeniden kuruyor. Yapılar dışa kapalı, içe açık; gündelik hayat bir boşluğun etrafında dönüyor.",
      "Avlunun kendisi bir oda gibi ele alınıyor: zemini döşenmiş, duvarları sıvanmış, tavanı gökyüzü. Gün boyunca değişen gölge, mekânın asıl donatısı.",
    ],
    captions: [
      { seed: "avlu-detay-1", text: "Alaçatı Avlu Ev, öğle gölgesi", tone: "plaster" },
      { seed: "avlu-detay-2", text: "Kireç badana, iki kat", tone: "plaster" },
      { seed: "avlu-detay-3", text: "Avlu döşemesi, kesme taş", tone: "stone" },
    ],
  },
  {
    slug: "loft",
    name: "Loft",
    year: "2022",
    tone: "wood",
    tagline: "Kentin içinde bulunmuş hacimler.",
    essay: [
      "Loft koleksiyonu yeni yapı üretmiyor; mevcut olanı okuyor. Depolar, matbaalar, küçük imalathaneler — hepsi kentin ortasında, yüksek tavanlı ve fazlasıyla kullanılabilir hacimler olarak duruyor.",
      "Müdahalelerimiz sınırlı ve okunabilir: yeni olan, eskinin üzerine kendini gizlemeden yerleşiyor. Yağ verilmiş meşe, ham çelik ve mat pirinç, bulunmuş yüzeylerle aynı odada rahatça duruyor.",
    ],
    captions: [
      { seed: "loft-detay-1", text: "Cihangir Loft, çelik doğrama", tone: "dusk" },
      { seed: "loft-detay-2", text: "Ham beton ve meşe birleşimi", tone: "wood" },
      { seed: "loft-detay-3", text: "Mat pirinç donanım", tone: "amber" },
    ],
  },
  {
    slug: "kamusal",
    name: "Kamusal",
    year: "2025",
    tone: "dusk",
    tagline: "Herkese ait olan mekânın ölçüsü.",
    essay: [
      "Kamusal yapılarda tasarımın ölçüsü tek bir kullanıcı değil, bir topluluk. Bu koleksiyondaki işler — bir kütüphane, bir galeri, bir sahil yapısı — dayanıklılığı ve bakımı ilk günden tasarım kararı olarak ele alıyor.",
      "Yüzeyler yaşlanmayı kaldıracak şekilde seçiliyor; aydınlatma, mekânın günün her saatinde okunabilir kalmasını sağlıyor. Amaç zamansız bir görüntü değil, iyi yaşlanan bir yapı.",
    ],
    captions: [
      { seed: "kamusal-detay-1", text: "Emirgan Kütüphane, okuma salonu", tone: "dusk" },
      { seed: "kamusal-detay-2", text: "Akustik ahşap panel", tone: "wood" },
      { seed: "kamusal-detay-3", text: "Gün ışığı bacası", tone: "amber" },
    ],
  },
  {
    slug: "atolye",
    name: "Atölye",
    year: "2021",
    tone: "amber",
    tagline: "Küçük ölçekte yapılan denemeler.",
    essay: [
      "Atölye, stüdyonun kendi araştırma hattı. Bir kabin, bir sergi yapısı, bir cephe prototipi — hepsi hızlı kurulan ve hızlı öğrenilen işler.",
      "Buradaki denemelerin çoğu daha sonra büyük ölçekli projelere taşınıyor. Koleksiyonun asıl ürünü yapılar değil, biriken detay kütüphanesi.",
    ],
    captions: [
      { seed: "atolye-detay-1", text: "Şile Orman Kabin, 1:1 prototip", tone: "sage" },
      { seed: "atolye-detay-2", text: "Cephe kaplama denemesi", tone: "clay" },
      { seed: "atolye-detay-3", text: "Balat Atölye, çalışma tezgâhı", tone: "amber" },
    ],
  },
];

/* ────────────────────────────────────────────────────────────────
   Kategoriler — Shop kenar çubuğunun yapısı
   ──────────────────────────────────────────────────────────────── */

export type Category = {
  slug: string;
  name: string;
  /** Branding dosyasındaki "İçerikler" sütunu — kategorinin kapsamı. */
  note: string;
};

export const categories: Category[] = [
  {
    slug: "villalar",
    name: "Villalar",
    note: "Müstakil konutlar, ikiz villalar",
  },
  {
    slug: "konut-ic-mekanlari",
    name: "Konut İç Mekânları",
    note: "Salon, mutfak, yatak odası, banyo",
  },
  {
    slug: "ticari-mekanlar",
    name: "Ticari Mekânlar",
    note: "Ofis, klinik, mağaza ve butik işletmeler",
  },
  {
    slug: "mimari-dis-cephe",
    name: "Mimari & Dış Cephe",
    note: "Cephe tasarımı, renovasyon",
  },
  {
    slug: "gorsellestirme",
    name: "3D Görselleştirme",
    note: "İç mekân ve dış mekân renderları",
  },
];

/* ────────────────────────────────────────────────────────────────
   Projeler
   ──────────────────────────────────────────────────────────────── */

export type Project = {
  slug: string;
  title: string;
  category: string;
  collection: string;
  year: string;
  location: string;
  area: number;
  status: "Tamamlandı" | "Devam Ediyor" | "Ruhsat Aşamasında";
  isNew?: boolean;
  tone: Tone;
  /** Ürün detayındaki üst satır — kısa duyusal tanım */
  lede: string;
  /** Havuzdan sırayla atanır; hash kullanılsaydı aynı kare komşu kartlarda
   *  tekrar ederdi. */
  image?: string;
  overview: string;
  story: string;
  materials: string[];
  program: string[];
};

const P = (p: Project) => p;

export const projects: Project[] = [
  P({
    slug: "zeytinli-kiyi-evi",
    title: "Zeytinli Kıyı Evi",
    category: "villalar",
    collection: "kiyi",
    year: "2024",
    location: "Ayvalık, Balıkesir",
    area: 340,
    status: "Tamamlandı",
    isNew: true,
    tone: "stone",
    lede: "Tuzlu rüzgâra göre kalibre edilmiş bir kabuk.",
    overview:
      "Zeytinliğin içine, mevcut ağaç düzenini bozmadan yerleştirilen tek katlı bir yazlık. Plan, üç ayrı hacmin gölgeli bir geçitle birbirine bağlanmasıyla kuruluyor.",
    story:
      "Ev batıdan gelen sert rüzgâra kapalı, doğudaki zeytinliğe tamamen açık. Cephedeki kireç sıva, bölgedeki eski duvarların dokusunu tekrarlayacak şekilde iki katman hâlinde ve mala izleri bırakılarak uygulandı. Yaz aylarında geçit, evin en çok kullanılan odasına dönüşüyor.",
    materials: ["Kireç sıva", "Yerel kesme taş", "Yağlı meşe", "Yaşlandırılmış bakır"],
    program: ["3 yatak odası", "Gölgeli geçit", "Açık mutfak", "Deniz terası"],
  }),
  P({
    slug: "kandilli-yamac-ev",
    title: "Kandilli Yamaç Ev",
    category: "villalar",
    collection: "yamac",
    year: "2024",
    location: "Üsküdar, İstanbul",
    area: 410,
    status: "Tamamlandı",
    isNew: true,
    tone: "sage",
    lede: "Boğaz'a bakan, araziye kademelenen bir kesit.",
    overview:
      "Yüzde otuz sekiz eğimli bir parselde, kazıyı en aza indirmek üzere dört kademeye ayrılan aile evi. Her kademe kendi terasını üretiyor.",
    story:
      "Tasarım kesitle başladı: arazinin doğal eğrileri taşıyıcı akslara çevrildi ve yapı bu akslara oturtuldu. İstinat duvarları evin duvarı olarak kullanıldığı için ayrı bir peyzaj yapısına gerek kalmadı. Kuzey cephesindeki dar açıklıklar, güneydeki geniş camlarla bilinçli bir karşıtlık kuruyor.",
    materials: ["Brüt beton", "Yerel bazalt", "Meşe doğrama", "Patinalı çinko"],
    program: ["4 yatak odası", "Kademeli teraslar", "Çalışma odası", "Kapalı garaj"],
  }),
  P({
    slug: "alacati-avlu-ev",
    title: "Alaçatı Avlu Ev",
    category: "villalar",
    collection: "avlu",
    year: "2023",
    location: "Çeşme, İzmir",
    area: 265,
    status: "Tamamlandı",
    tone: "plaster",
    lede: "Gölgenin planı belirlediği bir yerleşim.",
    overview:
      "Dışa kapalı, avluya açılan tek katlı bir ev. Odalar avlunun dört kenarına diziliyor; sirkülasyon tamamen açık havada gerçekleşiyor.",
    story:
      "Avlunun oranı, yaz öğlelerinde zeminin yarısının gölgede kalacağı şekilde hesaplandı. Duvarlar geleneksel kireç badanayla, yılda bir kez yenilenebilecek şekilde bitirildi. Ev, kullanıcısının bakımıyla tamamlanan bir yapı olarak tasarlandı.",
    materials: ["Kireç badana", "Kesme taş döşeme", "Ardıç kirişleme", "Demir doğrama"],
    program: ["3 yatak odası", "Merkezî avlu", "Yaz mutfağı", "Havuz"],
  }),
  P({
    slug: "cihangir-loft",
    title: "Cihangir Loft",
    category: "konut-ic-mekanlari",
    collection: "loft",
    year: "2022",
    location: "Beyoğlu, İstanbul",
    area: 190,
    status: "Tamamlandı",
    tone: "wood",
    lede: "Eski bir matbaanın yüksek hacmi.",
    overview:
      "1930'lar yapısı bir matbaanın üst katında, mevcut çelik makasların tamamen görünür bırakıldığı bir konut dönüşümü.",
    story:
      "Yeni eklenen her şey — mutfak adası, asma kat, dolap duvarı — mevcut yapıdan bağımsız bir mobilya gibi ele alındı; hiçbiri özgün duvarlara yaslanmıyor. Çelik doğramanın ince profili, hacmin yüksekliğini bölmeden ayırma imkânı verdi.",
    materials: ["Ham çelik", "Yağlı meşe", "Mat pirinç", "Mevcut tuğla"],
    program: ["2 yatak odası", "Asma kat çalışma", "Açık mutfak", "Galeri boşluğu"],
  }),
  P({
    slug: "emirgan-kutuphane",
    title: "Emirgan Kütüphane",
    category: "ticari-mekanlar",
    collection: "kamusal",
    year: "2025",
    location: "Sarıyer, İstanbul",
    area: 1250,
    status: "Devam Ediyor",
    isNew: true,
    tone: "dusk",
    lede: "Kuzeyden alınan sabit gün ışığı.",
    overview:
      "Korunan bir korunun kenarında, mevcut ağaçların arasına yerleşen bir mahalle kütüphanesi. Okuma salonu tek hacim olarak kurgulandı.",
    story:
      "Yapının tüm gün ışığı kuzeyden ve tavandaki ışık bacalarından alınıyor; bu sayede kitaplara doğrudan güneş gelmiyor ve salonun ışığı gün boyunca neredeyse sabit kalıyor. Akustik, tavandaki ahşap lamel sistemiyle çözüldü.",
    materials: ["Akustik meşe lamel", "Brüt beton", "Terrazzo döşeme", "Bronz eloksal"],
    program: ["Okuma salonu", "Çocuk bölümü", "Atölye", "Kafe"],
  }),
  P({
    slug: "karakoy-ofis",
    title: "Karaköy Ofis",
    category: "ticari-mekanlar",
    collection: "loft",
    year: "2023",
    location: "Beyoğlu, İstanbul",
    area: 720,
    status: "Tamamlandı",
    tone: "stone",
    lede: "Bulunmuş bir depo, çalışan bir plan.",
    overview:
      "Liman deposundan dönüştürülen, altmış kişilik bir tasarım ofisi. Mevcut kolon aksı yeni planın tek düzenleyicisi.",
    story:
      "Kapalı hacimler yapının sağır cephesine toplandı; açık çalışma alanı denize bakan tarafta bütün olarak bırakıldı. Aydınlatma, kolonlara asılan tekil armatürler yerine sürekli bir çizgi olarak kurgulandı ve kolon aksını okunur kıldı.",
    materials: ["Mevcut beton", "Ham çelik", "Keçe akustik panel", "Linolyum"],
    program: ["Açık ofis", "6 toplantı odası", "Malzeme kütüphanesi", "Teras"],
  }),
  P({
    slug: "urla-bag-evi",
    title: "Urla Bağ Evi",
    category: "villalar",
    collection: "avlu",
    year: "2023",
    location: "Urla, İzmir",
    area: 220,
    status: "Tamamlandı",
    tone: "clay",
    lede: "Bağın ortasında, toprak renginde bir kütle.",
    overview:
      "Üzüm bağının içinde, hasat mevsimi dışında da kullanılabilecek şekilde tasarlanmış küçük bir ev ve şaraphane.",
    story:
      "Cephedeki toprak sıva, bağdan çıkan kilin harca katılmasıyla elde edildi; yapının rengi kelimenin tam anlamıyla arazinin kendisinden geliyor. Şaraphane bölümü kuzeye gömülerek doğal olarak serin tutuldu.",
    materials: ["Toprak sıva", "Gömme beton", "Kestane kirişleme", "Demir"],
    program: ["2 yatak odası", "Şaraphane", "Uzun masa", "Bağ terası"],
  }),
  P({
    slug: "galata-restorasyon",
    title: "Galata Restorasyon",
    category: "mimari-dis-cephe",
    collection: "loft",
    year: "2022",
    location: "Beyoğlu, İstanbul",
    area: 480,
    status: "Tamamlandı",
    tone: "plaster",
    lede: "Yüz yıllık bir cephenin geri kazanımı.",
    overview:
      "1890'lar tarihli bir apartmanın cephe ve merdiven boşluğu restorasyonu ile üst iki katının konuta dönüşümü.",
    story:
      "Cephedeki özgün horasan sıva, kaybolan bölümleri aynı agrega oranıyla tamamlanarak korundu. Merdiven boşluğundaki döküm korkuluklar sökülüp temizlendikten sonra yerine takıldı. Yeni eklenen çatı katı, sokaktan görünmeyecek şekilde geri çekildi.",
    materials: ["Horasan sıva", "Döküm demir", "Karo çini", "Meşe parke"],
    program: ["Cephe restorasyonu", "2 daire", "Çatı katı", "Ortak merdiven"],
  }),
  P({
    slug: "bodrum-yalikavak-villa",
    title: "Yalıkavak Villa",
    category: "villalar",
    collection: "kiyi",
    year: "2024",
    location: "Bodrum, Muğla",
    area: 520,
    status: "Tamamlandı",
    tone: "stone",
    lede: "Denizle aynı hizada duran bir taban.",
    overview:
      "Koya bakan kayalık bir parselde, tek kotta çözülen ve havuzu denizle aynı çizgide okunan bir yazlık.",
    story:
      "Yapının en önemli kararı kot: taban, havuz aynası ve ufuk çizgisi oturma yüksekliğinden bakıldığında tek bir düzlem olarak birleşiyor. Gölgeleme, sabit saçak yerine hareketli ahşap panjurlarla sağlandı.",
    materials: ["Beyaz taş", "Iroko panjur", "Mikro beton", "Paslanmaz"],
    program: ["5 yatak odası", "Sonsuzluk havuzu", "Misafir evi", "Sahil terası"],
  }),
  P({
    slug: "beykoz-koru-ev",
    title: "Beykoz Koru Ev",
    category: "villalar",
    collection: "yamac",
    year: "2022",
    location: "Beykoz, İstanbul",
    area: 380,
    status: "Tamamlandı",
    tone: "sage",
    lede: "Ağaçların arasına sıkışan dar bir kütle.",
    overview:
      "Korunan ağaç dokusunun izin verdiği boşluğa göre biçimlenen, uzun ve dar planlı bir aile evi.",
    story:
      "Ağaç kadastrosu, planın ilk çizgisinden önce çıkarıldı; yapı hiçbir ağacın kök bölgesine girmiyor. Bu kısıt, evin alışılmadık derecede ince oranını ve iki uçtaki geniş açıklıkları doğurdu.",
    materials: ["Karbonize ahşap", "Beton", "Meşe", "Cam"],
    program: ["4 yatak odası", "Uzun oturma", "Kütüphane", "Orman terası"],
  }),
  P({
    slug: "moda-sahil-kafe",
    title: "Moda Sahil Kafe",
    category: "ticari-mekanlar",
    collection: "kamusal",
    year: "2023",
    location: "Kadıköy, İstanbul",
    area: 160,
    status: "Tamamlandı",
    tone: "amber",
    lede: "Akşam ışığında çalışan bir vitrin.",
    overview:
      "Sahil yürüyüş hattı üzerinde, tamamen açılabilen cephesiyle mevsime göre iç ve dış arasında yer değiştiren küçük bir kafe.",
    story:
      "Cephedeki katlanır doğrama açıldığında mekân yürüyüş hattının bir parçası hâline geliyor. Aydınlatma bilinçli olarak alçak tutuldu; akşam saatlerinde yapı, denize bakan tarafta parlamayan sıcak bir yüzey olarak okunuyor.",
    materials: ["Iroko doğrama", "Terrazzo tezgâh", "Mat pirinç", "Kireç sıva"],
    program: ["Salon", "Dış oturma", "Açık mutfak", "Servis"],
  }),
  P({
    slug: "datca-kaya-ev",
    title: "Datça Kaya Ev",
    category: "villalar",
    collection: "kiyi",
    year: "2021",
    location: "Datça, Muğla",
    area: 290,
    status: "Tamamlandı",
    tone: "stone",
    lede: "Mevcut kayaya yaslanan bir duvar.",
    overview:
      "Parseldeki büyük kaya kütlesinin evin bir duvarı olarak kullanıldığı, üç bölümlü bir yazlık.",
    story:
      "Kaya patlatılmak yerine korunarak yaşama alanının kuzey sınırı olarak bırakıldı; yazın bu yüzey mekânı belirgin biçimde serinletiyor. Diğer üç kenar hafif ve sökülebilir yapıldı.",
    materials: ["Mevcut kaya", "Çelik iskelet", "Ahşap kaplama", "Cam"],
    program: ["3 yatak odası", "Kaya duvar salon", "Gölgelik", "Havuz"],
  }),
  P({
    slug: "nisantasi-apartman",
    title: "Nişantaşı Apartman",
    category: "mimari-dis-cephe",
    collection: "loft",
    year: "2024",
    location: "Şişli, İstanbul",
    area: 1450,
    status: "Devam Ediyor",
    tone: "plaster",
    lede: "Sokak dokusuna yeniden eklemlenen bir cephe.",
    overview:
      "On iki daireli, zemin katı dükkân olarak çözülen bir apartman. Cephe, sokaktaki mevcut kat hizalarını sürdürüyor.",
    story:
      "Kat yükseklikleri ve silme hizaları komşu yapılardan alındı; yeni olan, tekrar eden bir ritim içinde kendini gösteriyor. Balkonlar cepheden taşmak yerine kütlenin içine oyularak sokağın çizgisi korundu.",
    materials: ["Prekast beton", "Bronz eloksal", "Traverten", "Meşe"],
    program: ["12 daire", "Zemin dükkân", "Ortak teras", "Bisiklet odası"],
  }),
  P({
    slug: "sile-orman-kabin",
    title: "Şile Orman Kabin",
    category: "villalar",
    collection: "atolye",
    year: "2021",
    location: "Şile, İstanbul",
    area: 46,
    status: "Tamamlandı",
    tone: "sage",
    lede: "Bir hafta sonunda kurulan bir prototip.",
    overview:
      "Ormanlık bir arazide, prefabrik panellerle üç günde monte edilen tek hacimli bir kabin.",
    story:
      "Kabin, stüdyonun panel birleşim detayını 1:1 ölçekte denemek için tasarlandı. Panellerin tamamı atölyede üretildi; şantiyede yalnızca montaj yapıldı. Bu detay daha sonra Beykoz Koru Ev'in cephesinde kullanıldı.",
    materials: ["CLT panel", "Karbonize ahşap", "Yün yalıtım", "Polikarbon"],
    program: ["Tek hacim", "Sofa", "Islak hacim", "Ahşap sundurma"],
  }),
  P({
    slug: "ortakoy-galeri",
    title: "Ortaköy Galeri",
    category: "ticari-mekanlar",
    collection: "kamusal",
    year: "2022",
    location: "Beşiktaş, İstanbul",
    area: 340,
    status: "Tamamlandı",
    tone: "dusk",
    lede: "Sergiye göre yeniden kurulan bir kabuk.",
    overview:
      "Sabit bölme kullanmayan, hareketli panel sistemiyle her sergide yeniden düzenlenebilen bağımsız bir galeri.",
    story:
      "Tavandaki ray sistemi hem panelleri hem aydınlatmayı taşıyor; bu sayede sergi kurgusu tek bir altyapıdan yönetiliyor. Zemin, kesintisiz dökme reçineyle bitirilerek panel izlerinin görünmesi engellendi.",
    materials: ["Dökme reçine", "Alüminyum ray", "Alçı panel", "Ham çelik"],
    program: ["Ana salon", "Depo", "Ofis", "Yükleme"],
  }),
  P({
    slug: "tepebasi-otel",
    title: "Tepebaşı Otel",
    category: "ticari-mekanlar",
    collection: "loft",
    year: "2025",
    location: "Beyoğlu, İstanbul",
    area: 2100,
    status: "Ruhsat Aşamasında",
    isNew: true,
    tone: "wood",
    lede: "Bir han yapısının otuz dört odası.",
    overview:
      "Tescilli bir han yapısının, avlusu korunarak butik otele dönüştürülmesi. Odalar mevcut tonoz düzenine göre boyutlandırıldı.",
    story:
      "Tonozlu hacimlerin hiçbiri bölünmedi; oda boyutları yapının kendi ritmini takip ettiği için otuz dört odanın on bir farklı tipi var. Avlu, üzeri açık bırakılarak otelin ortak alanı olarak kuruldu.",
    materials: ["Mevcut tuğla tonoz", "Horasan", "Ceviz", "Bronz"],
    program: ["34 oda", "Avlu lobi", "Restoran", "Bodrum bar"],
  }),
  P({
    slug: "yenikoy-yali",
    title: "Yeniköy Yalı",
    category: "mimari-dis-cephe",
    collection: "kiyi",
    year: "2023",
    location: "Sarıyer, İstanbul",
    area: 640,
    status: "Tamamlandı",
    tone: "plaster",
    lede: "Denizden gelen nemin yönettiği bir onarım.",
    overview:
      "19. yüzyıl ahşap yalının taşıyıcı sistem güçlendirmesi ve iç mekân yenilemesi.",
    story:
      "Zemin kotundaki ahşap elemanların büyük bölümü nem nedeniyle değiştirildi; kullanılan kereste aynı türden ve en az beş yıl doğal kurutulmuş olarak seçildi. Denize bakan cephedeki özgün doğrama oranları hiç değiştirilmedi.",
    materials: ["Kestane kereste", "Ahşap koruyucu", "Kireç sıva", "Kurşun detay"],
    program: ["Taşıyıcı güçlendirme", "5 yatak odası", "Sofa", "Rıhtım"],
  }),
  P({
    slug: "balat-atolye",
    title: "Balat Atölye",
    category: "ticari-mekanlar",
    collection: "atolye",
    year: "2021",
    location: "Fatih, İstanbul",
    area: 85,
    status: "Tamamlandı",
    tone: "amber",
    lede: "Sokağa açılan tek gözlü bir imalathane.",
    overview:
      "Seramik üreticisi için, sokak cephesi tamamen açılabilen küçük bir üretim ve satış mekânı.",
    story:
      "Tezgâh vitrinin hemen arkasına yerleştirildi; üretim sürecinin kendisi mekânın vitrini oldu. Fırın bölümü arkada, yüksek tavanlı ikinci bir hacimde çözüldü.",
    materials: ["Kireç sıva", "Çelik doğrama", "Beton tezgâh", "Seramik karo"],
    program: ["Üretim tezgâhı", "Fırın odası", "Satış", "Depo"],
  }),
  P({
    slug: "kuzguncuk-bahce-ev",
    title: "Kuzguncuk Bahçe Ev",
    category: "villalar",
    collection: "avlu",
    year: "2022",
    location: "Üsküdar, İstanbul",
    area: 210,
    status: "Tamamlandı",
    tone: "sage",
    lede: "Bahçeye doğru genişleyen bir plan.",
    overview:
      "Dar ve derin bir parselde, arka bahçeye doğru kademeli olarak açılan iki katlı bir ev.",
    story:
      "Sokak cephesi mahallenin ölçüsünü koruyacak şekilde küçük tutuldu; yapı asıl genişlemesini bahçe tarafında yapıyor. Zemin kattaki tek hacim, mevsime göre bahçeyle birleşiyor.",
    materials: ["Sıvalı yığma", "Ahşap doğrama", "Karo döşeme", "Çinko çatı"],
    program: ["3 yatak odası", "Bahçe salonu", "Kış bahçesi", "Kiler"],
  }),
  P({
    slug: "cesme-ruzgar-evi",
    title: "Çeşme Rüzgâr Evi",
    category: "villalar",
    collection: "kiyi",
    year: "2020",
    location: "Çeşme, İzmir",
    area: 310,
    status: "Tamamlandı",
    tone: "stone",
    lede: "Rüzgârı kesmek yerine yönlendiren duvarlar.",
    overview:
      "Sürekli kuzey rüzgârına açık bir platoda, dış mekânları kullanılabilir kılmak için konumlandırılmış duvar dizileri.",
    story:
      "Bağımsız duvarlar yapıdan önce tasarlandı; her biri belirli bir dış mekânı korumak üzere yerleştirildi. Ev, bu duvarların arasına yerleşen ikinci bir katman olarak eklendi.",
    materials: ["Beyaz sıva", "Yerel taş", "Iroko", "Mikro beton"],
    program: ["4 yatak odası", "Korunaklı avlu", "Havuz", "Sundurma"],
  }),
  P({
    slug: "arnavutkoy-cephe",
    title: "Arnavutköy Cephe",
    category: "mimari-dis-cephe",
    collection: "atolye",
    year: "2020",
    location: "Beşiktaş, İstanbul",
    area: 120,
    status: "Tamamlandı",
    tone: "clay",
    lede: "Yalnızca bir cephe, tam ölçekli bir çalışma.",
    overview:
      "Tarihî bir sıra evin sokak cephesinin, özgün renk katmanları analiz edilerek yenilenmesi.",
    story:
      "Cepheden alınan boya kesitleri laboratuvarda incelendi ve 1920'lere ait üçüncü katman referans alındı. Renk, bugünün pigmentleriyle aynı doygunlukta yeniden karıştırıldı.",
    materials: ["Kireç boya", "Ahşap doğrama", "Döküm demir", "Çinko"],
    program: ["Cephe onarımı", "Doğrama yenileme", "Renk analizi"],
  }),
  P({
    slug: "seferihisar-bag-evi",
    title: "Seferihisar Bağ Evi",
    category: "villalar",
    collection: "avlu",
    year: "2025",
    location: "Seferihisar, İzmir",
    area: 245,
    status: "Devam Ediyor",
    isNew: true,
    tone: "clay",
    lede: "İki avlu, bir gölgelik.",
    overview:
      "Biri ıslak biri kuru olmak üzere iki avlu etrafında kurgulanan, mevsimlik kullanıma göre bölünebilen bir ev.",
    story:
      "Kışın evin yalnızca güney kanadı ısıtılıyor; kuzey kanadı kapatılabiliyor. Bu ayrım plana baştan yazıldığı için ek bir mekanik çözüme ihtiyaç kalmadı.",
    materials: ["Toprak sıva", "Kesme taş", "Kestane", "Kamış gölgelik"],
    program: ["3 yatak odası", "İki avlu", "Yaz mutfağı", "Gölgelik"],
  }),
  P({
    slug: "foca-deniz-yapisi",
    title: "Foça Deniz Yapısı",
    category: "ticari-mekanlar",
    collection: "kamusal",
    year: "2024",
    location: "Foça, İzmir",
    area: 180,
    status: "Tamamlandı",
    tone: "stone",
    lede: "Tuz ve güneş altında yaşlanmaya bırakılmış.",
    overview:
      "Balıkçı barınağının yanında, deniz araştırma istasyonu olarak kullanılan küçük kamusal yapı.",
    story:
      "Malzemelerin tamamı bakım gerektirmeyecek şekilde seçildi: yaşlandırılmış bakır, beton ve paslanmaz. Yapının ilk yıl içinde renk değiştirmesi tasarımın parçası olarak kabul edildi.",
    materials: ["Yaşlandırılmış bakır", "Beton", "Paslanmaz", "Cam tuğla"],
    program: ["Laboratuvar", "Sergi", "Depo", "İskele"],
  }),
  P({
    slug: "portakal-cicegi-rezidans",
    title: "Portakal Çiçeği Rezidans",
    category: "mimari-dis-cephe",
    collection: "yamac",
    year: "2023",
    location: "Çankaya, Ankara",
    area: 1850,
    status: "Tamamlandı",
    tone: "plaster",
    lede: "Vadiye kademelenen on dört daire.",
    overview:
      "Eğimli bir vadi parselinde, her daireye kendi bahçesini veren kademeli bir konut yapısı.",
    story:
      "Kademelenme sayesinde alt kattaki dairelerin çatısı üst kattakilerin terası oldu; böylece on dört dairenin tamamı doğrudan dış mekâna açılıyor. Ortak sirkülasyon açık havada bırakıldı.",
    materials: ["Prekast beton", "Traverten", "Meşe", "Çelik korkuluk"],
    program: ["14 daire", "Kademeli teraslar", "Ortak bahçe", "Otopark"],
  }),
  P({
    slug: "bebek-teras-daire",
    title: "Bebek Teras Daire",
    category: "konut-ic-mekanlari",
    collection: "loft",
    year: "2024",
    location: "Beşiktaş, İstanbul",
    area: 145,
    status: "Tamamlandı",
    isNew: true,
    tone: "wood",
    lede: "Tek bir dolap duvarının düzenlediği plan.",
    overview:
      "Boğaz'a bakan bir dairede, tüm servis hacimlerinin tek bir ceviz duvarın içine toplandığı iç mimari çalışma.",
    story:
      "Mutfak, dolaplar, ıslak hacim girişi ve teknik alan aynı yüzeyin arkasına yerleştirildi; kalan alan bölünmeden bırakıldı. Duvarın derinliği, manzaraya bakan cephenin tamamen boş kalmasını mümkün kıldı.",
    materials: ["Ceviz kaplama", "Mikro beton", "Mat pirinç", "Traverten"],
    program: ["2 yatak odası", "Servis duvarı", "Teras", "Çalışma nişi"],
  }),
  P({
    slug: "ayvalik-tas-ev",
    title: "Ayvalık Taş Ev",
    category: "mimari-dis-cephe",
    collection: "avlu",
    year: "2021",
    location: "Ayvalık, Balıkesir",
    area: 175,
    status: "Tamamlandı",
    tone: "plaster",
    lede: "Sağlam olan bırakıldı, gerisi yeniden yapıldı.",
    overview:
      "Terk edilmiş bir taş evin, mevcut duvarları korunarak yeniden kullanıma kazandırılması.",
    story:
      "Çatı ve tüm iç döşemeler yenilendi; taş duvarlar ise yalnızca derz onarımıyla bırakıldı. Yeni ahşap yapı, mevcut duvarlardan bağımsız bir iskelet olarak içeriye yerleştirildi.",
    materials: ["Mevcut taş", "Kestane kirişleme", "Kireç derz", "Kiremit"],
    program: ["2 yatak odası", "Avlu", "Sofa", "Kiler"],
  }),
  P({
    slug: "levent-calisma-kati",
    title: "Levent Çalışma Katı",
    category: "ticari-mekanlar",
    collection: "loft",
    year: "2022",
    location: "Beşiktaş, İstanbul",
    area: 560,
    status: "Tamamlandı",
    tone: "stone",
    lede: "Tavanın tamamen açık bırakıldığı bir kat.",
    overview:
      "Bir plaza katının, asma tavan kaldırılarak yeniden düzenlendiği çalışma alanı.",
    story:
      "Asma tavanın kaldırılması kat yüksekliğini altmış santimetre artırdı; tüm tesisat düzenlenip görünür bırakıldı. Akustik, tavana asılan bağımsız keçe adalarla çözüldü.",
    materials: ["Ham beton", "Keçe ada", "Meşe", "Alüminyum"],
    program: ["Açık ofis", "4 toplantı", "Odak kabinleri", "Mutfak"],
  }),
  P({
    slug: "gokceada-peyzaj",
    title: "Gökçeada Peyzaj",
    category: "mimari-dis-cephe",
    collection: "atolye",
    year: "2023",
    location: "Gökçeada, Çanakkale",
    area: 4200,
    status: "Tamamlandı",
    tone: "sage",
    lede: "Sulama gerektirmeyen bir bahçe.",
    overview:
      "Terk edilmiş tarım teraslarının, yalnızca yerel türlerle yeniden düzenlendiği bir peyzaj projesi.",
    story:
      "Mevcut kuru taş duvarlar onarılarak teras düzeni geri kazanıldı. Bitki seçimi tamamen adanın kendi florasından yapıldığı için ilk yıldan sonra sulama ihtiyacı kalmıyor.",
    materials: ["Kuru taş duvar", "Yerel flora", "Çakıl", "Ahşap"],
    program: ["Teras onarımı", "Yürüyüş hattı", "Gölgelik", "Su toplama"],
  }),

  /* 3D Görselleştirme — TODO: gerçek görselleştirme işleriyle değiştirilecek
     yer tutucu kayıtlar. Kategori branding dosyasında tanımlı olduğu için
     boş bırakılmadı. */
  P({
    slug: "salihli-villa-gorsellestirme",
    title: "Salihli Villa Görselleştirme",
    category: "gorsellestirme",
    collection: "yamac",
    year: "2025",
    location: "Salihli, Manisa",
    area: 320,
    status: "Tamamlandı",
    isNew: true,
    tone: "amber",
    lede: "Uygulamadan önce görülen bir ev.",
    overview:
      "Bağ manzarasına bakan iki katlı bir villanın, ruhsat öncesi karar alma sürecinde kullanılan dış ve iç mekân görselleştirmesi.",
    story:
      "Cephe kaplaması, saçak derinliği ve pencere oranları üç ayrı seçenek olarak modellendi; kararlar render üzerinden verildiği için uygulamaya tek bir alternatifle girildi. Gün ışığı simülasyonu, yaz ve kış gündönümü saatlerine göre ayrı ayrı kuruldu.",
    materials: ["Doğal taş kaplama", "Termowood", "Mikro beton", "Bronz doğrama"],
    program: ["12 dış mekân görseli", "8 iç mekân görseli", "Gün ışığı analizi", "Kısa animasyon"],
  }),
  P({
    slug: "manisa-klinik-render",
    title: "Manisa Klinik Renderları",
    category: "gorsellestirme",
    collection: "kamusal",
    year: "2024",
    location: "Şehzadeler, Manisa",
    area: 240,
    status: "Tamamlandı",
    tone: "plaster",
    lede: "Bekleme salonunun ışığını önceden ölçmek.",
    overview:
      "Bir diş kliniğinin bekleme, muayene ve koridor hacimleri için hazırlanan iç mekân görselleştirme seti.",
    story:
      "Kliniklerde ışığın rengi, hastanın mekânı nasıl algıladığını doğrudan belirliyor. Aydınlatma senaryosu üç farklı renk sıcaklığında render edilerek karşılaştırıldı; seçilen çözüm doğrudan aydınlatma projesine aktarıldı.",
    materials: ["Akustik panel", "Mat lake", "Terrazzo", "Meşe kaplama"],
    program: ["Bekleme salonu", "3 muayene odası", "Koridor", "Resepsiyon"],
  }),
  P({
    slug: "alasehir-bag-evi-render",
    title: "Alaşehir Bağ Evi Renderları",
    category: "gorsellestirme",
    collection: "avlu",
    year: "2025",
    location: "Alaşehir, Manisa",
    area: 180,
    status: "Devam Ediyor",
    isNew: true,
    tone: "clay",
    lede: "Bağın içinden bakan tek bir kare.",
    overview:
      "Üzüm bağının ortasındaki küçük bir hafta sonu evinin, tasarım aşamasındaki görselleştirme çalışması.",
    story:
      "Modelleme, arazinin gerçek kotu ve mevcut asma sıraları üzerine kuruldu; böylece görsellerdeki manzara temsilî değil, parselin kendisi. Toprak sıvanın rengi, sahadan alınan örneklerin taranmasıyla elde edildi.",
    materials: ["Toprak sıva", "Kestane", "Kamış gölgelik", "Kesme taş"],
    program: ["Dış mekân görselleri", "Avlu perspektifi", "Malzeme paneli", "360° görünüm"],
  }),
];

/* ────────────────────────────────────────────────────────────────
   Türetilmiş yardımcılar
   ──────────────────────────────────────────────────────────────── */

/* Görseller proje sırasına göre dağıtılıyor: ilk ARCH_IMAGES.length proje
   birbirinden farklı bir kare alıyor, tekrar ancak havuz bitince başlıyor. */
projects.forEach((p, i) => {
  p.image = ARCH_IMAGES[i % ARCH_IMAGES.length];
});

export const countByCategory = (slug: string) =>
  projects.filter((p) => p.category === slug).length;

export const countByCollection = (slug: string) =>
  projects.filter((p) => p.collection === slug).length;

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const getCollection = (slug: string) =>
  collections.find((c) => c.slug === slug);

export const categoryName = (slug: string) =>
  categories.find((c) => c.slug === slug)?.name ?? slug;

export const collectionName = (slug: string) =>
  collections.find((c) => c.slug === slug)?.name ?? slug;

/** Bir projenin galerisi için deterministik tohum listesi. */
export const galleryFor = (p: Project) =>
  Array.from({ length: 6 }, (_, i) => `${p.slug}-${i}`);

export const newArrivals = projects.filter((p) => p.isNew);
export const ongoing = projects.filter((p) => p.status !== "Tamamlandı");

/**
 * Faculty Department künye biçimi: başlıkta "Ad, Rol", altında büyük harfli
 * konum. Editoryal ızgaranın beklediği şekil.
 */
export const toEntry = (p: Project) => ({
  href: `/projeler/${p.slug}`,
  seed: p.slug,
  tone: p.tone,
  image: p.image,
  title: `${p.title}, ${categoryName(p.category)}`,
  meta: p.location,
});

/* ────────────────────────────────────────────────────────────────
   Günlük (Journal)
   ──────────────────────────────────────────────────────────────── */

export type Post = {
  slug: string;
  title: string;
  date: string;
  kind: string;
  excerpt: string;
  tone: Tone;
  /** Yazının gövdesi — tekil yazı sayfasında paragraf paragraf basılıyor. */
  body: string[];
  /** Okuma süresi, dakika. */
  minutes: number;
};

/** Tekil yazı adresi — tek yerden kurulsun diye. */
export const postHref = (p: Pick<Post, "slug">) => `/blog/${p.slug}`;

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export const postToEntry = (p: Post) => ({
  href: postHref(p),
  seed: `gunluk-${p.slug}`,
  tone: p.tone,
  title: p.title,
  meta: `${p.kind} · ${p.date}`,
});

export const posts: Post[] = [
  {
    slug: "kirec-sivanin-donusu",
    title: "Kireç sıvanın dönüşü",
    date: "12.05.2026",
    kind: "Malzeme",
    excerpt:
      "Yüz yıl önce standart olan bir yüzeyin, nefes alan yapı tartışmasıyla birlikte neden yeniden gündeme geldiğini ve şantiyede nasıl doğru uygulandığını anlatıyoruz.",
    tone: "plaster",
    minutes: 6,
    body: [
      "Kireç sıvayı yeniden konuşuyor olmamızın sebebi nostalji değil. Çimento esaslı sıvaların yaygınlaşmasıyla birlikte duvarın nem dengesi değişti; yüzey su buharını dışarı bırakmayınca nem, boyanın altında ya da yalıtımın arkasında birikmeye başladı. Kireç, bu dengeyi kendiliğinden kuran bir malzeme: aldığı nemi geri veriyor.",
      "Uygulamada belirleyici olan üç şey var. Birincisi altlık: yüzeyin emiciliği ölçülmeden karışım oranı seçilemiyor. İkincisi katman sayısı — tek kalın kat yerine üç ince kat, çatlak riskini belirgin biçimde düşürüyor. Üçüncüsü ise kür: ilk yedi gün boyunca yüzeyin nemli tutulması, sonraki on yılın dayanımını belirliyor.",
      "Renk konusunda beklentiyi baştan kurmak gerekiyor. Kireç sıva homojen bir yüzey vermiyor; ışığın geldiği yöne göre açılıp koyulaşıyor. Müşteriyle bu konuşulmadığında, kusursuz düz bir duvar bekleyen biri için sonuç hayal kırıklığı oluyor. Biz artık numune panosunu şantiyede, gerçek ışık altında hazırlıyoruz.",
      "Maliyet tarafında kireç sıva, çimento esaslı bir sistemden işçilik nedeniyle daha pahalı. Ancak boya yenileme aralığı uzuyor ve nem kaynaklı tamiratlar ortadan kalkıyor. Beş yıllık bir pencerede fark kapanıyor; on yılda kireç öne geçiyor.",
    ],
  },
  {
    slug: "yamacta-kazi-hesabi",
    title: "Yamaçta kazı hesabı",
    date: "28.03.2026",
    kind: "Yöntem",
    excerpt:
      "Eğimli arazide tasarıma kesitle başlamak, hem maliyeti hem de araziye verilen zararı ne ölçüde değiştiriyor? Kandilli Yamaç Ev üzerinden bir okuma.",
    tone: "sage",
    minutes: 5,
    body: [
      "Eğimli arazide ilk çizim planla başlarsa, kazı hep sonradan çözülmesi gereken bir problem oluyor. Kesitle başlandığında ise yapının kotları araziye göre kuruluyor ve kazı, tasarımın sonucu değil parçası hâline geliyor.",
      "Kandilli Yamaç Ev'de iki seçeneği yan yana hesapladık. İlk seçenekte tek kotta oturan bir kütle vardı; ikincisinde yapı üç kademeye bölünüyordu. Kademeli çözüm, hafriyat hacmini yaklaşık üçte bir oranında azalttı — bu da hem kamyon seferi hem istinat duvarı demek.",
      "Kazının azalması yalnızca maliyet kalemi değil. Yamaçtaki mevcut ağaç dokusunun büyük kısmı yerinde kaldı; drenaj yükü düştü; şantiye süresi kısaldı. Araziye verilen zarar, sonradan peyzajla telafi edilmeye çalışılan bir şey olmaktan çıktı.",
      "Yöntem basit: arazinin en dik hattından geçen bir kesit üzerinde çalışmaya başlamak ve plan kararlarını bu kesit izin verdiği ölçüde almak. Kulağa kısıtlayıcı geliyor; pratikte tersi oluyor.",
    ],
  },
  {
    slug: "bakirin-ilk-yili",
    title: "Bakırın ilk yılı",
    date: "04.02.2026",
    kind: "Detay",
    excerpt:
      "Foça Deniz Yapısı'nın cephesini on iki ay boyunca aynı açıdan fotoğrafladık. Patinanın oluşma hızı beklediğimizden farklı çıktı.",
    tone: "clay",
    minutes: 4,
    body: [
      "Bakır cephe seçerken müşteriye gösterdiğimiz görseller genelde ya ilk günün parlak turuncusunu ya da otuz yıl sonrasının yeşilini anlatır. Arada kalan uzun süreyi kimse çizmez. Biz o araya bakmak istedik.",
      "Foça'da cepheyi teslimden itibaren on iki ay boyunca ayda bir, aynı saatte ve aynı noktadan fotoğrafladık. İlk üç ayda renk beklediğimizden hızlı koyulaştı; deniz etkisiyle kahverengiye geçiş neredeyse yarı sürede tamamlandı.",
      "Buna karşılık yönler arasında ciddi fark oluştu. Kuzey cephesi bir yıl sonunda hâlâ mat kahverengiydi; güneybatı cephesinde ise yer yer gri-yeşil lekeler başlamıştı. Yani yapı tek bir renkte yaşlanmıyor, yönüne göre ayrışıyor.",
      "Buradan çıkardığımız pratik sonuç şu: bakır cephede detay çizerken damlalıkların ve süzülme yollarının konumu, estetik bir tercih değil renk kararı. Suyun aktığı yer, birkaç yıl içinde gözle görülür bir iz bırakıyor.",
    ],
  },
  {
    slug: "avlunun-oraninu-bulmak",
    title: "Avlunun oranını bulmak",
    date: "19.11.2025",
    kind: "Yöntem",
    excerpt:
      "Bir avlunun ne kadar gölge vereceği, en/boy oranı ve duvar yüksekliğiyle doğrudan hesaplanabilir. Alaçatı'da kullandığımız basit tabloyu paylaşıyoruz.",
    tone: "amber",
    minutes: 5,
    body: [
      "Avlu, sıcak iklimde yalnızca bir boşluk değil; iklimlendirme aracı. Ne kadar gölge vereceği ve gün içinde ne zaman kullanılabilir olacağı, duvar yüksekliğinin avlu genişliğine oranıyla doğrudan ilişkili.",
      "Pratikte kullandığımız eşik şu: yükseklik/genişlik oranı 1'e yaklaştıkça avlu öğle saatlerinde bile gölgeli kalıyor, ama kışın güneş almıyor ve nemli hissettiriyor. Oran 0,4'ün altına indiğinde avlu bir dış oda olmaktan çıkıp açık alana dönüşüyor.",
      "Alaçatı'daki evde oranı 0,6'da tuttuk ve gölgeyi tamamlamak için batı kenarına ince bir pergola ekledik. Böylece yaz öğleden sonrası kullanılabilir kaldı, kış güneşi ise iç mekâna ulaştı.",
      "Bu bir formül değil, başlangıç noktası. Ama ilk eskizde oranı bilinçli seçmek, sonradan gölgelik ekleyerek problemi çözmeye çalışmaktan çok daha ucuz ve çok daha iyi sonuç veriyor.",
    ],
  },
  {
    slug: "studyoda-1-1",
    title: "Stüdyoda 1:1",
    date: "07.09.2025",
    kind: "Atölye",
    excerpt:
      "Her cephe detayını uygulamaya girmeden önce gerçek ölçekte kuruyoruz. Bu alışkanlığın altı yılda bize kazandırdıkları — ve maliyeti.",
    tone: "wood",
    minutes: 4,
    body: [
      "Bir detayın çizimde doğru görünmesiyle elde doğru çalışması arasında düzenli bir fark var. Bu farkı erken görmek için kritik detayları uygulamaya girmeden önce stüdyoda gerçek ölçekte kuruyoruz.",
      "En çok işe yaradığı yer birleşimler: kapı kasasının duvarla buluştuğu nokta, gizli süpürgelik, cephe kaplamasının köşe dönüşü. Bu üç detayın 1:1 maketi, hemen her projede en az bir kez çizimi değiştirdi.",
      "Maliyeti saklamanın anlamı yok: her maket malzeme ve iş gücü demek, ortalama olarak proje bütçesinin küçük ama görünür bir kalemi. Buna karşılık şantiyede bir birleşimin sökülüp yeniden yapılması, aynı kalemin birkaç katı.",
      "Yan fayda ise iletişim. Müşteriye 1:1 parçayı gösterdiğinizde tartışma, beğenmekten anlamaya kayıyor; usta ise ne beklendiğini çizimden değil elinden biliyor.",
    ],
  },
  {
    slug: "iyi-yaslanan-yapi",
    title: "İyi yaşlanan yapı",
    date: "21.06.2025",
    kind: "Deneme",
    excerpt:
      "Kamusal yapılarda dayanıklılık bir malzeme özelliği değil, bir bakım senaryosudur. Emirgan Kütüphane'de bunu nasıl kurguladığımız üzerine.",
    tone: "dusk",
    minutes: 6,
    body: [
      "Dayanıklılık genelde malzeme sayfalarında aranıyor: aşınma değerleri, garanti süreleri, test sonuçları. Oysa kamusal bir yapıda belirleyici olan, malzemenin ilk günkü performansı değil; bakımının kim tarafından, hangi sıklıkla ve hangi bütçeyle yapılacağı.",
      "Emirgan Kütüphane'de bu yüzden malzeme listesini bakım senaryosuyla birlikte kurduk. Her yüzey için üç soruya cevap verdik: kirlendiğinde nasıl temizlenir, hasar gördüğünde parça değişimi mümkün mü, on yıl sonra aynı ürün bulunabilir mi.",
      "Bu üç soru bazı tercihleri doğrudan eledi. Büyük ebatlı özel üretim paneller yerine, standart ölçüde ve stokta bulunabilen bir kaplama seçtik; zeminde ise lekelenmeyen değil, lekesi zımparayla alınabilen bir malzemede karar kıldık.",
      "Sonuç, ilk günü biraz daha alçakgönüllü ama beşinci yılı belirgin biçimde daha iyi olan bir yapı. İyi yaşlanmak, yeni kalmak değil; yıprandıkça onarılabilir olmak.",
    ],
  },
];
