"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useCartStore } from "@/store/useCartStore";
import { Plus, Minus, Cake, Check, ShoppingBag, Sparkles } from "lucide-react";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const totalPrice = product.basePrice * quantity;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem({
      id: crypto.randomUUID(),
      product,
      quantity,
      unitPrice: product.basePrice,
      totalPrice,
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
      setQuantity(1);
      openCart();
    }, 600);
  };

  const Content = () => (
    <div className="flex flex-col gap-5 py-2 px-4 sm:px-0 max-h-[75vh] overflow-y-auto scrollbar-hide text-[#011D4D]">
      
      {/* Large Image Header */}
      <div className="relative w-full aspect-video sm:aspect-[4/3] rounded-2xl bg-[#F7F8FA] overflow-hidden border border-[rgba(1,29,77,0.12)]">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#011D4D]/30 p-6 text-center">
            <Cake className="w-12 h-12 mb-2 stroke-[1.5]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#011D4D]/50">
              Jeny Confeitaria Gourmet
            </span>
          </div>
        )}
      </div>

      {/* Title & Category Badge */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#011D4D]/5 text-[#011D4D] border border-[rgba(1,29,77,0.12)]">
            {product.categoryId.replace('-', ' ')}
          </span>
          {product.weight && (
            <span className="text-[11px] font-medium text-[#526070]">
              Aprox. {product.weight}
            </span>
          )}
        </div>

        <h3 className="font-heading font-bold text-2xl text-[#011D4D] leading-tight">
          {product.name}
        </h3>
      </div>

      {/* Description */}
      {product.description ? (
        <p className="text-sm text-[#526070] leading-relaxed">
          {product.description}
        </p>
      ) : (
        product.shortDescription && (
          <p className="text-sm text-[#526070] leading-relaxed">
            {product.shortDescription}
          </p>
        )
      )}

      {/* Quantity Selector */}
      <div className="pt-3 border-t border-[rgba(1,29,77,0.12)] flex items-center justify-between">
        <span className="font-semibold text-sm text-[#011D4D]">Quantidade</span>
        <div className="flex items-center border border-[rgba(1,29,77,0.16)] rounded-xl bg-[#F7F8FA] p-1">
          <button
            type="button"
            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white text-[#011D4D] shadow-xs hover:bg-secondary transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center font-bold text-sm text-[#011D4D]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(prev => prev + 1)}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white text-[#011D4D] shadow-xs hover:bg-secondary transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

    </div>
  );

  const Footer = () => (
    <div className="flex flex-col gap-3 pt-3">
      <div className="flex justify-between items-center px-4 sm:px-0">
        <span className="text-xs text-[#526070] font-medium">Subtotal</span>
        <span className="font-heading font-bold text-2xl text-[#011D4D]">
          {formatPrice(totalPrice)}
        </span>
      </div>

      <button
        onClick={handleAddToCart}
        className={`w-full py-4 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
          isAdded
            ? "bg-[#011D4D] text-[#FBF59C]"
            : "bg-[#011D4D] hover:bg-[#01245F] active:bg-[#01163E] text-white"
        }`}
      >
        {isAdded ? (
          <>
            <Check size={18} />
            <span>Adicionado ao pedido!</span>
          </>
        ) : (
          <>
            <ShoppingBag size={18} className="text-[#FBF59C]" />
            <span>Adicionar ao pedido • {formatPrice(totalPrice)}</span>
          </>
        )}
      </button>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px] p-6 gap-0 bg-white border border-[rgba(1,29,77,0.16)] rounded-2xl">
          <DialogHeader className="mb-2 text-left">
            <DialogTitle className="sr-only">{product.name}</DialogTitle>
          </DialogHeader>
          <Content />
          <DialogFooter className="mt-4 flex-col border-t border-[rgba(1,29,77,0.12)] pt-3">
            <Footer />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[92vh] bg-white">
        <DrawerHeader className="text-left pb-2">
          <DrawerTitle className="sr-only">{product.name}</DrawerTitle>
        </DrawerHeader>
        <Content />
        <DrawerFooter className="border-t border-[rgba(1,29,77,0.12)] p-4 bg-[#F7F8FA]">
          <Footer />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
