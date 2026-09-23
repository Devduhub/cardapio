"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, Award, Clock } from "lucide-react";

export function Hero() {
  const scrollToMenu = () => {
    const element = document.getElementById("kits-festa-destaque") || document.getElementById("bolos-de-festa");
    if (element) {
      const offset = 130;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToCakes = () => {
    const element = document.getElementById("bolos-de-festa");
    if (element) {
      const offset = 130;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#031C42] text-white">
      {/* Subtle warm ambient glow behind the photo */}
      <div 
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #E9C84A 0%, rgba(6,41,92,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-[540px] lg:min-h-[600px]">
          
          {/* Col 1: Editorial Content (58% desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#E9C84A]">
                Alta Confeitaria
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E9C84A]" />
              <span className="text-[12px] font-medium text-white/60 tracking-wider">
                Desde 2014
              </span>
            </div>

            {/* Headline Principal */}
            <h1 className="text-[36px] sm:text-[46px] md:text-[54px] lg:text-[58px] font-semibold text-white leading-[1.04] tracking-[-0.02em] mb-5 sm:mb-6 max-w-2xl">
              Momentos especiais merecem{" "}
              <span className="text-[#E9C84A]">sabores inesquecíveis.</span>
            </h1>

            {/* Descrição Refinada */}
            <p className="text-[16px] sm:text-[18px] text-[#E4E7EC] font-normal leading-[1.6] max-w-xl mb-8 sm:mb-10 text-white/85">
              Bolos artesanais, doces finos, salgados crocantes e kits completos
              preparados com ingredientes nobres para transformar sua celebração em um
              momento memorável.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8 sm:mb-10">
              <button
                onClick={scrollToMenu}
                className="h-[52px] sm:h-[54px] px-8 bg-[#E9C84A] hover:bg-[#D4B236] active:scale-[0.99] text-[#031C42] rounded-full font-semibold text-[15px] transition-all duration-200 flex items-center justify-center gap-2.5 shadow-[0_4px_14px_rgba(233,200,74,0.30)] group cursor-pointer"
              >
                <span>Ver cardápio</span>
                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

              <button
                onClick={scrollToCakes}
                className="h-[52px] sm:h-[54px] px-7 bg-white/5 hover:bg-white/10 active:scale-[0.99] text-white border border-white/20 hover:border-white/40 rounded-full font-medium text-[15px] transition-all duration-200 flex items-center justify-center cursor-pointer"
              >
                <span>Montar meu pedido</span>
              </button>
            </div>

            {/* Linha de Confiança */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-y-2 gap-x-4 text-[13px] text-white/70">
              <div className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#E9C84A]" />
                <span>Produção artesanal</span>
              </div>
              <span className="text-white/30 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <Award size={14} className="text-[#E9C84A]" />
                <span>Encomendas personalizadas</span>
              </div>
              <span className="text-white/30 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#E9C84A]" />
                <span>Feito para celebrar</span>
              </div>
            </div>
          </div>

          {/* Col 2: Gastronomic Photographic Composition (42% desktop) */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-full max-w-[480px] lg:max-w-none">
              
              {/* Main Photograph: Premium Celebration Cake */}
              <div className="relative w-full aspect-[4/4] sm:aspect-[4/4] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.45)] border border-white/15">
                <Image
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
                  alt="Bolo artesanal decorado Jeny Confeitaria Gourmet"
                  fill
                  priority
                  className="object-cover object-center transform hover:scale-[1.03] transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031C42]/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Secondary Overlapping Thumbnail: Gourmet Sweets (Desktop & Tablet) */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 w-36 h-36 md:w-44 md:h-44 rounded-[20px] md:rounded-[24px] overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.40)] border-2 border-white/20 bg-[#06295C]">
                <Image
                  src="https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=400&q=80"
                  alt="Docinhos gourmet artesanais para festa"
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </div>

              {/* Floating Badge: Discreet Customer Endorsement */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/90 backdrop-blur-md text-[#031C42] px-3.5 py-2 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.18)] flex items-center gap-2 border border-white/40">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                <span className="text-[12px] font-semibold tracking-wide">
                  Alta Confeitaria Artesanal
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
