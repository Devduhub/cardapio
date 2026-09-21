"use client";

import React from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export function CartBar() {
  const { items, getTotalItems, getSubtotal, openCart } = useCartStore();
  const totalItems = getTotalItems();
  const subtotal = getSubtotal();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-safe bg-transparent pointer-events-none">
      <div className="container mx-auto max-w-lg pointer-events-auto">
        <button
          onClick={openCart}
          className="w-full bg-[#011D4D] hover:bg-[#01245F] text-white rounded-t-[22px] rounded-b-[22px] p-4 shadow-[0_-6px_25px_rgba(1,29,77,0.20)] border border-[rgba(251,245,156,0.30)] flex items-center justify-between transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="relative bg-[#01245F] p-2.5 rounded-xl border border-white/20">
              <ShoppingBag size={20} className="text-[#FBF59C]" />
              <span className="absolute -top-1.5 -right-1.5 bg-[#FBF59C] text-[#011D4D] text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs text-white/80 font-medium">
                {totalItems} {totalItems === 1 ? 'item selecionado' : 'itens selecionados'}
              </span>
              <span className="text-lg font-bold text-[#FBF59C] font-heading leading-tight">
                R$ {subtotal.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#FBF59C] text-[#011D4D] px-4 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase shadow-xs">
            <span>Ver pedido</span>
            <ArrowRight size={14} />
          </div>
        </button>
      </div>
    </div>
  );
}
