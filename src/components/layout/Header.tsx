"use client";

import React, { useState, useEffect } from "react";
import { Search, ShoppingBag, Phone } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { Logo } from "./Logo";

interface HeaderProps {
  onOpenSearch?: () => void;
}

export function Header({ onOpenSearch }: HeaderProps) {
  const { getTotalItems, openCart } = useCartStore();
  const totalItems = getTotalItems();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full bg-[#011D4D] text-white shadow-md transition-all duration-200 ${
      isScrolled ? "h-16 md:h-20" : "h-18 md:h-22"
    }`}>
      <div className="container mx-auto px-4 h-full flex items-center justify-between gap-4 max-w-6xl">
        
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Logo variant="light" />
        </Link>


        {/* Right Actions: Search + WhatsApp + Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger */}
          <button 
            onClick={onOpenSearch}
            className="p-2 sm:px-3.5 sm:py-2 text-white/90 hover:text-[#FBF59C] bg-white/10 hover:bg-white/15 rounded-full transition-all flex items-center gap-2 border border-white/15"
            aria-label="Pesquisar no cardápio"
          >
            <Search size={18} className="text-[#FBF59C]" />
            <span className="hidden sm:inline text-xs font-medium text-white">Buscar produtos...</span>
          </button>

          {/* WhatsApp Action Mobile/Tablet */}
          <a
            href="https://wa.me/5511966026794"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex md:hidden p-2 text-white/90 hover:text-[#25D366] bg-white/10 rounded-full transition-colors border border-white/15"
            aria-label="Falar no WhatsApp"
          >
            <Phone size={18} className="text-[#25D366]" />
          </a>

          {/* Cart Button */}
          <button 
            className="relative p-2.5 bg-[#01245F] hover:bg-[#01163E] active:scale-95 border border-[#FBF59C]/30 text-white rounded-full transition-all flex items-center gap-2 px-3 sm:px-4 shadow-sm"
            aria-label="Ver pedido"
            onClick={openCart}
          >
            <ShoppingBag size={18} className="text-[#FBF59C]" />
            <span className="text-xs font-bold tracking-wider text-white">PEDIDO</span>
            {totalItems > 0 && (
              <span className="bg-[#FBF59C] text-[#011D4D] text-[11px] font-extrabold h-5 min-w-[20px] px-1 flex items-center justify-center rounded-full shadow-xs animate-in zoom-in-50">
                {totalItems}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
