import { coordsFor, toTile } from "@/lib/geo";

/**
 * Projenin konumu — siyah beyaz, etiketleri seyrek bir harita.
 *
 * Harita kütüphanesi yok: koordinat Web Mercator ile döşeme numarasına
 * çevriliyor ve merkezdeki döşemenin etrafına bir ızgara diziliyor. Kareler
 * CARTO'nun etiketsiz açık temasından geliyor; gri tonlama ve kontrast CSS
 * ile veriliyor, böylece sitenin kâğıt tonuyla aynı sessizlikte duruyor.
 */
const TILE = 256;
const COLS = 9;
const ROWS = 5;
const ZOOM = 12;

export default function LocationMap({
  location,
  className,
}: {
  location: string;
  className?: string;
}) {
  const point = coordsFor(location);
  if (!point) return null;

  const { x, y } = toTile(point, ZOOM);
  const cx = Math.floor(x);
  const cy = Math.floor(y);
  // İşaretin tam ortada durması için merkez döşemenin içindeki kayma.
  const offsetX = (x - cx) * TILE;
  const offsetY = (y - cy) * TILE;

  const half = { c: (COLS - 1) / 2, r: (ROWS - 1) / 2 };

  return (
    <section className={className}>
      <div className="flex items-baseline justify-between px-4 md:px-5 text-[12px]">
        <p className="label">Konum</p>
        <p className="label">{location}</p>
      </div>

      <div className="mt-4 relative h-[320px] md:h-[420px] overflow-hidden bg-paper-2">
        {/* Döşeme ızgarası — merkez döşeme ekranın ortasına oturuyor */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 grayscale contrast-[1.08] brightness-[1.02] opacity-90"
          style={{
            width: COLS * TILE,
            height: ROWS * TILE,
            marginLeft: -(half.c * TILE + offsetX),
            marginTop: -(half.r * TILE + offsetY),
          }}
        >
          {Array.from({ length: ROWS }).map((_, r) =>
            Array.from({ length: COLS }).map((_, c) => {
              const tx = cx + c - half.c;
              const ty = cy + r - half.r;
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={`${tx}-${ty}`}
                  src={`https://basemaps.cartocdn.com/light_nolabels/${ZOOM}/${tx}/${ty}.png`}
                  alt=""
                  width={TILE}
                  height={TILE}
                  loading="lazy"
                  className="absolute block max-w-none"
                  style={{ left: c * TILE, top: r * TILE }}
                />
              );
            }),
          )}
        </div>

        {/* Kenarları kâğıda bağlayan yumuşak geçiş */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 50%, transparent 45%, var(--paper) 100%)",
          }}
        />

        {/* İşaret */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="block w-3 h-3 rounded-full bg-ink" />
          <span className="absolute inset-0 -m-3 rounded-full border border-ink/40" />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2 px-4 md:px-5">
        <p className="label">
          {point.lat.toFixed(4)}° K · {point.lng.toFixed(4)}° D
        </p>
        <p className="label opacity-60">© OpenStreetMap · CARTO</p>
      </div>
    </section>
  );
}
