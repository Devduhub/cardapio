"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, X, ChevronRight, Cake, Sparkles, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { mockProducts } from "@/data";
import { Product } from "@/types";
import { useSearchStore } from "@/store/useSearchStore";

interface SearchModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSelectProduct: (product: Product) => void;
  products?: Product[];
}

const CATEGORY_CHIPS = [
  { id: "all", label: "Todos" },
  { id: "kits-festa", label: "Kits Festa" },
  { id: "bolos-de-festa", label: "Bolos Festa" },
  { id: "doces", label: "Doces" },
  { id: "salgados", label: "Salgados" },
  { id: "bolos-caseiros", label: "Bolos Caseiros" },
  { id: "tortas", label: "Tortas" },
  { id: "pudim", label: "Pudim" },
  { id: "travessas", label: "Travessas" },
  { id: "descartaveis", label: "Artigos" },
];

export function SearchModal({
  isOpen: propIsOpen,
  onClose: propOnClose,
  onSelectProduct,
  products = mockProducts,
}: SearchModalProps) {
  const { isOpen: storeIsOpen, closeSearch, searchQuery } = useSearchStore();
  const isOpen = propIsOpen ?? storeIsOpen;
  const handleClose = propOnClose ?? closeSearch;

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sync initial query from store if provided
  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [searchQuery]);

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
    const sourceProducts = products && products.length > 0 ? products : mockProducts;

    return sourceProducts.filter((p) => {
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
  }, [query, selectedCategory, products]);

  const handleSelect = (product: Product) => {
    handleClose();
    onSelectProduct(product);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#031C42]/70 backdrop-blur-xs animate-in fade-in-0 duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="w-full max-w-2xl max-h-[88vh] flex flex-col bg-white rounded-2xl md:rounded-[24px] shadow-2xl border border-[#E4E7EC] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#E4E7EC] bg-[#FCFCFA]">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#06295C] text-[#E9C84A] flex items-center justify-center shadow-2xs">
                <Search size={16} />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-base sm:text-lg text-[#101828] leading-tight">
                  Buscar no Cardápio
                </h3>
                <p className="font-sans text-xs text-[#667085]">
                  Encontre bolos, kits de festa, doces, salgados e sobremesas
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 text-[#667085] hover:text-[#101828] hover:bg-[#F8F9FB] rounded-full transition-colors"
              aria-label="Fechar busca"
            >
              <X size={19} />
            </button>
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 text-[#667085]" size={18} />
            <input
              type="text"
              placeholder="Digite o nome ou sabor (ex: ninho, morango, coxinha, kit...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-10 h-11 text-sm font-sans font-normal text-[#101828] bg-white border border-[#E4E7EC] focus:border-[#06295C] focus:ring-2 focus:ring-[#06295C]/10 rounded-xl outline-none placeholder:text-[#98A2B3] transition-all shadow-2xs"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-3 text-[#667085] hover:text-[#101828] p-0.5 rounded-full hover:bg-gray-100"
                aria-label="Limpar busca"
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
                      ? "bg-[#06295C] text-white shadow-2xs font-semibold"
                      : "bg-white text-[#667085] border border-[#E4E7EC] hover:border-[#D0D5DD] hover:text-[#101828]"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Info Subheader */}
        <div className="px-5 py-2.5 bg-[#F8F9FB] border-b border-[#E4E7EC] flex items-center justify-between text-xs font-sans font-medium text-[#667085]">
          <span>
            {results.length} {results.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </span>
          {selectedCategory !== "all" && (
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-[#06295C] hover:underline text-[11px] font-semibold"
            >
              Ver todas as categorias
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 space-y-2">
          {results.length === 0 ? (
            <div className="py-12 sm:py-16 text-center text-[#667085] space-y-3 px-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#F8F9FB] border border-[#E4E7EC] flex items-center justify-center text-[#667085]">
                <Cake size={22} />
              </div>
              <p className="text-base font-sans font-semibold text-[#101828]">
                Nenhum produto encontrado para "{query}"
              </p>
              <p className="text-xs font-sans text-[#667085] max-w-sm mx-auto">
                Tente buscar por termos como <strong>morango</strong>, <strong>ninho</strong>, <strong>chocolate</strong>, <strong>kit festa</strong> ou <strong>coxinha</strong>.
              </p>
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelect(product)}
                className="flex items-center gap-3.5 p-3 rounded-xl border border-[#E4E7EC] hover:border-[#06295C]/40 bg-white hover:bg-[#FAF7F0]/40 transition-all cursor-pointer group shadow-2xs"
              >
                {/* Product Thumbnail */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-lg bg-[#F8F9FB] relative overflow-hidden shrink-0 border border-[#E4E7EC]">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#667085]/50 text-[10px] font-bold">
                      <Sparkles size={16} className="mb-0.5 text-[#E9C84A]" />
                      JENY
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0 pr-1">
                  <h4 className="font-sans font-semibold text-sm sm:text-base text-[#101828] leading-snug group-hover:text-[#06295C] transition-colors line-clamp-1">
                    {product.name}
                  </h4>

                  {product.shortDescription && (
                    <p className="text-xs font-sans text-[#667085] line-clamp-1 mt-0.5">
                      {product.shortDescription}
                    </p>
                  )}

                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-sm sm:text-base font-sans font-bold text-[#06295C]">
                      R$ {product.basePrice.toFixed(2).replace(".", ",")}
                    </span>
                    {product.unit && (
                      <span className="text-[11px] font-sans font-normal text-[#667085]">
                        /{product.unit}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action arrow */}
                <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#F8F9FB] group-hover:bg-[#06295C] group-hover:text-white text-[#06295C] transition-colors">
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 px-5 bg-[#FCFCFA] border-t border-[#E4E7EC] flex items-center justify-between text-xs font-sans text-[#667085]">
          <span className="flex items-center gap-1.5">
            <ShoppingBag size={14} className="text-[#06295C]" />
            Clique no item para ver detalhes ou personalizar
          </span>
          <button
            onClick={handleClose}
            className="font-semibold text-[#06295C] hover:underline"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
