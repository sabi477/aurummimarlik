"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import clsx from "clsx";

/**
 * Perde açılışlı kart.
 *
 * Kart üzerine gelindiğinde içerik ortadan iki yana açılan bir perdeyle
 * beliriyor: `clip-path` iki kenardan genişliyor, başlık aşağıdan yukarı
 * kayıyor. Parçalar ayrı ayrı dışa veriliyor ki her kullanım kendi
 * yerleşimini kurabilsin; açık/kapalı durumu bağlam üzerinden paylaşılıyor.
 *
 * Kaynak: shadcn tarzı "card curtain reveal" kalıbı; buradaki sürüm projenin
 * kendi bağımlılıklarına (framer-motion + clsx) uyarlandı.
 */
const curtainVariants: Variants = {
  visible: {
    clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
    transition: { duration: 0.4, ease: [0.25, 1, 0.3, 1] },
  },
  hidden: {
    clipPath: "polygon(50% 0,50% 0,50% 100%,50% 100%)",
    transition: { duration: 0.3, ease: [0.25, 1, 0.3, 1] },
  },
};

type ContextValue = { isMouseIn: boolean };

const CardCurtainRevealContext = React.createContext<ContextValue | undefined>(
  undefined,
);

function useCardCurtainReveal() {
  const context = React.useContext(CardCurtainRevealContext);
  if (!context) {
    throw new Error(
      "CardCurtainReveal parçaları yalnızca <CardCurtainReveal> içinde kullanılabilir.",
    );
  }
  return context;
}

const CardCurtainReveal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const [isMouseIn, setIsMouseIn] = React.useState(false);

  return (
    <CardCurtainRevealContext.Provider value={{ isMouseIn }}>
      <div
        ref={ref}
        className={clsx("relative flex flex-col overflow-hidden", className)}
        onMouseEnter={() => setIsMouseIn(true)}
        onMouseLeave={() => setIsMouseIn(false)}
        // Dokunmatikte hover yok; odak da perdeyi açıyor.
        onFocus={() => setIsMouseIn(true)}
        onBlur={() => setIsMouseIn(false)}
        {...props}
      >
        {children}
      </div>
    </CardCurtainRevealContext.Provider>
  );
});
CardCurtainReveal.displayName = "CardCurtainReveal";

const CardCurtainRevealBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={clsx("relative flex-1", className)} {...props} />
));
CardCurtainRevealBody.displayName = "CardCurtainRevealBody";

const CardCurtainRevealTitle = React.forwardRef<
  HTMLHeadingElement,
  HTMLMotionProps<"h3">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainReveal();

  return (
    <motion.h3
      ref={ref}
      className={className}
      initial={false}
      animate={isMouseIn ? { y: 0 } : { y: 120 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    />
  );
});
CardCurtainRevealTitle.displayName = "CardCurtainRevealTitle";

const CardCurtainRevealDescription = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainReveal();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={curtainVariants}
      initial={false}
      animate={isMouseIn ? "visible" : "hidden"}
      {...props}
    />
  );
});
CardCurtainRevealDescription.displayName = "CardCurtainRevealDescription";

const CardCurtainRevealFooter = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainReveal();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={curtainVariants}
      initial={false}
      animate={isMouseIn ? "visible" : "hidden"}
      {...props}
    />
  );
});
CardCurtainRevealFooter.displayName = "CardCurtainRevealFooter";

/** Gövdenin üstünü kapatan, üzerine gelindiğinde açılan perde. */
const CardCurtain = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => {
    const { isMouseIn } = useCardCurtainReveal();

    return (
      <motion.div
        ref={ref}
        className={clsx("pointer-events-none absolute inset-0", className)}
        variants={curtainVariants}
        initial={false}
        animate={isMouseIn ? "visible" : "hidden"}
        {...props}
      />
    );
  },
);
CardCurtain.displayName = "CardCurtain";

export {
  CardCurtain,
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealDescription,
  CardCurtainRevealFooter,
  CardCurtainRevealTitle,
};
