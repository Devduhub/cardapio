"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, Heart, Award } from "lucide-react";

export function PanoramicBanner() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="my-14 sm:my-20">
      {/* Container com cantos definidos simulando o recorte panorâmico */}
      <div className="relative w-full rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-[0_20px_50px_rgba(3,28,66,0.18)] border border-[#E4E7EC] min-h-[360px] sm:min-h-[420px] flex items-center justify-center">
        
        {/* Foto de fundo de alta confeitaria */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1800&q=85"
            alt="Mesa de doces artesanais e celebração"
            fill
            priority={false}
            className="object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
            sizes="100vw"
          />
          {/* Camada / Overlay Azul-Marinho Profundo Translúcido */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#031C42]/95 via-[#06295C]/85 to-[#031C42]/95" />
          
          {/* Ponto focal de iluminação suave */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, #E9C84A 0%, transparent 65%)",
            }}
          />
        </div>

        {/* Conteúdo Centralizado */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 sm:py-16 text-center text-white flex flex-col items-center">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-[#E9C84A] text-[12px] font-bold uppercase tracking-[0.16em] mb-4">
            <Sparkles size={13} className="text-[#E9C84A]" />
            <span>Tradição & Afeto em Cada Detalhe</span>
          </div>

          {/* Headline */}
          <h2 className="text-[28px] sm:text-[38px] md:text-[44px] font-semibold text-white tracking-tight leading-[1.1] mb-4">
            O sabor artesanal que transforma qualquer momento em celebração.
          </h2>

          {/* Descrição */}
          <p className="text-[15px] sm:text-[17px] text-white/85 font-normal leading-relaxed max-w-xl mb-8">
            Receitas de família, ingredientes nobres e muito carinho para que cada fatia de bolo e cada docinho seja uma memória inesquecível.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={() => scrollToSection("doces")}
              className="w-full sm:w-auto h-[50px] px-8 bg-[#E9C84A] hover:bg-[#D4B236] active:scale-[0.99] text-[#031C42] rounded-full font-semibold text-[14px] transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(233,200,74,0.35)] cursor-pointer"
            >
              <span>Ver doces artesanais</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => scrollToSection("bolos-de-festa")}
              className="w-full sm:w-auto h-[50px] px-7 bg-white/10 hover:bg-white/15 active:scale-[0.99] text-white border border-white/25 rounded-full font-medium text-[14px] transition-all duration-200 cursor-pointer"
            >
              <span>Montar bolo personalizado</span>
            </button>
          </div>

          {/* Selos de confiança na base do banner */}
          <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-[12px] text-white/70 font-medium">
            <div className="flex items-center gap-1.5">
              <Heart size={14} className="text-[#E9C84A]" />
              <span>Feito à mão com ingredientes frescos</span>
            </div>
            <span className="hidden sm:inline text-white/30">•</span>
            <div className="flex items-center gap-1.5">
              <Award size={14} className="text-[#E9C84A]" />
              <span>Confeitaria Gourmet de Alto Padrão</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
