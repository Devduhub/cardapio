"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export function FloatingDecor() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1 based on viewport center
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!mounted) return null;

  // Parallax offsets (smooth multipliers)
  const brig1Y = scrollY * 0.08 + mousePos.y * 18;
  const brig1X = mousePos.x * 16;

  const strawY = scrollY * -0.06 + mousePos.y * -14;
  const strawX = mousePos.x * -18;

  const brig2Y = scrollY * 0.05 + mousePos.y * 12;
  const brig2X = mousePos.x * 14;

  return (
    <div
      className="hidden xl:block fixed inset-0 pointer-events-none z-20 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Brigadeiro Gourmet Flutuante Superior (Lado Esquerdo) */}
      <div
        style={{
          transform: `translate3d(${brig1X}px, ${brig1Y}px, 0) rotate(${mousePos.x * 8}deg)`,
          transition: "transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
        className="absolute left-4 2xl:left-12 top-[280px] w-24 h-24 2xl:w-28 2xl:h-28 opacity-90 drop-shadow-[0_12px_24px_rgba(0,0,0,0.14)]"
      >
        <div className="relative w-full h-full animate-[float_6s_ease-in-out_infinite]">
          <Image
            src="/decor/brigadeiro.png"
            alt=""
            fill
            className="object-contain"
            sizes="120px"
          />
        </div>
      </div>

      {/* 2. Morango Roupado Fresco (Lado Direito) */}
      <div
        style={{
          transform: `translate3d(${strawX}px, ${strawY}px, 0) rotate(${mousePos.x * -10}deg)`,
          transition: "transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
        className="absolute right-4 2xl:right-12 top-[620px] w-24 h-24 2xl:w-28 2xl:h-28 opacity-95 drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
      >
        <div className="relative w-full h-full animate-[float_7s_ease-in-out_infinite_1s]">
          <Image
            src="/decor/morango.png"
            alt=""
            fill
            className="object-contain"
            sizes="120px"
          />
        </div>
      </div>

      {/* 3. Mini Brigadeiro Flutuante Inferior (Lado Esquerdo Médio) */}
      <div
        style={{
          transform: `translate3d(${brig2X}px, ${brig2Y}px, 0) rotate(${mousePos.x * 12}deg)`,
          transition: "transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
        className="absolute left-6 2xl:left-14 top-[1250px] w-18 h-18 2xl:w-22 2xl:h-22 opacity-80 blur-[0.4px] drop-shadow-[0_8px_18px_rgba(0,0,0,0.10)]"
      >
        <div className="relative w-full h-full animate-[float_8s_ease-in-out_infinite_2s]">
          <Image
            src="/decor/brigadeiro.png"
            alt=""
            fill
            className="object-contain"
            sizes="90px"
          />
        </div>
      </div>
    </div>
  );
}
