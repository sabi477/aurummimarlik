/**
 * Proje konumlarının kaba koordinatları.
 *
 * Haritada yalnızca semtin merkezini işaretlemek için kullanılıyor; bina
 * adresi değil. Anahtar, projedeki `location` alanının kendisi.
 */
export type LatLng = { lat: number; lng: number };

export const PLACES: Record<string, LatLng> = {
  "Ayvalık, Balıkesir": { lat: 39.3167, lng: 26.6944 },
  "Üsküdar, İstanbul": { lat: 41.0225, lng: 29.0156 },
  "Çeşme, İzmir": { lat: 38.3239, lng: 26.3061 },
  "Beyoğlu, İstanbul": { lat: 41.0369, lng: 28.977 },
  "Sarıyer, İstanbul": { lat: 41.1669, lng: 29.0575 },
  "Urla, İzmir": { lat: 38.3225, lng: 26.7647 },
  "Bodrum, Muğla": { lat: 37.0344, lng: 27.4305 },
  "Beykoz, İstanbul": { lat: 41.125, lng: 29.095 },
  "Kadıköy, İstanbul": { lat: 40.9903, lng: 29.027 },
  "Datça, Muğla": { lat: 36.7275, lng: 27.687 },
  "Şişli, İstanbul": { lat: 41.0602, lng: 28.9877 },
  "Şile, İstanbul": { lat: 41.1758, lng: 29.6125 },
  "Beşiktaş, İstanbul": { lat: 41.043, lng: 29.0075 },
  "Fatih, İstanbul": { lat: 41.0186, lng: 28.9397 },
  "Seferihisar, İzmir": { lat: 38.1975, lng: 26.8386 },
  "Foça, İzmir": { lat: 38.6697, lng: 26.7578 },
  "Çankaya, Ankara": { lat: 39.9077, lng: 32.8622 },
  "Gökçeada, Çanakkale": { lat: 40.1919, lng: 25.9053 },
  "Salihli, Manisa": { lat: 38.4818, lng: 28.14 },
  "Şehzadeler, Manisa": { lat: 38.6191, lng: 27.4289 },
  "Alaşehir, Manisa": { lat: 38.3489, lng: 28.5183 },
};

/** Konum dizgisinden koordinat; bilinmiyorsa ilin merkezine düşüyor. */
export function coordsFor(location: string): LatLng | undefined {
  const exact = PLACES[location];
  if (exact) return exact;

  const province = location.split(",").pop()?.trim();
  if (!province) return undefined;

  const key = Object.keys(PLACES).find((k) => k.endsWith(`, ${province}`));
  return key ? PLACES[key] : undefined;
}

/** Web Mercator: koordinat → kesirli döşeme numarası. */
export function toTile({ lat, lng }: LatLng, zoom: number) {
  const n = 2 ** zoom;
  const x = ((lng + 180) / 360) * n;
  const rad = (lat * Math.PI) / 180;
  const y =
    ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * n;
  return { x, y };
}
