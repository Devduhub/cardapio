"use client";

import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { useCartStore } from "@/store/useCartStore";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();

  const handleContinue = () => {
    onClose();
    onCheckout();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l border-[rgba(1,29,77,0.16)] bg-white">
        
        {/* Header */}
        <SheetHeader className="p-6 border-b border-[rgba(1,29,77,0.16)] text-left bg-[#011D4D] text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-[#FBF59C]" size={22} />
            <SheetTitle className="font-heading text-2xl text-white">Seu pedido</SheetTitle>
          </div>
          <SheetDescription className="text-white/80 text-xs">
            Revise os itens selecionados antes de continuar.
          </SheetDescription>
        </SheetHeader>

        {/* Content Items */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-4">
          {items.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-[#526070] space-y-3">
              <ShoppingBag size={48} className="text-[#011D4D]/20 stroke-1" />
              <p className="text-sm font-medium">Seu carrinho está vazio.</p>
              <p className="text-xs text-[#526070]">Adicione bolos, doces ou salgados do cardápio para começar.</p>
            </div>
          ) : (
            items.map((item) => (
              <div 
                key={item.id} 
                className="flex gap-4 p-4 border border-[rgba(1,29,77,0.16)] rounded-2xl bg-white shadow-xs relative"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl bg-[#F7F8FA] relative overflow-hidden flex-shrink-0 border border-[rgba(1,29,77,0.08)]">
                  {item.product.imageUrl ? (
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#011D4D]/30 font-heading font-bold text-xs">
                      JENY
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-heading font-semibold text-sm text-[#011D4D] truncate">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[#526070] hover:text-red-500 p-1 transition-colors"
                      aria-label="Remover item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Config detail breakdown */}
                  {item.config && (
                    <div className="mt-1 text-[11px] text-[#526070] space-y-0.5 bg-[#F7F8FA] p-2 rounded-lg border border-[rgba(1,29,77,0.08)]">
                      {item.config.flavor && <div><strong className="text-[#011D4D]">Sabor:</strong> {item.config.flavor}</div>}
                      {item.config.weight && <div><strong className="text-[#011D4D]">Peso:</strong> {item.config.weight} kg</div>}
                      {item.config.shape && <div><strong className="text-[#011D4D]">Formato:</strong> {item.config.shape}</div>}
                      {item.config.decoration && <div><strong className="text-[#011D4D]">Decoração:</strong> {item.config.decoration}</div>}
                      {item.config.flavors && item.config.flavors.length > 0 && (
                        <div>
                          <strong className="text-[#011D4D]">Sabores:</strong> {item.config.flavors.map((f: any) => `${f.quantity}x ${f.name}`).join(', ')}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Price & Quantity Controls */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold text-sm text-[#011D4D]">
                      R$ {item.totalPrice.toFixed(2).replace('.', ',')}
                    </span>

                    <div className="flex items-center border border-[rgba(1,29,77,0.16)] rounded-xl bg-[#F7F8FA] p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-[#011D4D] hover:bg-white transition-colors"
                        aria-label="Diminuir"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#011D4D]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-[#011D4D] hover:bg-white transition-colors"
                        aria-label="Aumentar"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <SheetFooter className="p-6 border-t border-[rgba(1,29,77,0.16)] mt-auto flex-col bg-[#F7F8FA]">
            <div className="flex justify-between items-center w-full mb-4">
              <span className="text-sm font-medium text-[#526070]">Total estimado</span>
              <span className="font-heading text-2xl font-bold text-[#011D4D]">
                R$ {subtotal.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <button
              onClick={handleContinue}
              className="w-full bg-[#011D4D] hover:bg-[#01245F] active:bg-[#01163E] text-white py-4 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Continuar pedido</span>
              <ArrowRight size={16} className="text-[#FBF59C]" />
            </button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
