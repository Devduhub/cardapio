"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Truck,
  CreditCard,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CartBar } from "@/components/layout/CartBar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutDrawer } from "@/components/checkout/CheckoutDrawer";
import { CakeConfigurator } from "@/components/products/CakeConfigurator";
import { BulkConfigurator } from "@/components/products/BulkConfigurator";
import { ProductDetailModal } from "@/components/products/ProductDetailModal";
import { SearchModal } from "@/components/layout/SearchModal";
import { PanoramicBanner } from "@/components/layout/PanoramicBanner";
import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";

interface CatalogClientProps {
  products: Product[];
}

export function CatalogClient({ products }: CatalogClientProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCakeConfigOpen, setIsCakeConfigOpen] = useState(false);
  const [isBulkConfigOpen, setIsBulkConfigOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const { isCartOpen, closeCart } = useCartStore();

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    if (product.categoryId === "bolos-de-festa") {
      setIsCakeConfigOpen(true);
    } else if (product.categoryId === "doces" || product.categoryId === "salgados") {
      setIsBulkConfigOpen(true);
    } else {
      setIsDetailModalOpen(true);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 145;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Filtered Product Groups
  const kitsFeatured = products.filter((p) => p.categoryId === "kits-festa").slice(0, 4);
  const bolosFesta = products.filter((p) => p.categoryId === "bolos-de-festa");
  const doces = products.filter((p) => p.categoryId === "doces");
  const salgados = products.filter((p) => p.categoryId === "salgados");
  const kitsTodos = products.filter((p) => p.categoryId === "kits-festa");
  const bolosCaseiros = products.filter((p) => p.categoryId === "bolos-caseiros");
  const tortas = products.filter((p) => p.categoryId === "tortas");
  const pudim = products.filter((p) => p.categoryId === "pudim");
  const travessas = products.filter((p) => p.categoryId === "travessas");
  const descartaveis = products.filter((p) => p.categoryId === "descartaveis");

  return (
    <div className="bg-[#F8F9FB] text-[#101828]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* ================================================================= */}
        {/* 1. SEÇÃO 1: KITS FESTA EM DESTAQUE */}
        {/* ================================================================= */}
        <section id="kits-festa-destaque" className="mb-14 sm:mb-16 scroll-mt-36">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-[#E4E7EC]">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#06295C] block mb-1.5">
                Praticidade para Celebrar
              </span>
              <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-semibold text-[#101828] tracking-tight leading-tight">
                Kits Festa em destaque
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#667085] mt-1 max-w-xl">
                Tudo o que você precisa para deixar a comemoração completa com bolo, salgados e docinhos artesanais.
              </p>
            </div>

            <button
              onClick={() => scrollToSection("kits-festa")}
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#06295C] hover:text-[#031C42] self-start md:self-auto py-1 group cursor-pointer"
            >
              <span>Ver todos os kits</span>
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          <ProductGrid products={kitsFeatured} onProductClick={handleProductClick} />
        </section>

        {/* ================================================================= */}
        {/* 2. FAIXA DE DIFERENCIAIS DA MARCA (TRUST PILLARS) */}
        {/* ================================================================= */}
        <section className="mb-14 sm:mb-16">
          <div className="bg-white rounded-[20px] border border-[#E4E7EC] p-6 sm:p-8 shadow-2xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#E4E7EC] flex items-center justify-center text-[#06295C] shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#101828]">Produção Artesanal</h3>
                  <p className="text-[13px] text-[#667085] mt-0.5 leading-relaxed">
                    Ingredientes selecionados e receitas tradicionais preparadas com rigor diário.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#E4E7EC] flex items-center justify-center text-[#06295C] shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#101828]">Sob Encomenda</h3>
                  <p className="text-[13px] text-[#667085] mt-0.5 leading-relaxed">
                    Bolos e doces feitos especialmente para a data e tamanho do seu evento.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#E4E7EC] flex items-center justify-center text-[#06295C] shrink-0">
                  <Truck size={20} />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#101828]">Retirada ou Entrega</h3>
                  <p className="text-[13px] text-[#667085] mt-0.5 leading-relaxed">
                    Agendamento pontual em São Paulo e região com embalagens protetoras.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F0] border border-[#E4E7EC] flex items-center justify-center text-[#06295C] shrink-0">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#101828]">Pagamento Seguro</h3>
                  <p className="text-[13px] text-[#667085] mt-0.5 leading-relaxed">
                    Pix com confirmação instantânea ou cartão de crédito parcelado.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 3. SEÇÃO: BOLOS DE FESTA */}
        {/* ================================================================= */}
        <section id="bolos-de-festa" className="mb-14 sm:mb-16 scroll-mt-36">
          <div className="mb-6 sm:mb-8 pb-4 border-b border-[#E4E7EC]">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#06295C] block mb-1.5">
              Personalizável
            </span>
            <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-semibold text-[#101828] tracking-tight leading-tight">
              Bolos de Festa
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#667085] mt-1 max-w-2xl">
              Escolha a massa, o recheio nobre, peso em kg, formato e acabamento para a sua celebração.
            </p>
          </div>

          <ProductGrid products={bolosFesta} onProductClick={handleProductClick} />
        </section>

        {/* ================================================================= */}
        {/* 4. SEÇÃO: DOCES TRADICIONAIS E ESPECIAIS */}
        {/* ================================================================= */}
        <section id="doces" className="mb-14 sm:mb-16 scroll-mt-36">
          <div className="mb-6 sm:mb-8 pb-4 border-b border-[#E4E7EC]">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#06295C] block mb-1.5">
              Docinhos Artesanais
            </span>
            <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-semibold text-[#101828] tracking-tight leading-tight">
              Doces Tradicionais e Especiais
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#667085] mt-1 max-w-2xl">
              Brigadeiros, beijinhos, cajuzinhos e sabores gourmet. Preço especial para encomendas por cento.
            </p>
          </div>

          <ProductGrid products={doces} onProductClick={handleProductClick} />
        </section>

        {/* ================================================================= */}
        {/* FAIXA PANORÂMICA COM FOTO DE FUNDO GASTRONÔMICA E OVERLAY NAVY */}
        {/* ================================================================= */}
        <PanoramicBanner />

        {/* ================================================================= */}
        {/* 5. BANNER EDITORIAL (CONFEITARIA CONTEMPORÂNEA) */}
        {/* ================================================================= */}
        <section className="mb-14 sm:mb-16">
          <div className="bg-[#FAF7F0] border border-[#E4E7EC] rounded-[24px] overflow-hidden p-6 sm:p-10 lg:p-12 shadow-2xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Image Left */}
              <div className="lg:col-span-5 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square rounded-[20px] overflow-hidden shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80"
                  alt="Alta confeitaria Jeny Confeitaria Gourmet"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
              </div>

              {/* Text Right */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left">
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#06295C] mb-2 block">
                  Feito para Celebrar
                </span>
                <h2 className="text-[26px] sm:text-[34px] lg:text-[38px] font-semibold text-[#101828] tracking-tight leading-[1.12] mb-4">
                  Da mesa ao último pedaço, cada detalhe importa.
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#667085] leading-relaxed mb-6 max-w-xl">
                  Nossas receitas combinam a tradição do carinho artesanal com o rigor técnico da alta confeitaria.
                  Recheios fartos, caldas equilibradas e acabamento refinado para que cada celebração se torne uma lembrança inesquecível.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => scrollToSection("bolos-de-festa")}
                    className="h-11 px-6 bg-[#06295C] hover:bg-[#031C42] active:scale-[0.99] text-white rounded-full font-semibold text-[14px] transition-all duration-200 flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Conhecer bolos de festa</span>
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => scrollToSection("kits-festa")}
                    className="h-11 px-6 bg-white hover:bg-[#F8F9FB] text-[#06295C] border border-[#E4E7EC] rounded-full font-medium text-[14px] transition-all duration-200 cursor-pointer"
                  >
                    <span>Ver kits para eventos</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 6. SEÇÃO: SALGADOS PARA FESTA */}
        {/* ================================================================= */}
        <section id="salgados" className="mb-14 sm:mb-16 scroll-mt-36">
          <div className="mb-6 sm:mb-8 pb-4 border-b border-[#E4E7EC]">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#06295C] block mb-1.5">
              Fritos, Assados e Congelados
            </span>
            <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-semibold text-[#101828] tracking-tight leading-tight">
              Salgados para Festa
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#667085] mt-1 max-w-2xl">
              Coxinhas crocantes, empadas amanteigadas, esfihas e risoles quentinhos para servir ou congelados para fritar na hora.
            </p>
          </div>

          <ProductGrid products={salgados} onProductClick={handleProductClick} />
        </section>

        {/* ================================================================= */}
        {/* 7. SEÇÃO: TODOS OS KITS E CAIXAS PRESENTE */}
        {/* ================================================================= */}
        <section id="kits-festa" className="mb-14 sm:mb-16 scroll-mt-36">
          <div className="mb-6 sm:mb-8 pb-4 border-b border-[#E4E7EC]">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#06295C] block mb-1.5">
              Todas as Opções
            </span>
            <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-semibold text-[#101828] tracking-tight leading-tight">
              Todos os Kits e Caixas Presente
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#667085] mt-1 max-w-2xl">
              Kits de festa dimensionados por número de convidados, Festa na Caixa, Caixas Mimo e Kits Escolares.
            </p>
          </div>

          <ProductGrid products={kitsTodos} onProductClick={handleProductClick} />
        </section>

        {/* ================================================================= */}
        {/* 8. SEÇÃO: BOLOS CASEIROS */}
        {/* ================================================================= */}
        <section id="bolos-caseiros" className="mb-14 sm:mb-16 scroll-mt-36">
          <div className="mb-6 sm:mb-8 pb-4 border-b border-[#E4E7EC]">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#06295C] block mb-1.5">
              Feitos Diariamente
            </span>
            <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-semibold text-[#101828] tracking-tight leading-tight">
              Bolos Caseiros
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#667085] mt-1 max-w-2xl">
              Bolos fofinhos perfeitos para o café da tarde: Cenoura com calda, Fubá com goiabada, Churros, Aipim e mais.
            </p>
          </div>

          <ProductGrid products={bolosCaseiros} onProductClick={handleProductClick} />
        </section>

        {/* ================================================================= */}
        {/* 9. SEÇÃO: TORTAS GOURMET */}
        {/* ================================================================= */}
        <section id="tortas" className="mb-14 sm:mb-16 scroll-mt-36">
          <div className="mb-6 sm:mb-8 pb-4 border-b border-[#E4E7EC]">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#06295C] block mb-1.5">
              Sobremesas Finas
            </span>
            <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-semibold text-[#101828] tracking-tight leading-tight">
              Tortas Gourmet
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#667085] mt-1 max-w-2xl">
              Disponíveis em fatia individual ou torta inteira decorada para o seu almoço ou evento especial.
            </p>
          </div>

          <ProductGrid products={tortas} onProductClick={handleProductClick} />
        </section>

        {/* ================================================================= */}
        {/* 10. SEÇÃO: PUDIM ARTESANAL */}
        {/* ================================================================= */}
        <section id="pudim" className="mb-14 sm:mb-16 scroll-mt-36">
          <div className="mb-6 sm:mb-8 pb-4 border-b border-[#E4E7EC]">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#06295C] block mb-1.5">
              Sobremesa Clássica
            </span>
            <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-semibold text-[#101828] tracking-tight leading-tight">
              Pudim Artesanal
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#667085] mt-1 max-w-2xl">
              Pudins aveludados e cremosos com farta calda dourada de caramelo. Opções em fatia individual ou forma inteira (1.5kg).
            </p>
          </div>

          <ProductGrid products={pudim} onProductClick={handleProductClick} />
        </section>

        {/* ================================================================= */}
        {/* 11. SEÇÃO: SOBREMESAS NA TRAVESSA */}
        {/* ================================================================= */}
        <section id="travessas" className="mb-14 sm:mb-16 scroll-mt-36">
          <div className="mb-6 sm:mb-8 pb-4 border-b border-[#E4E7EC]">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#06295C] block mb-1.5">
              Fartura & Sabor
            </span>
            <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-semibold text-[#101828] tracking-tight leading-tight">
              Sobremesas na Travessa
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#667085] mt-1 max-w-2xl">
              Travessas generosas de 1.2kg com morangos frescos, uvas selecionadas, banoffee e ganache nobre.
            </p>
          </div>

          <ProductGrid products={travessas} onProductClick={handleProductClick} />
        </section>

        {/* ================================================================= */}
        {/* 12. SEÇÃO: COMPLETE SUA FESTA */}
        {/* ================================================================= */}
        <section id="descartaveis" className="mb-14 sm:mb-16 scroll-mt-36">
          <div className="mb-6 sm:mb-8 pb-4 border-b border-[#E4E7EC]">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#06295C] block mb-1.5">
              Artigos & Utensílios
            </span>
            <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-semibold text-[#101828] tracking-tight leading-tight">
              Complete sua Festa
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#667085] mt-1 max-w-2xl">
              Velas numéricas com glitter, velas vulcão e faísca estrelar, além de pratinhos e garfinhos para servir seus convidados.
            </p>
          </div>

          <ProductGrid products={descartaveis} onProductClick={handleProductClick} />
        </section>

        {/* ================================================================= */}
        {/* 13. CTA FINAL (PRÉ-FOOTER) */}
        {/* ================================================================= */}
        <section className="mb-8">
          <div className="relative overflow-hidden bg-[#031C42] rounded-[24px] sm:rounded-[32px] p-8 sm:p-12 md:p-16 text-center text-white shadow-xl">
            <div
              className="pointer-events-none absolute left-1/2 -top-24 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
              style={{
                background: "radial-gradient(circle, #E9C84A 0%, rgba(6,41,92,0) 70%)",
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#E9C84A] mb-3">
                Encomendas & Atendimento
              </span>

              <h2 className="text-[28px] sm:text-[38px] md:text-[42px] font-semibold leading-[1.1] tracking-tight text-white mb-4">
                Vamos deixar sua próxima celebração ainda mais especial?
              </h2>

              <p className="text-[15px] sm:text-[17px] text-white/80 font-normal leading-relaxed mb-8 max-w-xl">
                Monte seu pedido diretamente pelo cardápio digital ou fale com nossa equipe no WhatsApp para tirar dúvidas sobre sabores e prazos.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
                <button
                  onClick={() => scrollToSection("kits-festa-destaque")}
                  className="w-full sm:w-auto h-[50px] px-8 bg-[#E9C84A] hover:bg-[#D4B236] text-[#031C42] font-semibold text-[15px] rounded-full transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(233,200,74,0.30)] cursor-pointer"
                >
                  <span>Explorar cardápio</span>
                  <ArrowRight size={17} />
                </button>

                <a
                  href="https://wa.me/5511966026794"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto h-[50px] px-7 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-full font-medium text-[15px] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} className="text-[#25D366]" />
                  <span>Falar no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectProduct={handleProductClick}
        products={products}
      />

      {/* Persistent Cart Bar for Mobile & Desktop Floating */}
      <CartBar />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Drawer */}
      <CheckoutDrawer
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* Cake Configurator Modal */}
      {selectedProduct && selectedProduct.categoryId === "bolos-de-festa" && (
        <CakeConfigurator
          product={selectedProduct}
          isOpen={isCakeConfigOpen}
          onClose={() => setIsCakeConfigOpen(false)}
        />
      )}

      {/* Bulk Sweets / Savories Configurator Modal */}
      {selectedProduct &&
        (selectedProduct.categoryId === "doces" || selectedProduct.categoryId === "salgados") && (
          <BulkConfigurator
            product={selectedProduct}
            isOpen={isBulkConfigOpen}
            onClose={() => setIsBulkConfigOpen(false)}
          />
        )}
    </div>
  );
}
