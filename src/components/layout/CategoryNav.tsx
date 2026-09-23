"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Cake,
  Gift,
  Cookie,
  UtensilsCrossed,
  Coffee,
  CakeSlice,
  Award,
  Sparkles,
  PartyPopper,
} from "lucide-react";

const CATEGORIES = [
  { id: "kits-festa-destaque", name: "Kits em Destaque", icon: Sparkles },
  { id: "bolos-de-festa", name: "Bolos de Festa", icon: Cake },
  { id: "doces", name: "Doces", icon: Cookie },
  { id: "salgados", name: "Salgados", icon: UtensilsCrossed },
  { id: "kits-festa", name: "Kits & Caixas", icon: Gift },
  { id: "bolos-caseiros", name: "Bolos Caseiros", icon: Coffee },
  { id: "tortas", name: "Tortas", icon: CakeSlice },
  { id: "pudim", name: "Pudim", icon: Award },
  { id: "travessas", name: "Travessas", icon: Sparkles },
  { id: "descartaveis", name: "Complete sua Festa", icon: PartyPopper },
];

export function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState<string>("kits-festa-destaque");
  const scrollContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (let i = CATEGORIES.length - 1; i >= 0; i--) {
        const section = document.getElementById(CATEGORIES[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveCategory(CATEGORIES[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 145;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav 
      aria-label="Navegação por categorias"
      className="sticky top-[74px] md:top-[80px] z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#E4E7EC] shadow-[0_1px_2px_rgba(16,24,40,0.03)]"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <ul
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide py-3 gap-2 sm:gap-2.5 items-center md:justify-center"
        >
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <li key={category.id} className="whitespace-nowrap shrink-0">
                <button
                  type="button"
                  onClick={() => handleCategoryClick(category.id)}
                  className={`relative h-[42px] px-4 rounded-full text-[13px] md:text-[14px] font-medium transition-all duration-200 border flex items-center gap-2 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06295C] ${
                    isActive
                      ? "bg-[#06295C] text-white border-[#06295C] shadow-xs font-semibold"
                      : "bg-white text-[#101828] border-[#E4E7EC] hover:bg-[#F8F9FB] hover:border-[#D0D5DD] hover:text-[#06295C]"
                  }`}
                >
                  <Icon
                    size={16}
                    className={`transition-colors shrink-0 ${
                      isActive ? "text-[#E9C84A]" : "text-[#667085]"
                    }`}
                  />
                  <span>{category.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E9C84A] shrink-0" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
