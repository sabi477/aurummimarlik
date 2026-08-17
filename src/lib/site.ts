/**
 * Sitenin yayına çıkacağı adres.
 *
 * Yayın ortamında `NEXT_PUBLIC_SITE_URL` tanımlanır (ör. Vercel'de proje
 * ayarlarından); tanımsızsa yerel geliştirme adresine düşer. Kanonik
 * bağlantılar, site haritası ve robots dosyası bu değerden üretiliyor.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");
