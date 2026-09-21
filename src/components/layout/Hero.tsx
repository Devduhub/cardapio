"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToMenu = () => {
    const element = document.getElementById("bolos-de-festa");
    if (element) {
      const offset = 130;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#011D4D] text-white">
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Minimalist Sub-heading */}
        <span 
          className={`text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-[#E8D777] mb-6 transition-all duration-1000 transform ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Alta Confeitaria
        </span>

        {/* Elegant Typography Title */}
        <h1 
          className={`font-heading text-4xl sm:text-5xl md:text-7xl font-normal text-white mb-8 leading-[1.1] max-w-4xl transition-all duration-1000 delay-100 transform ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Momentos especiais <br className="hidden md:block" />
          <span className="italic text-[#FBF59C]">merecem sabores inesquecíveis.</span>
        </h1>

        {/* Clean Subtitle */}
        <p 
          className={`text-white/70 text-sm md:text-lg font-light max-w-xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-200 transform ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Bolos de festa, doces artesanais e salgados preparados com excelência, ingredientes nobres e design refinado.
        </p>
        
        {/* Minimalist Button */}
        <button 
          onClick={scrollToMenu}
          className={`group flex items-center gap-3 px-8 py-4 bg-transparent border border-[#E8D777]/50 text-[#FBF59C] rounded-full font-medium text-sm transition-all duration-300 hover:bg-[#E8D777] hover:text-[#011D4D] hover:border-[#E8D777] delay-300 transform ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span>Ver cardápio</span>
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>

      </div>
    </section>
  );
}
