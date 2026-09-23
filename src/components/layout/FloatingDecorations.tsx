"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface FloatingItemConfig {
  id: string;
  src: string;
  alt: string;
  position: {
    top: number;
    left?: number | string;
    right?: number | string;
  };
  size: number;
  parallaxSpeed: number; // e.g. 0.08, -0.05
  rotation: number; // base rotation in degrees
  opacity: number;
  floatDuration?: number;
  floatDelay?: number;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
}

const DEFAULT_DECORATIONS: FloatingItemConfig[] = [
  // 1. Entre Hero e Kits Festa (Lado Esquerdo)
  {
    id: "decor-brigadeiro-1",
    src: "/decorations/brigadeiro.webp",
    alt: "Brigadeiro gourmet artesanal",
    position: { top: 740, left: "-15px" },
    size: 95,
    parallaxSpeed: 0.07,
    rotation: 3,
    opacity: 0.92,
    floatDuration: 6.5,
    floatDelay: 0,
    hideOnMobile: true,
    hideOnTablet: false,
  },
  // 2. Seção Kits Festa (Lado Direito)
  {
    id: "decor-leaf-1",
    src: "/decorations/leaf-01.webp",
    alt: "Folha delicada de hortelã",
    position: { top: 1280, right: "12px" },
    size: 68,
    parallaxSpeed: -0.05,
    rotation: -4,
    opacity: 0.65,
    floatDuration: 7.2,
    floatDelay: 1.2,
    hideOnMobile: true,
    hideOnTablet: true,
  },
  // 3. Seção Bolos de Festa (Lado Esquerdo)
  {
    id: "decor-macaron-1",
    src: "/decorations/macaron.webp",
    alt: "Macaron artesanal de baunilha",
    position: { top: 1920, left: "16px" },
    size: 88,
    parallaxSpeed: 0.08,
    rotation: -2,
    opacity: 0.88,
    floatDuration: 6.8,
    floatDelay: 2.1,
    hideOnMobile: true,
    hideOnTablet: false,
  },
  // 4. Seção Doces / Antes do Banner (Lado Direito)
  {
    id: "decor-strawberry-1",
    src: "/decorations/strawberry.webp",
    alt: "Morango fresco selecionado",
    position: { top: 2680, right: "-12px" },
    size: 100,
    parallaxSpeed: -0.07,
    rotation: 4,
    opacity: 0.92,
    floatDuration: 7.5,
    floatDelay: 0.8,
    hideOnMobile: true,
    hideOnTablet: false,
  },
  // 5. Seção Salgados para Festa (Lado Esquerdo)
  {
    id: "decor-raspberry-1",
    src: "/decorations/raspberry.webp",
    alt: "Framboesa fresca de alta confeitaria",
    position: { top: 3450, left: "-10px" },
    size: 82,
    parallaxSpeed: 0.06,
    rotation: -3,
    opacity: 0.85,
    floatDuration: 6.2,
    floatDelay: 1.8,
    hideOnMobile: true,
    hideOnTablet: true,
  },
  // 6. Seção Kits & Caixas Presente (Lado Direito)
  {
    id: "decor-brigadeiro-2",
    src: "/decorations/brigadeiro.webp",
    alt: "Brigadeiro gourmet com confeitos",
    position: { top: 4250, right: "18px" },
    size: 78,
    parallaxSpeed: -0.06,
    rotation: 2,
    opacity: 0.86,
    floatDuration: 7.0,
    floatDelay: 2.5,
    hideOnMobile: true,
    hideOnTablet: false,
  },
  // 7. Seção Sobremesas & Pudim (Lado Esquerdo)
  {
    id: "decor-leaf-2",
    src: "/decorations/leaf-01.webp",
    alt: "Folha botânica de confeitaria",
    position: { top: 5050, left: "20px" },
    size: 62,
    parallaxSpeed: 0.05,
    rotation: 4,
    opacity: 0.60,
    floatDuration: 7.8,
    floatDelay: 0.5,
    hideOnMobile: true,
    hideOnTablet: true,
  },
  // 8. Seção Travessas / Pré-CTA Final (Lado Direito)
  {
    id: "decor-macaron-2",
    src: "/decorations/macaron.webp",
    alt: "Macaron gourmet",
    position: { top: 5750, right: "-8px" },
    size: 84,
    parallaxSpeed: -0.05,
    rotation: -3,
    opacity: 0.84,
    floatDuration: 6.6,
    floatDelay: 1.5,
    hideOnMobile: true,
    hideOnTablet: false,
  },
];

interface FloatingItemProps {
  config: FloatingItemConfig;
  itemRef: (el: HTMLDivElement | null) => void;
}

export function FloatingItem({ config, itemRef }: FloatingItemProps) {
  const {
    id,
    src,
    alt,
    position,
    size,
    rotation,
    opacity,
    floatDuration = 7,
    floatDelay = 0,
    hideOnMobile = true,
    hideOnTablet = false,
  } = config;

  return (
    <div
      ref={itemRef}
      id={id}
      style={{
        top: `${position.top}px`,
        ...(position.left !== undefined ? { left: position.left } : {}),
        ...(position.right !== undefined ? { right: position.right } : {}),
        width: `${size}px`,
        height: `${size}px`,
        opacity,
        willChange: "transform",
      }}
      className={`absolute select-none pointer-events-none ${
        hideOnMobile ? "hidden md:block" : ""
      } ${hideOnTablet ? "md:hidden xl:block" : ""}`}
    >
      {/* Sub-container with subtle organic floating keyframe */}
      <div
        style={{
          animation: `float ${floatDuration}s ease-in-out infinite`,
          animationDelay: `${floatDelay}s`,
        }}
        className="relative w-full h-full drop-shadow-[0_8px_20px_rgba(3,28,66,0.10)]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          loading="lazy"
          className="object-contain transform"
          style={{ transform: `rotate(${rotation}deg)` }}
          sizes={`${size}px`}
        />
      </div>
    </div>
  );
}

interface FloatingDecorationsProps {
  items?: FloatingItemConfig[];
}

export function FloatingDecorations({ items = DEFAULT_DECORATIONS }: FloatingDecorationsProps) {
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;

      elementsRef.current.forEach((el, index) => {
        if (!el) return;
        const config = items[index];
        if (!config) return;

        // Relative delta from the item's top position for natural localized parallax
        const delta = scrollY - config.position.top + 400;
        const translateY = delta * config.parallaxSpeed;
        const microRotate = config.rotation + delta * 0.002;

        // Apply via direct DOM transform (bypasses React setState for solid 60/120fps)
        el.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) rotate(${microRotate.toFixed(1)}deg)`;
      });

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial calculation on mount
    updateParallax();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 bottom-0 pointer-events-none overflow-hidden z-[5] select-none"
    >
      {items.map((item, index) => (
        <FloatingItem
          key={item.id}
          config={item}
          itemRef={(el) => {
            elementsRef.current[index] = el;
          }}
        />
      ))}
    </div>
  );
}
