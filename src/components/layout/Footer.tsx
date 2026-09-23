"use client";

import React from "react";
import { Phone, MapPin, Clock, CreditCard, ChevronRight, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";

const FOOTER_CATEGORIES = [
  { id: "kits-festa-destaque", name: "Kits em Destaque" },
  { id: "bolos-de-festa", name: "Bolos de Festa" },
  { id: "doces", name: "Doces Artesanais" },
  { id: "salgados", name: "Salgados para Festa" },
  { id: "bolos-caseiros", name: "Bolos Caseiros" },
  { id: "tortas", name: "Tortas Gourmet" },
  { id: "pudim", name: "Pudim Artesanal" },
  { id: "travessas", name: "Sobremesas na Travessa" },
  { id: "descartaveis", name: "Complete sua Festa" },
];

export function Footer() {
  const scrollToSection = (id: string) => {
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
    <footer className="bg-[#031C42] text-white pt-14 pb-24 sm:pb-16 border-t border-white/10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-4">
            <Logo variant="light" className="h-10 md:h-12" />
            <p className="text-white/75 text-[14px] leading-relaxed max-w-sm">
              Confeitaria artesanal contemporânea. Bolos de festa personalizados, doces finos, salgados sequinhos e kits completos preparados com ingredientes nobres para tornar cada momento inesquecível.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#E9C84A] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E9C84A]" />
                Alta Confeitaria Artesanal
              </span>
            </div>
          </div>

          {/* Col 2: Cardápio (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-start space-y-3">
            <h4 className="font-semibold text-[15px] text-[#E9C84A] tracking-wider uppercase">
              Cardápio
            </h4>
            <ul className="space-y-2 text-[13px] text-white/80 w-full">
              {FOOTER_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => scrollToSection(cat.id)}
                    className="hover:text-white transition-colors flex items-center gap-1.5 text-left py-0.5 group cursor-pointer"
                  >
                    <ChevronRight size={13} className="text-[#E9C84A] group-hover:translate-x-0.5 transition-transform" />
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Atendimento (2.5 cols) */}
          <div className="lg:col-span-3 flex flex-col items-start space-y-3">
            <h4 className="font-semibold text-[15px] text-[#E9C84A] tracking-wider uppercase">
              Atendimento
            </h4>
            <div className="space-y-3 text-[13px] text-white/80 w-full">
              <a
                href="https://wa.me/5511966026794"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-[#16A34A]/20 flex items-center justify-center text-[#25D366] shrink-0">
                  <MessageCircle size={16} />
                </div>
                <div>
                  <span className="block text-[11px] uppercase font-bold text-white/60">WhatsApp de Encomendas</span>
                  <span className="text-white font-semibold text-[14px] group-hover:text-[#E9C84A] transition-colors">(11) 96602-6794</span>
                </div>
              </a>

              <div className="flex items-center gap-2.5 pt-1 text-white/80">
                <Phone size={15} className="text-[#E9C84A] shrink-0" />
                <span>Telefone fixo: (11) 3432-8817</span>
              </div>

              <a
                href="https://instagram.com/jenyconfeitaria"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-[#E9C84A] shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram: @jenyconfeitaria</span>
              </a>
            </div>
          </div>

          {/* Col 4: Prazos e Encomendas (2.5 cols) */}
          <div className="lg:col-span-2 flex flex-col items-start space-y-3">
            <h4 className="font-semibold text-[15px] text-[#E9C84A] tracking-wider uppercase">
              Encomendas
            </h4>
            <div className="space-y-3 text-[13px] text-white/80">
              <div className="flex items-start gap-2.5">
                <Clock size={16} className="text-[#E9C84A] shrink-0 mt-0.5" />
                <span>Antecedência de 24h a 48h recomendada para bolos e kits</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#E9C84A] shrink-0 mt-0.5" />
                <span>Retirada no ateliê ou entrega em São Paulo e região</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CreditCard size={16} className="text-[#E9C84A] shrink-0 mt-0.5" />
                <span>Pix com sinal ou cartão de crédito</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-white/60 text-center sm:text-left">
          <span>© {new Date().getFullYear()} Jeny Confeitaria Gourmet. Todos os direitos reservados.</span>
          <span>Cardápio Digital Oficial de Encomendas</span>
        </div>
      </div>
    </footer>
  );
}
