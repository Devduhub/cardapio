"use client";

import React from "react";
import Image from "next/image";
import { Cake, ArrowRight, Sparkles, Users } from "lucide-react";
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

  // Badge extraction based only on real data
  const getBadgeText = () => {
    if (isKitProduct && product.shortDescription) {
      const match = product.shortDescription.match(/serve\s+(até\s+)?(\d+\s*a\s*\d+|\d+)\s*pessoas/i);
      if (match) {
        return `Serve até ${match[2]} pessoas`;
      }
      if (product.name.toLowerCase().includes("mimo")) return "Presente";
      if (product.name.toLowerCase().includes("escolar")) return "Individual";
    }
    if (product.weight) {
      return product.weight;
    }
    return null;
  };

  const badgeText = getBadgeText();

  const getPriceDisplay = () => {
    if (product.priceType === "starting_at") {
      return (
        <div className="flex flex-col">
          <span className="text-[11px] text-[#667085] font-medium uppercase tracking-wider">
            A partir de
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-[18px] sm:text-[20px] font-bold text-[#06295C] tracking-tight">
              {formatPrice(product.basePrice)}
            </span>
            <span className="text-[12px] text-[#667085] font-normal">
              /{product.unit || "kg"}
            </span>
          </div>
        </div>
      );
    }

    if (product.priceType === "per_unit" && product.categoryId === "doces") {
      const hundredPrice = product.slug === "doces-especiais" ? "R$ 145,00" : "R$ 116,00";
      return (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-[18px] sm:text-[20px] font-bold text-[#06295C] tracking-tight">
              {formatPrice(product.basePrice)}
            </span>
            <span className="text-[12px] text-[#667085] font-normal">/unid</span>
          </div>
          <span className="text-[11px] font-medium text-[#667085] mt-0.5">
            {hundredPrice} <span className="text-[#98A2B3]">/100 unid</span>
          </span>
        </div>
      );
    }

    if (product.priceType === "per_unit" && product.categoryId === "salgados") {
      const bulkNote = product.slug === "salgados-congelados" ? "R$ 27,00 /25 unid" : "R$ 58,00 /50 unid";
      return (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-[18px] sm:text-[20px] font-bold text-[#06295C] tracking-tight">
              {formatPrice(product.basePrice)}
            </span>
            <span className="text-[12px] text-[#667085] font-normal">/unid</span>
          </div>
          <span className="text-[11px] font-medium text-[#667085] mt-0.5">
            {bulkNote}
          </span>
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className="text-[18px] sm:text-[20px] font-bold text-[#06295C] tracking-tight">
            {formatPrice(product.basePrice)}
          </span>
          {product.unit && (
            <span className="text-[12px] text-[#667085] font-normal">
              /{product.unit}
            </span>
          )}
        </div>
      </div>
    );
  };

  const getButtonText = () => {
    if (isCakeProduct) return "Personalizar bolo";
    if (isBulkProduct) return "Escolher sabores";
    return "Ver detalhes";
  };

  return (
    <article
      onClick={() => onClick(product)}
      className="group relative flex flex-col bg-white rounded-[20px] border border-[#E4E7EC] hover:border-[#D0D5DD] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(16,24,40,0.07)] cursor-pointer select-none"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] bg-[#F8F9FB] overflow-hidden border-b border-[#E4E7EC]">
        {badgeText && (
          <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-xs text-[#06295C] text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-2xs border border-[#E4E7EC] flex items-center gap-1.5">
            {isKitProduct ? (
              <Users size={12} className="text-[#06295C]" />
            ) : (
              <Sparkles size={12} className="text-[#E9C84A]" />
            )}
            <span>{badgeText}</span>
          </div>
        )}

        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#667085]/40 p-4 text-center">
            <Cake className="w-10 h-10 mb-2 stroke-[1.5]" />
            <span className="text-xs font-medium text-[#667085]">{product.name}</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow p-4 sm:p-5">
        {/* Title */}
        <h3 className="font-sans font-semibold text-[16px] sm:text-[17px] text-[#101828] leading-snug mb-1.5 group-hover:text-[#06295C] transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Short Description */}
        {product.shortDescription ? (
          <p className="text-[13px] sm:text-[14px] text-[#667085] line-clamp-2 leading-relaxed mb-4 flex-grow font-normal">
            {product.shortDescription}
          </p>
        ) : (
          <div className="flex-grow mb-4" />
        )}

        {/* Bottom Section: Price & Action */}
        <div className="mt-auto pt-3 border-t border-[#F2F4F7] flex flex-col gap-3">
          <div className="min-h-[42px] flex items-center justify-between">
            {getPriceDisplay()}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick(product);
            }}
            className="w-full h-[42px] bg-[#FAF7F0] group-hover:bg-[#06295C] text-[#06295C] group-hover:text-white rounded-xl text-[13px] font-semibold transition-all duration-200 flex items-center justify-center gap-2 border border-[#E4E7EC] group-hover:border-[#06295C] shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06295C]"
          >
            <span>{getButtonText()}</span>
            <ArrowRight
              size={15}
              className="text-[#06295C] group-hover:text-[#E9C84A] group-hover:translate-x-0.5 transition-all"
            />
          </button>
        </div>
      </div>
    </article>
  );
}
