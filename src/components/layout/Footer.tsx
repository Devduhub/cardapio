"use client";

import React from "react";
import { Phone, MapPin, Clock, CreditCard, ChevronRight, Heart } from "lucide-react";
import { Logo } from "./Logo";

const FOOTER_CATEGORIES = [
  { id: "bolos-de-festa", name: "Bolos de Festa" },
  { id: "kits-festa", name: "Kits Festa" },
  { id: "doces", name: "Doces Tradicionais & Especiais" },
  { id: "salgados", name: "Salgados (Fritos, Assados e Congelados)" },
  { id: "bolos-caseiros", name: "Bolos Caseiros" },
  { id: "tortas", name: "Tortas Gourmet" },
  { id: "pudim", name: "Pudim Artesanal" },
  { id: "travessas", name: "Sobremesas na Travessa" },
  { id: "descartaveis", name: "Velas & Artigos de Festa" },
];

export function Footer() {
  const scrollToSection = (id: string) => {
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
    <footer className="bg-[#01163E] text-white pt-14 pb-28 border-t border-white/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <Logo variant="light" />
            <p className="text-white/80 text-xs leading-relaxed max-w-sm">
              Confeitaria artesanal de alto padrão. Bolos de festa personalizados, doces finos, salgados crocantes, kits completos, pudins aveludados e travessas especiais preparados com ingredientes nobres.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#FBF59C] pt-1">
              <Heart size={14} className="fill-[#FBF59C]" />
              <span>Feito à mão com carinho e dedicação</span>
            </div>
          </div>

          {/* Col 2: Cardápio & Categorias (com Pudim e Travessas) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <h4 className="font-heading font-semibold text-lg text-[#FBF59C]">Nosso Cardápio</h4>
            <ul className="space-y-1.5 text-xs text-white/80 w-full">
              {FOOTER_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => scrollToSection(cat.id)}
                    className="hover:text-[#FBF59C] transition-colors flex items-center gap-1.5 justify-center md:justify-start w-full text-left py-0.5 group"
                  >
                    <ChevronRight size={12} className="text-[#FBF59C]/60 group-hover:translate-x-0.5 transition-transform" />
                    <span className={cat.id === "pudim" || cat.id === "travessas" ? "text-white font-medium" : ""}>
                      {cat.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Telephones */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <h4 className="font-heading font-semibold text-lg text-[#FBF59C]">Atendimento</h4>
            <div className="space-y-3 text-xs text-white/90">
              <a 
                href="https://wa.me/5511966026794" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#FBF59C] transition-colors justify-center md:justify-start bg-white/5 p-2.5 rounded-xl border border-white/10"
              >
                <Phone size={15} className="text-[#25D366] shrink-0" />
                <div>
                  <span className="block font-bold text-white">WhatsApp de Pedidos</span>
                  <span className="text-[#FBF59C] font-semibold">(11) 96602-6794</span>
                </div>
              </a>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Phone size={14} className="text-[#FBF59C] shrink-0" />
                <span>Telefone: (11) 3432-8817</span>
              </div>
              <a 
                href="https://instagram.com/jenyconfeitaria" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#FBF59C] transition-colors justify-center md:justify-start"
              >
                <svg className="w-3.5 h-3.5 fill-current text-[#FBF59C] shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram: @jenyconfeitaria</span>
              </a>
            </div>
          </div>

          {/* Col 4: Hours, Delivery & Payment */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <h4 className="font-heading font-semibold text-lg text-[#FBF59C]">Encomendas</h4>
            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2 justify-center md:justify-start">
                <Clock size={14} className="text-[#FBF59C] shrink-0 mt-0.5" />
                <span>Encomendas com antecedência de 24h a 48h recomendada para bolos e kits</span>
              </div>
              <div className="flex items-start gap-2 justify-center md:justify-start">
                <MapPin size={14} className="text-[#FBF59C] shrink-0 mt-0.5" />
                <span>Retirada no ateliê ou entrega programada em São Paulo e região</span>
              </div>
              <div className="flex items-start gap-2 justify-center md:justify-start">
                <CreditCard size={14} className="text-[#FBF59C] shrink-0 mt-0.5" />
                <span>Pagamento via Pix com 50% de sinal e saldo na retirada / Cartão</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60 text-center sm:text-left">
          <span>© {new Date().getFullYear()} Jeny Confeitaria Gourmet. Todos os direitos reservados.</span>
          <span>Cardápio Digital Oficial de Encomendas</span>
        </div>
      </div>
    </footer>
  );
}
