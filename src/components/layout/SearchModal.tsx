"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, X, ChevronRight, Cake, Sparkles, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { mockProducts } from "@/data";
import { Product } from "@/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

const CATEGORY_CHIPS = [
  { id: "all", label: "Todos" },
  { id: "pudim", label: "🍮 Pudim" },
  { id: "travessas", label: "✨ Travessas" },
  { id: "bolos-de-festa", label: "🎂 Bolos Festa" },
  { id: "kits-festa", label: "🎁 Kits Festa" },
  { id: "doces", label: "🍬 Doces" },
  { id: "salgados", label: "🥐 Salgados" },
  { id: "bolos-caseiros", label: "🍰 Bolos Caseiros" },
  { id: "tortas", label: "🥧 Tortas" },
  { id: "descartaveis", label: "🎉 Artigos" },
];

export function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Reset states when closed
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedCategory("all");
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    
    return mockProducts.filter((p) => {
      // Category filter
      if (selectedCategory !== "all" && p.categoryId !== selectedCategory) {
        return false;
      }
      
      // Query search
      if (!q) return true;

      const nameMatch = p.name.toLowerCase().includes(q);
      const descMatch = p.description?.toLowerCase().includes(q);
      const shortDescMatch = p.shortDescription?.toLowerCase().includes(q);
      const catMatch = p.categoryId.toLowerCase().includes(q);

      return nameMatch || descMatch || shortDescMatch || catMatch;
    });
  }, [query, selectedCategory]);

  const handleSelect = (product: Product) => {
    onClose();
    onSelectProduct(product);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#01163E]/70 backdrop-blur-sm animate-in fade-in-0 duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="w-full max-w-2xl max-h-[90vh] md:max-h-[85vh] flex flex-col bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-[rgba(1,29,77,0.14)] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[rgba(1,29,77,0.10)] bg-[#FBFBFC]">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#011D4D] text-[#FBF59C] flex items-center justify-center shadow-xs">
                <Search size={16} />
              </div>
              <div>
                <h3 className="font-sans font-bold text-base sm:text-lg text-[#011D4D] leading-tight">
                  Buscar no Cardápio
                </h3>
                <p className="font-sans text-xs text-[#526070]">
                  Encontre bolos, pudins, travessas, salgados e sobremesas
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#526070] hover:text-[#011D4D] hover:bg-[#011D4D]/10 rounded-full transition-colors"
              aria-label="Fechar busca"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 text-[#011D4D]/50" size={19} />
            <input
              type="text"
              placeholder="Digite o sabor ou produto (ex: pudim, ninho, coxinha...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-10 h-12 text-sm font-sans font-medium text-[#011D4D] bg-white border border-[rgba(1,29,77,0.20)] focus:border-[#011D4D] focus:ring-2 focus:ring-[#011D4D]/15 rounded-xl outline-none placeholder:text-[#526070]/60 transition-all shadow-xs"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3.5 top-3.5 text-[#526070] hover:text-[#011D4D] p-0.5 rounded-full hover:bg-gray-100"
                aria-label="Limpar texto"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Quick Filter Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pt-3 -mb-1 pb-1">
            {CATEGORY_CHIPS.map((chip) => {
              const isSelected = selectedCategory === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setSelectedCategory(chip.id)}
                  className={`px-3 py-1 rounded-full text-xs font-sans font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#011D4D] text-white shadow-xs font-semibold"
                      : "bg-white text-[#526070] border border-[rgba(1,29,77,0.12)] hover:border-[#011D4D]/40 hover:text-[#011D4D]"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Info Subheader */}
        <div className="px-5 py-2.5 bg-gray-50/70 border-b border-[rgba(1,29,77,0.08)] flex items-center justify-between text-xs font-sans font-semibold text-[#526070]">
          <span>
            {results.length} {results.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </span>
          {selectedCategory !== "all" && (
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-[#011D4D] hover:underline text-[11px] font-bold"
            >
              Limpar filtro
            </button>
          )}
        </div>

        {/* Results List (Smooth Scrollable Container) */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 space-y-2.5">
          {results.length === 0 ? (
            <div className="py-12 sm:py-16 text-center text-[#526070] space-y-3 px-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#011D4D]/5 flex items-center justify-center text-[#011D4D]/40">
                <Cake size={28} />
              </div>
              <p className="text-base font-sans font-semibold text-[#011D4D]">
                Nenhum produto encontrado para "{query}"
              </p>
              <p className="text-xs font-sans text-[#526070] max-w-sm mx-auto">
                Tente buscar por termos como <strong>pudim</strong>, <strong>travessa</strong>, <strong>morango</strong>, <strong>ninho</strong> ou <strong>coxinha</strong>.
              </p>
              {selectedCategory !== "all" && (
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="mt-2 text-xs font-sans font-bold text-[#011D4D] bg-[#FBF59C] hover:bg-[#edd863] px-4 py-2 rounded-full shadow-xs transition-colors"
                >
                  Ver em todas as categorias
                </button>
              )}
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelect(product)}
                className="flex items-center gap-3.5 p-3 rounded-2xl border border-[rgba(1,29,77,0.10)] hover:border-[#011D4D]/50 bg-white hover:bg-[#F8F9FC] transition-all cursor-pointer group shadow-2xs"
              >
                {/* Product Thumbnail */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#F0F3F8] relative overflow-hidden shrink-0 border border-[rgba(1,29,77,0.08)]">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#011D4D]/40 text-[10px] font-bold">
                      <Sparkles size={16} className="mb-0.5 text-[#E8D777]" />
                      JENY
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0 pr-1">
                  {/* Category Pill */}
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#011D4D] bg-[#011D4D]/5 px-2 py-0.5 rounded-md">
                      {product.categoryId === "pudim" ? "Pudim" : product.categoryId === "travessas" ? "Travessa" : product.categoryId.replace("-", " ")}
                    </span>
                    {product.weight && (
                      <span className="text-[11px] font-sans text-[#526070] hidden sm:inline">
                        • {product.weight}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h4 className="font-sans font-bold text-sm sm:text-base text-[#011D4D] leading-snug group-hover:text-[#01245F] transition-colors line-clamp-1">
                    {product.name}
                  </h4>

                  {/* Description */}
                  <p className="text-xs font-sans text-[#526070] line-clamp-1 sm:line-clamp-2 mt-0.5">
                    {product.shortDescription || product.description}
                  </p>

                  {/* Price */}
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-sm sm:text-base font-sans font-extrabold text-[#011D4D]">
                      R$ {product.basePrice.toFixed(2).replace(".", ",")}
                    </span>
                    {product.unit && (
                      <span className="text-[11px] font-sans font-medium text-[#526070]">
                        /{product.unit}
                      </span>
                    )}
                    {product.priceType === "starting_at" && (
                      <span className="text-[10px] font-sans text-[#526070] font-normal">
                        (a partir de)
                      </span>
                    )}
                  </div>
                </div>

                {/* Action button */}
                <div className="shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F0F3F8] group-hover:bg-[#011D4D] group-hover:text-white text-[#011D4D] transition-colors">
                  <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info inside modal */}
        <div className="p-3 px-5 bg-gray-50 border-t border-[rgba(1,29,77,0.10)] flex items-center justify-between text-xs font-sans text-[#526070]">
          <span className="flex items-center gap-1.5">
            <ShoppingBag size={14} className="text-[#011D4D]" />
            Clique no item para personalizar ou adicionar ao pedido
          </span>
          <button
            onClick={onClose}
            className="font-bold text-[#011D4D] hover:underline"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
