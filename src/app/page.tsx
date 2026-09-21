"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CartBar } from "@/components/layout/CartBar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutDrawer } from "@/components/checkout/CheckoutDrawer";
import { CakeConfigurator } from "@/components/products/CakeConfigurator";
import { BulkConfigurator } from "@/components/products/BulkConfigurator";
import { ProductDetailModal } from "@/components/products/ProductDetailModal";
import { SearchModal } from "@/components/layout/SearchModal";
import { WhatsAppBanner } from "@/components/layout/WhatsAppBanner";
import { Footer } from "@/components/layout/Footer";
import { mockProducts } from "@/data";
import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCakeConfigOpen, setIsCakeConfigOpen] = useState(false);
  const [isBulkConfigOpen, setIsBulkConfigOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const { isCartOpen, closeCart } = useCartStore();

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    if (product.categoryId === "bolos-de-festa" || product.slug === "bolo-de-festa") {
      setIsCakeConfigOpen(true);
    } else if (product.categoryId === "doces" || product.categoryId === "salgados") {
      setIsBulkConfigOpen(true);
    } else {
      setIsDetailModalOpen(true);
    }
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      {/* 1. Header */}
      <Header onOpenSearch={() => setIsSearchModalOpen(true)} />

      {/* 2. Hero */}
      <Hero />

      {/* 3. Categorias sticky */}
      <CategoryNav />
      
      {/* Main Catalog Container */}
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        
        {/* 4. Destaques / Kits Festa */}
        <section className="mb-14 scroll-mt-36">
          <div className="flex flex-col mb-7 border-l-4 border-[#011D4D] pl-4 py-0.5">
            <span className="bg-[#011D4D] text-[#FBF59C] px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-widest w-fit mb-1.5 shadow-2xs">
              Praticidade & Fartura
            </span>
            <h2 className="font-heading text-2xl md:text-3xl text-[#011D4D] font-extrabold tracking-tight">
              Kits Festa em Destaque
            </h2>
            <p className="text-xs md:text-sm text-[#526070] mt-1 font-sans">
              Kits completos com bolo, salgados e docinhos dimensionados para a sua celebração.
            </p>
          </div>
          <ProductGrid 
            products={mockProducts.filter(p => p.categoryId === "kits-festa").slice(0, 4)} 
            onProductClick={handleProductClick} 
          />
        </section>

        {/* 5. Bolos de Festa */}
        <section id="bolos-de-festa" className="mb-14 scroll-mt-36">
          <div className="flex flex-col mb-7 border-l-4 border-[#011D4D] pl-4 py-0.5">
            <span className="bg-[#011D4D] text-[#FBF59C] px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-widest w-fit mb-1.5 shadow-2xs">
              Personalizável
            </span>
            <h2 className="font-heading text-2xl md:text-3xl text-[#011D4D] font-extrabold tracking-tight">
              Bolos de Festa
            </h2>
            <p className="text-xs md:text-sm text-[#526070] mt-1 font-sans">
              Escolha o sabor do recheio, peso em kg, formato e tipo de decoração para o seu evento.
            </p>
          </div>
          <ProductGrid 
            products={mockProducts.filter(p => p.categoryId === "bolos-de-festa")} 
            onProductClick={handleProductClick} 
          />
        </section>

        {/* 6. Doces */}
        <section id="doces" className="mb-14 scroll-mt-36">
          <div className="flex flex-col mb-7 border-l-4 border-[#011D4D] pl-4 py-0.5">
            <span className="bg-[#011D4D] text-[#FBF59C] px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-widest w-fit mb-1.5 shadow-2xs">
              Docinhos Artesanais
            </span>
            <h2 className="font-heading text-2xl md:text-3xl text-[#011D4D] font-extrabold tracking-tight">
              Doces Tradicionais e Especiais
            </h2>
            <p className="text-xs md:text-sm text-[#526070] mt-1 font-sans">
              Brigadeiros, beijinhos, cajuzinhos e sabores gourmet. Preço especial para o cento.
            </p>
          </div>
          <ProductGrid 
            products={mockProducts.filter(p => p.categoryId === "doces")} 
            onProductClick={handleProductClick} 
          />
        </section>
        
        {/* 7. Salgados */}
        <section id="salgados" className="mb-14 scroll-mt-36">
          <div className="flex flex-col mb-7 border-l-4 border-[#011D4D] pl-4 py-0.5">
            <span className="bg-[#011D4D] text-[#FBF59C] px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-widest w-fit mb-1.5 shadow-2xs">
              Fritos, Assados e Congelados
            </span>
            <h2 className="font-heading text-2xl md:text-3xl text-[#011D4D] font-extrabold tracking-tight">
              Salgados para Festa
            </h2>
            <p className="text-xs md:text-sm text-[#526070] mt-1 font-sans">
              Coxinhas, empadas, esfihas e risoles quentinhos ou congelados para fazer em casa.
            </p>
          </div>
          <ProductGrid 
            products={mockProducts.filter(p => p.categoryId === "salgados")} 
            onProductClick={handleProductClick} 
          />
        </section>

        {/* 8. Kits Festa Completo */}
        <section id="kits-festa" className="mb-14 scroll-mt-36">
          <div className="flex flex-col mb-7 border-l-4 border-[#011D4D] pl-4 py-0.5">
            <span className="bg-[#011D4D] text-[#FBF59C] px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-widest w-fit mb-1.5 shadow-2xs">
              Todas as Opções
            </span>
            <h2 className="font-heading text-2xl md:text-3xl text-[#011D4D] font-extrabold tracking-tight">
              Todos os Kits e Caixas Presente
            </h2>
            <p className="text-xs md:text-sm text-[#526070] mt-1 font-sans">
              Kits de festa, Festa na Caixa, Caixa Mimo e Kits Escolares.
            </p>
          </div>
          <ProductGrid 
            products={mockProducts.filter(p => p.categoryId === "kits-festa")} 
            onProductClick={handleProductClick} 
          />
        </section>

        {/* 9. Bolos Caseiros */}
        <section id="bolos-caseiros" className="mb-14 scroll-mt-36">
          <div className="flex flex-col mb-7 border-l-4 border-[#011D4D] pl-4 py-0.5">
            <span className="bg-[#011D4D] text-[#FBF59C] px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-widest w-fit mb-1.5 shadow-2xs">
              Feitos Diariamente
            </span>
            <h2 className="font-heading text-2xl md:text-3xl text-[#011D4D] font-extrabold tracking-tight">
              Bolos Caseiros
            </h2>
            <p className="text-xs md:text-sm text-[#526070] mt-1 font-sans">
              Bolos fofinhos para o café da tarde: Cenoura com calda, Fubá, Churros, Aipim e mais.
            </p>
          </div>
          <ProductGrid 
            products={mockProducts.filter(p => p.categoryId === "bolos-caseiros")} 
            onProductClick={handleProductClick} 
          />
        </section>

        {/* 10. Sobremesas / Tortas */}
        <section id="tortas" className="mb-14 scroll-mt-36">
          <div className="flex flex-col mb-7 border-l-4 border-[#011D4D] pl-4 py-0.5">
            <span className="bg-[#011D4D] text-[#FBF59C] px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-widest w-fit mb-1.5 shadow-2xs">
              Sobremesas Finas
            </span>
            <h2 className="font-heading text-2xl md:text-3xl text-[#011D4D] font-extrabold tracking-tight">
              Tortas Gourmet
            </h2>
            <p className="text-xs md:text-sm text-[#526070] mt-1 font-sans">
              Disponíveis em fatia individual ou torta inteira para o seu evento.
            </p>
          </div>
          <ProductGrid 
            products={mockProducts.filter(p => p.categoryId === "tortas")} 
            onProductClick={handleProductClick} 
          />
        </section>

        {/* 11. Pudim Artesanal */}
        <section id="pudim" className="mb-14 scroll-mt-36">
          <div className="flex flex-col mb-7 border-l-4 border-[#011D4D] pl-4 py-0.5">
            <span className="bg-[#011D4D] text-[#FBF59C] px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-widest w-fit mb-1.5 shadow-2xs">
              Sobremesa Clássica
            </span>
            <h2 className="font-heading text-2xl md:text-3xl text-[#011D4D] font-extrabold tracking-tight">
              Pudim Artesanal
            </h2>
            <p className="text-xs md:text-sm text-[#526070] mt-1 font-sans">
              Pudins aveludados sem furinhos com farta calda de caramelo. Opções em fatia individual ou forma inteira (1.5kg).
            </p>
          </div>
          <ProductGrid 
            products={mockProducts.filter(p => p.categoryId === "pudim")} 
            onProductClick={handleProductClick} 
          />
        </section>

        {/* 12. Sobremesas na Travessa */}
        <section id="travessas" className="mb-14 scroll-mt-36">
          <div className="flex flex-col mb-7 border-l-4 border-[#011D4D] pl-4 py-0.5">
            <span className="bg-[#011D4D] text-[#FBF59C] px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-widest w-fit mb-1.5 shadow-2xs">
              Fartura & Sabor
            </span>
            <h2 className="font-heading text-2xl md:text-3xl text-[#011D4D] font-extrabold tracking-tight">
              Sobremesas na Travessa
            </h2>
            <p className="text-xs md:text-sm text-[#526070] mt-1 font-sans">
              Travessas generosas de 1.2kg com morangos, uvas, banoffee e ganache nobre. Perfeitas para almoços em família e eventos.
            </p>
          </div>
          <ProductGrid 
            products={mockProducts.filter(p => p.categoryId === "travessas")} 
            onProductClick={handleProductClick} 
          />
        </section>

        {/* 13. Complete sua Festa */}
        <section id="descartaveis" className="mb-14 scroll-mt-36">
          <div className="flex flex-col mb-7 border-l-4 border-[#011D4D] pl-4 py-0.5">
            <span className="bg-[#011D4D] text-[#FBF59C] px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-widest w-fit mb-1.5 shadow-2xs">
              Artigos & Utensílios
            </span>
            <h2 className="font-heading text-2xl md:text-3xl text-[#011D4D] font-extrabold tracking-tight">
              Complete sua festa
            </h2>
            <p className="text-xs md:text-sm text-[#526070] mt-1 font-sans">
              Velas comemorativas (numéricas com glitter, vulcão e faísca estrelar) e kits de pratinhos e garfinhos.
            </p>
          </div>
          <ProductGrid 
            products={mockProducts.filter(p => p.categoryId === "descartaveis")} 
            onProductClick={handleProductClick} 
          />
        </section>

      </div>

      {/* 12. CTA WhatsApp Banner */}
      <WhatsAppBanner />

      {/* 13. Footer */}
      <Footer />

      {/* Cart Fixed Bar & Drawers */}
      <CartBar />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={closeCart} 
        onCheckout={handleCheckout} 
      />

      <CheckoutDrawer 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectProduct={handleProductClick}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* Cake Configurator */}
      {selectedProduct && (selectedProduct.categoryId === "bolos-de-festa" || selectedProduct.slug === "bolo-de-festa") && (
        <CakeConfigurator 
          product={selectedProduct} 
          isOpen={isCakeConfigOpen} 
          onClose={() => setIsCakeConfigOpen(false)} 
        />
      )}

      {/* Sweets & Salgados Configurator */}
      {selectedProduct && (selectedProduct.categoryId === "doces" || selectedProduct.categoryId === "salgados") && (
        <BulkConfigurator 
          product={selectedProduct} 
          isOpen={isBulkConfigOpen} 
          onClose={() => setIsBulkConfigOpen(false)} 
        />
      )}
    </main>
  );
}
