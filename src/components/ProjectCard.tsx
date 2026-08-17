"use client";

import Link from "next/link";
import clsx from "clsx";
import { categoryName, type Project } from "@/lib/data";
import { useCart } from "@/lib/shortlist";
import Frame from "./Frame";

export default function ProjectCard({
  project,
  /** Shop görünümündeki "Işık" anahtarı kapalıyken akşam paletine geçer. */
  dusk = false,
  size = "M",
}: {
  project: Project;
  dusk?: boolean;
  size?: "S" | "M" | "L";
}) {
  const { has, toggle } = useCart();
  const saved = has(project.slug);

  return (
    <div className="group relative text-[12px]">
      <Link href={`/projeler/${project.slug}`} className="block overflow-hidden">
        <Frame
          seed={project.slug}
          tone={dusk ? "dusk" : project.tone}
          image={project.image}
          className={clsx(
            "transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]",
            size === "S" ? "aspect-square" : size === "L" ? "aspect-[4/5]" : "aspect-[5/6]",
          )}
        />
      </Link>

      <button
        type="button"
        onClick={() => toggle(project.slug)}
        aria-pressed={saved}
        className={clsx(
          "absolute right-2 top-2 px-2 py-1 bg-paper/85 backdrop-blur-sm transition-opacity duration-300",
          saved ? "opacity-100" : "opacity-0 group-hover:opacity-100 focus:opacity-100",
        )}
      >
        {saved ? "Listede ✓" : "Listeye Ekle"}
      </button>

      <Link href={`/projeler/${project.slug}`} className="block mt-2">
        <p className="entry-title u-link inline-block">
          {project.title}, {categoryName(project.category)}
          {project.isNew && <span className="count">Yeni</span>}
        </p>
        <p className="entry-meta">{project.location}</p>
      </Link>
    </div>
  );
}
