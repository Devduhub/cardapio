"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export function CartBar() {
  const { items, getTotalItems, getSubtotal, openCart } = useCartStore();
  const totalItems = getTotalItems();
  const subtotal = getSubtotal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until after hydration to avoid SSR mismatch
  if (!mounted || items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-safe bg-transparent pointer-events-none">
      <div className="max-w-[480px] mx-auto pointer-events-auto">
        <button
          onClick={openCart}
          className="w-full bg-[#031C42] hover:bg-[#06295C] text-white rounded-full p-3.5 sm:p-4 shadow-[0_12px_36px_rgba(3,28,66,0.30)] border border-white/15 flex items-center justify-between transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9C84A]"
          aria-label="Ver carrinho e finalizar pedido"
        >
          <div className="flex items-center gap-3 pl-1">
            <div className="relative bg-white/10 p-2.5 rounded-full border border-white/15">
              <ShoppingBag size={18} className="text-[#E9C84A]" />
              <span className="absolute -top-1 -right-1 bg-[#E9C84A] text-[#031C42] text-[10px] font-black h-4.5 min-w-[18px] px-1 rounded-full flex items-center justify-center shadow-2xs">
                {totalItems}
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[12px] text-white/70 font-medium leading-none">
                {totalItems} {totalItems === 1 ? "item" : "itens"} no pedido
              </span>
              <span className="text-[17px] font-bold text-white leading-tight mt-0.5">
                R$ {subtotal.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-[#E9C84A] hover:bg-[#D4B236] text-[#031C42] px-4 py-2 rounded-full font-semibold text-[13px] tracking-wide shadow-2xs transition-colors">
            <span>Ver pedido</span>
            <ArrowRight size={15} />
          </div>
        </button>
      </div>
    </div>
  );
}
