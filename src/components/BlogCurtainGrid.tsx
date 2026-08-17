"use client";

import Link from "next/link";
import Frame from "./Frame";
import Reveal from "./Reveal";
import {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealDescription,
  CardCurtainRevealFooter,
  CardCurtainRevealTitle,
} from "./CardCurtainReveal";
import { postHref, type Post } from "@/lib/data";

/**
 * Blog kartları.
 *
 * Durağan halde kare yalnızca fotoğraf ve künye satırı; üzerine gelindiğinde
 * altta koyu bir panel ortadan iki yana açılıyor, başlık aşağıdan yükselip
 * özet metni onunla birlikte geliyor.
 */
export default function BlogCurtainGrid({ posts }: { posts: Post[] }) {
  return (
    // Mobilde kartlar alt alta değil, yan yana kayan bir şerit hâlinde.
    <div className="flex md:grid md:grid-cols-3 gap-4 px-4 md:px-5 overflow-x-auto md:overflow-visible no-bar snap-x snap-mandatory scroll-px-4">
      {posts.map((post, i) => (
        <Reveal
          key={post.slug}
          delay={i * 0.07}
          className="shrink-0 snap-start w-[76vw] md:w-auto"
        >
          <Link href={postHref(post)} className="block">
            <CardCurtainReveal className="h-[380px] md:h-[440px]">
              {/* Fotoğraf kartı boydan boya dolduruyor; perde onun üstünde.
                  Konum sarmalayıcıda: Frame'in kendi kökü `relative`. */}
              <div className="absolute inset-0">
                <Frame
                  seed={`gunluk-${post.slug}`}
                  tone={post.tone}
                  className="h-full w-full"
                />
              </div>

              <CardCurtainRevealBody className="relative flex flex-col justify-end">
                {/* Perde: gövdenin alt yarısını kaplayan koyu panel */}
                {/* Panel opak değil: arkasındaki fotoğrafı bulanıklaştırıp
                    üstüne ince bir karartma koyuyor — metin okunur kalıyor. */}
                <CardCurtainRevealFooter className="backdrop-blur-md bg-ink/35 text-paper px-5 pt-5 pb-6">
                  <div className="overflow-hidden">
                    <CardCurtainRevealTitle className="display text-[20px] md:text-[22px] leading-[1.15]">
                      {post.title}
                    </CardCurtainRevealTitle>
                  </div>
                  <CardCurtainRevealDescription className="mt-3 text-[13px] leading-[1.6] text-paper/80">
                    <p>{post.excerpt}</p>
                  </CardCurtainRevealDescription>
                </CardCurtainRevealFooter>
              </CardCurtainRevealBody>
            </CardCurtainReveal>
          </Link>

          {/* Künye kartın dışında, her zaman okunur. */}
          <p className="entry-title mt-3 u-link inline-block">{post.title}</p>
          <p className="entry-meta">
            {post.kind} · {post.date}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
