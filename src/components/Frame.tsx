import { frameStyle, swatchStyle, type Tone } from "@/lib/frames";
import clsx from "clsx";

type Props = {
  seed: string;
  tone?: Tone;
  className?: string;
  /** Reveals the caption dot + label overlay used on the featured section. */
  hotspot?: string;
  variant?: "scene" | "swatch";
  /** Unsplash foto ID'si — kareyi elle sabitlemek için (hero vb.). */
  image?: string;
  /** Metin okunurluğu için üstüne inen karartma. */
  scrim?: boolean;
  children?: React.ReactNode;
};

/**
 * Stands in for a photograph. Renders a deterministic gradient composition
 * plus a grain overlay so the flat CSS reads closer to film.
 */
export default function Frame({
  seed,
  tone,
  className,
  hotspot,
  variant = "scene",
  image,
  scrim = false,
  children,
}: Props) {
  const style =
    variant === "swatch"
      ? swatchStyle(seed, tone, image)
      : frameStyle(seed, tone, image);

  return (
    <div
      className={clsx("relative overflow-hidden grain", className)}
      style={style}
    >
      {/* Köşeleri toplayan hafif vinyet */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(125% 95% at 50% 42%, transparent 62%, rgba(0,0,0,0.18) 100%)",
        }}
      />
      {/* Üstüne metin binen karelerde okunurluk karartması */}
      {scrim && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.20) 60%, rgba(0,0,0,0.62) 100%)",
          }}
        />
      )}
      {hotspot && (
        <div className="absolute left-4 top-4 flex items-center gap-2 text-white/90 text-[11px] tracking-tight">
          <span className="h-[7px] w-[7px] rounded-full bg-white" />
          {hotspot}
        </div>
      )}
      {children}
    </div>
  );
}
