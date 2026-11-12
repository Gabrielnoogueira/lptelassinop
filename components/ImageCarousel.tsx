"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type Slide = { src: string; alt: string; caption: string; /** object-position, ex.: "center 75%" */ position?: string };

type Props = {
  slides: Slide[];
  /** Conteúdo fixo sobreposto às fotos (badge, título). */
  children?: ReactNode;
  /** Tempo de cada slide, em ms. */
  interval?: number;
  className?: string;
};

/**
 * Carrossel com crossfade + zoom lento (Ken Burns). O tempo de cada slide é
 * a própria animação da barra de progresso: pausar no hover/foco é só
 * pausar a animação. Com "reduzir movimento", não troca sozinho.
 */
export default function ImageCarousel({ slides, children, interval = 5000, className = "" }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const go = (i: number) => setIndex((i + slides.length) % slides.length);
  const autoplay = !reducedMotion;

  return (
    <div
      className={`carousel media-card relative h-full min-h-[460px] ${className}`}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Fotos de produtos e fabricação"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={`carousel-slide ${i === index ? "is-active" : ""}`}
          aria-hidden={i !== index}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} de ${slides.length}`}
        >
          <div className={`carousel-zoom ${i % 2 ? "origin-tl" : "origin-br"}`}>
            <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" style={s.position ? { objectPosition: s.position } : undefined} />
          </div>
        </div>
      ))}

      <div className="scrim" />

      {/* barras de progresso, estilo stories */}
      <div className="absolute inset-x-5 top-5 z-20 flex gap-1.5">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Ver foto ${i + 1}: ${s.caption}`}
            aria-current={i === index}
            className="group h-6 flex-1 cursor-pointer py-2.5"
          >
            <span className="block h-[3px] overflow-hidden rounded-full bg-white/30 transition-colors group-hover:bg-white/50">
              <span
                key={i === index ? `on-${index}` : "off"}
                className={`carousel-bar block h-full rounded-full bg-white ${
                  i < index ? "is-done" : i === index ? (autoplay ? "is-running" : "is-done") : ""
                }`}
                style={{ animationDuration: `${interval}ms`, animationPlayState: paused ? "paused" : "running" }}
                onAnimationEnd={() => i === index && autoplay && go(index + 1)}
              />
            </span>
          </button>
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end p-7">
        {children}

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/15 pt-5">
          <p className="micro !text-neutral-200" aria-live={autoplay && !paused ? "off" : "polite"}>
            <span className="tabular text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span className="mx-2 text-white/40">/</span>
            <span key={index} className="carousel-caption inline-block">
              {slides[index].caption}
            </span>
          </p>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={() => go(index - 1)} aria-label="Foto anterior" className="carousel-nav">
              <Icon icon="solar:alt-arrow-left-linear" className="text-lg" />
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Próxima foto" className="carousel-nav">
              <Icon icon="solar:alt-arrow-right-linear" className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
