"use client";

import React from "react";
import Image from "next/image";
import { Cake, Sparkles, ChevronRight } from "lucide-react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const isCakeProduct = product.categoryId === "bolos-de-festa" || product.slug === "bolo-de-festa";
  const isKitProduct = product.categoryId === "kits-festa";
  const isBulkProduct = product.categoryId === "doces" || product.categoryId === "salgados";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const getPriceDisplay = () => {
    if (product.priceType === "starting_at") {
      return (
        <div className="flex flex-col">
          <span className="text-[11px] text-[#526070] font-semibold uppercase tracking-wider">A partir de</span>
          <span className="text-lg md:text-xl font-extrabold text-[#011D4D] tracking-tight">
            {formatPrice(product.basePrice)}
            <span className="text-xs font-medium text-[#526070] ml-1">/{product.unit || 'kg'}</span>
          </span>
        </div>
      );
    }
    
    if (product.priceType === "per_unit" && product.categoryId === "doces") {
      const hundredPrice = product.slug === "doces-especiais" ? "R$ 145,00" : "R$ 116,00";
      return (
        <div className="flex flex-col">
          <span className="text-lg md:text-xl font-extrabold text-[#011D4D] tracking-tight">
            {formatPrice(product.basePrice)}
            <span className="text-xs font-medium text-[#526070] ml-1">/uni</span>
          </span>
          <span className="text-[11px] font-bold text-[#011D4D] bg-[#F7F8FA] px-2 py-0.5 rounded-md inline-block mt-0.5 border border-[#011D4D]/10">
            {hundredPrice} <span className="font-normal text-[#526070]">/100 uni</span>
          </span>
        </div>
      );
    }

    if (product.priceType === "per_unit" && product.categoryId === "salgados") {
      return (
        <div className="flex flex-col">
          <span className="text-lg md:text-xl font-extrabold text-[#011D4D] tracking-tight">
            {formatPrice(product.basePrice)}
            <span className="text-xs font-medium text-[#526070] ml-1">/uni</span>
          </span>
          <span className="text-[11px] font-bold text-[#011D4D] bg-[#F7F8FA] px-2 py-0.5 rounded-md inline-block mt-0.5 border border-[#011D4D]/10">
            {product.slug === "salgados-congelados" ? "R$ 27,00 /25 uni" : "R$ 58,00 /50 uni"}
          </span>
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        <span className="text-lg md:text-xl font-extrabold text-[#011D4D] tracking-tight">
          {formatPrice(product.basePrice)}
        </span>
        {product.unit && (
          <span className="text-xs font-medium text-[#526070]">
            por {product.unit}
          </span>
        )}
      </div>
    );
  };

  const getButtonText = () => {
    if (isCakeProduct) return "Montar meu bolo";
    if (isBulkProduct) return "Escolher sabores";
    return "Ver detalhes";
  };

  return (
    <div 
      onClick={() => onClick(product)}
      className="group relative flex flex-col bg-white rounded-[22px] overflow-hidden border-2 border-[#011D4D]/15 hover:border-[#011D4D] ring-1 ring-inset ring-[#011D4D]/5 hover:ring-[#E8D777]/40 shadow-[0_4px_20px_rgba(1,29,77,0.06)] hover:shadow-[0_16px_36px_rgba(1,29,77,0.14)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
    >
      {/* Moldura Accent Bar at Top */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#011D4D] via-[#E8D777] to-[#011D4D] opacity-90 group-hover:opacity-100 transition-opacity" />

      {/* Kit Badge or Special Tag */}
      {isKitProduct && (
        <div className="absolute top-4 left-3 z-10 bg-[#011D4D] text-[#FBF59C] text-[10px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-[#E8D777]/40">
          <Sparkles size={11} className="text-[#E8D777]" />
          {product.shortDescription?.includes("pessoas") 
            ? product.shortDescription.split('.')[0]
            : "Mais praticidade"}
        </div>
      )}

      {/* Image Container with Zoom effect */}
      <div className="relative w-full aspect-square bg-[#F7F8FA] overflow-hidden border-b border-[#011D4D]/10">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#011D4D]/30 p-4 text-center">
            <Cake className="w-10 h-10 mb-2 stroke-[1.5]" />
            <span className="text-xs font-semibold text-[#011D4D]/60">{product.name}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow p-4 md:p-5">
        {/* Specs / Weight tag if exists */}
        {product.weight && (
          <span className="text-[11px] font-bold text-[#011D4D]/70 uppercase tracking-wider mb-1">
            {product.weight}
          </span>
        )}

        {/* Product Title - Bold, Readable Font */}
        <h3 className="font-sans font-extrabold text-base md:text-lg text-[#011D4D] leading-tight mb-1.5 group-hover:text-[#01245F] transition-colors">
          {product.name}
        </h3>
        
        {product.shortDescription && (
          <p className="text-xs text-[#526070] line-clamp-2 mb-4 flex-grow leading-relaxed font-sans">
            {product.shortDescription}
          </p>
        )}

        <div className="mt-auto pt-2 flex flex-col gap-3.5">
          {/* Price */}
          <div>
            {getPriceDisplay()}
          </div>

          {/* Action Button */}
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick(product);
            }}
            className="w-full h-11 bg-[#011D4D] group-hover:bg-[#01245F] active:bg-[#01163E] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 border border-white/10"
          >
            <span>{getButtonText()}</span>
            <ChevronRight size={16} className="text-[#FBF59C] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
