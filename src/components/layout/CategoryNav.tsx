"use client";

import React, { useState, useEffect, useRef } from "react";

const CATEGORIES = [
  { id: "bolos-de-festa", name: "🎂 Bolos de Festa" },
  { id: "kits-festa", name: "🎁 Kits Festa" },
  { id: "doces", name: "🍬 Doces" },
  { id: "salgados", name: "🥐 Salgados" },
  { id: "bolos-caseiros", name: "🍰 Bolos Caseiros" },
  { id: "tortas", name: "🥧 Tortas" },
  { id: "pudim", name: "🍮 Pudim" },
  { id: "travessas", name: "✨ Travessas" },
  { id: "descartaveis", name: "🎉 Complete sua festa" },
];

export function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const scrollContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

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
      const offset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="sticky top-16 md:top-20 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[rgba(1,29,77,0.14)] shadow-xs">
      <div className="container mx-auto max-w-6xl">
        <ul 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide px-4 py-2.5 gap-2 items-center"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <li key={category.id} className="whitespace-nowrap flex-shrink-0">
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 border flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-[#011D4D] text-white border-[#011D4D] shadow-xs font-semibold"
                      : "bg-white text-[#011D4D] border-[rgba(1,29,77,0.15)] hover:bg-[#F0F4FA] hover:border-[#011D4D]/30"
                  }`}
                >
                  <span>{category.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FBF59C] inline-block ml-0.5 animate-pulse" />
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
