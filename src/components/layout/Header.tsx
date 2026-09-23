"use client";

import React, { useState, useEffect } from "react";
import { Search, ShoppingBag, Phone, Sparkles } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useSearchStore } from "@/store/useSearchStore";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "Cardápio", href: "#bolos-de-festa" },
  { label: "Kits Festa", href: "#kits-festa-destaque" },
  { label: "Bolos", href: "#bolos-de-festa" },
  { label: "Doces", href: "#doces" },
  { label: "Salgados", href: "#salgados" },
];

interface HeaderProps {
  onOpenSearch?: () => void;
}

export function Header({ onOpenSearch }: HeaderProps) {
  const { getTotalItems, openCart } = useCartStore();
  const { openSearch } = useSearchStore();
  const totalItems = getTotalItems();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
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

  const handleSearchTrigger = () => {
    if (onOpenSearch) {
      onOpenSearch();
    } else {
      openSearch();
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(16,24,40,0.06)] border-b border-[#E4E7EC]"
          : "bg-white border-b border-[#E4E7EC]"
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-[74px] md:h-[80px] flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06295C] rounded-lg"
          aria-label="Jeny Confeitaria Gourmet - Início"
        >
          <Logo variant="dark" className="h-10 md:h-12" />
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav
          aria-label="Navegação rápida"
          className="hidden lg:flex items-center gap-7 text-[14px] font-medium text-[#667085]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-[#06295C] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#06295C] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Search + WhatsApp + Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Refined Search Trigger (Desktop & Mobile) */}
          <div className="relative">
            <button
              onClick={handleSearchTrigger}
              className="group flex items-center gap-2.5 h-10 sm:h-11 px-3 sm:px-4 bg-[#F8F9FB] hover:bg-[#FAF7F0] border border-[#E4E7EC] hover:border-[#D0D5DD] rounded-full text-[#667085] hover:text-[#101828] transition-all text-xs sm:text-sm font-normal w-10 sm:w-[220px] md:w-[260px] justify-center sm:justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06295C]"
              aria-label="Buscar produtos no cardápio"
            >
              <Search
                size={16}
                className="text-[#667085] group-hover:text-[#06295C] shrink-0 transition-colors"
              />
              <span className="hidden sm:inline truncate">Buscar produtos...</span>
              <kbd className="hidden md:inline-flex ml-auto text-[10px] uppercase font-semibold text-[#98A2B3] bg-white border border-[#E4E7EC] px-1.5 py-0.5 rounded shadow-2xs">
                /
              </kbd>
            </button>
          </div>

          {/* WhatsApp Action */}
          <a
            href="https://wa.me/5511966026794"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 text-[#101828] hover:text-[#16A34A] bg-[#F8F9FB] hover:bg-[#F0FDF4] border border-[#E4E7EC] hover:border-[#BBF7D0] rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]"
            aria-label="Atendimento via WhatsApp"
            title="Tirar dúvidas no WhatsApp"
          >
            <Phone size={17} />
          </a>

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="relative h-10 sm:h-11 px-3.5 sm:px-5 bg-[#06295C] hover:bg-[#031C42] active:scale-[0.98] text-white rounded-full transition-all flex items-center gap-2.5 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06295C] focus-visible:ring-offset-2"
            aria-label="Ver meu pedido"
          >
            <ShoppingBag size={17} className="text-[#E9C84A]" />
            <span className="text-[13px] sm:text-[14px] font-semibold tracking-wide">
              Meu Pedido
            </span>
            {mounted && totalItems > 0 && (
              <span className="bg-[#E9C84A] text-[#031C42] text-[11px] font-bold h-5 min-w-[20px] px-1.5 flex items-center justify-center rounded-full shadow-2xs animate-in zoom-in-50">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
