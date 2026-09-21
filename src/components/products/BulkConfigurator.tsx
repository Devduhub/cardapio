"use client";

import React, { useState, useMemo } from "react";
import { Product, SweetsConfig } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useCartStore } from "@/store/useCartStore";
import { Plus, Minus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const TRADICIONAL_FLAVORS = [
  "Brigadeiro", "Beijinho", "Olho de Sogra", "Cajuzinho", "Brigadeiro crocante",
  "Bicho de pé", "Maçazinha", "Brigadeiro de limão c/ Suspiro", "Brigadeiro de churros",
  "Brigadeiro de abacaxi", "Casadinho", "Moranguinho", "Fantasia de coco",
  "Doce de leite ninho", "Brigadeiro c/ paçoca", "Brigadeiro c/ amendoim", "Prestígio"
];

const ESPECIAL_FLAVORS = [
  "Brigadeiro branco c/ uva", "Brigadeiro branco c/ nozes", "Brigadeiro tradicional c/ uva",
  "Brigadeiro c/ cereja", "Brigadeiro c/ Óreo", "Brigadeiro com Confete", "Brigadeiro com Nutella",
  "Brigadeiro tradicional com Nutella", "Ninho c/ Goiabada", "Ninho c/ Nutella", "Ninho c/ Uva",
  "Maracujá c/ Choc. Meio Amargo", "Maracujá c/ Nutella"
];

const SALGADOS_FRITOS_FLAVORS = [
  "Coxinha", "Bolinho de Queijo", "Bolinho de Carne", "Bolinho de Calabresa",
  "Rissoles de Pizza", "Rissoles de Palmito", "Rissoles de Presunto e Queijo",
  "Kibe", "Salsicha", "Milho com Catupiry", "Espinafre com Ricota"
];

const SALGADOS_ASSADOS_FLAVORS = [
  "Esfiha de Carne", "Esfiha de Frango", "Esfiha de Calabresa",
  "Empada de Palmito", "Empada de Frango", "Enrolado de Salsicha", "Bauru"
];

interface BulkConfiguratorProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function BulkConfigurator({ product, isOpen, onClose }: BulkConfiguratorProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const addItem = useCartStore((state) => state.addItem);

  const [searchQuery, setSearchQuery] = useState("");
  const [flavorQuantities, setFlavorQuantities] = useState<Record<string, number>>({});

  const availableFlavors = useMemo(() => {
    if (product.slug === "doces-especiais") return ESPECIAL_FLAVORS;
    if (product.slug === "doces-tradicionais") return TRADICIONAL_FLAVORS;
    if (product.slug === "salgados-assados") return SALGADOS_ASSADOS_FLAVORS;
    return SALGADOS_FRITOS_FLAVORS;
  }, [product]);

  const filteredFlavors = useMemo(() => {
    return availableFlavors.filter(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [availableFlavors, searchQuery]);

  const totalQuantity = useMemo(() => {
    return Object.values(flavorQuantities).reduce((acc, curr) => acc + curr, 0);
  }, [flavorQuantities]);

  const estimatedPrice = useMemo(() => {
    if (product.categoryId === "doces") {
      if (product.slug === "doces-tradicionais") {
        if (totalQuantity >= 100) return (totalQuantity / 100) * 116.00;
        return totalQuantity * 1.40;
      } else {
        if (totalQuantity >= 100) return (totalQuantity / 100) * 145.00;
        return totalQuantity * 1.70;
      }
    } else if (product.categoryId === "salgados") {
      if (product.slug === "salgados-congelados") {
        if (totalQuantity >= 50) return (totalQuantity / 50) * 53.00;
        if (totalQuantity >= 25) return (totalQuantity / 25) * 27.00;
        return totalQuantity * 1.08;
      } else {
        if (totalQuantity >= 100) return (totalQuantity / 100) * 116.00;
        if (totalQuantity >= 50) return (totalQuantity / 50) * 58.00;
        return totalQuantity * 1.40;
      }
    }
    return totalQuantity * product.basePrice;
  }, [totalQuantity, product]);

  const stepQuantity = product.categoryId === "salgados" && product.slug === "salgados-congelados" ? 25 : 10;

  const handleIncrement = (flavor: string) => {
    setFlavorQuantities(prev => ({
      ...prev,
      [flavor]: (prev[flavor] || 0) + stepQuantity
    }));
  };

  const handleDecrement = (flavor: string) => {
    setFlavorQuantities(prev => {
      const current = prev[flavor] || 0;
      if (current <= 0) return prev;
      const next = { ...prev, [flavor]: current - stepQuantity };
      if (next[flavor] <= 0) delete next[flavor];
      return next;
    });
  };

  const handleAddToCart = () => {
    if (totalQuantity === 0) return;

    const flavorsConfig = Object.entries(flavorQuantities).map(([name, quantity]) => ({
      name,
      quantity,
    }));

    const config: SweetsConfig = {
      flavors: flavorsConfig,
    };

    addItem({
      id: crypto.randomUUID(),
      product,
      quantity: totalQuantity,
      unitPrice: estimatedPrice / totalQuantity,
      totalPrice: estimatedPrice,
      config,
    });
    
    setFlavorQuantities({});
    onClose();
  };

  const Content = () => (
    <div className="flex flex-col gap-4 py-4 px-4 sm:px-0 max-h-[70vh] overflow-y-auto scrollbar-hide">
      
      <div className="bg-secondary p-4 rounded-xl border border-primary/10">
        <h4 className="font-semibold text-primary mb-1 text-sm">Tabela de Preços & Quantidades</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {product.categoryId === "doces" ? (
            product.slug === "doces-tradicionais"
              ? "Cento (100 uni): R$ 116,00 | Pedidos menores: R$ 1,40 por unidade (Passo de 10 em 10)."
              : "Cento (100 uni): R$ 145,00 | Pedidos menores: R$ 1,70 por unidade (Passo de 10 em 10)."
          ) : product.slug === "salgados-congelados" ? (
            "25 uni: R$ 27,00 | 50 uni: R$ 53,00 (Passo de 25 em 25)."
          ) : (
            "50 uni: R$ 58,00 | 100 uni: R$ 116,00 | Avulso: R$ 1,40/uni (Passo de 10 em 10)."
          )}
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
        <Input 
          placeholder="Buscar sabor..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-9 text-sm"
        />
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {filteredFlavors.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">Nenhum sabor encontrado.</p>
        ) : (
          filteredFlavors.map((flavor) => (
            <div key={flavor} className="flex items-center justify-between border-b border-border pb-3 pt-1">
              <span className="font-medium text-primary text-sm">{flavor}</span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleDecrement(flavor)}
                  disabled={!flavorQuantities[flavor]}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-40 disabled:hover:bg-secondary disabled:hover:text-primary"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center font-semibold text-sm">{flavorQuantities[flavor] || 0}</span>
                <button 
                  onClick={() => handleIncrement(flavor)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );

  const Footer = () => (
    <div className="flex flex-col gap-3 pt-4 sm:pt-0">
      <div className="flex justify-between items-center px-4 sm:px-0">
        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs">Total selecionado:</span>
          <span className="text-sm font-semibold text-primary">
            {totalQuantity} {totalQuantity === 1 ? 'unidade' : 'unidades'}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs text-muted-foreground block">Total estimado</span>
          <span className="font-heading font-bold text-2xl text-primary">
            R$ {estimatedPrice.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>
      <button 
        onClick={handleAddToCart}
        disabled={totalQuantity === 0}
        className="w-full bg-[#C6A15B] hover:bg-[#B38E4B] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-full font-medium transition-colors shadow-md flex-1"
      >
        Adicionar ao pedido
      </button>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px] p-6 gap-0">
          <DialogHeader className="mb-4">
            <DialogTitle className="font-heading text-2xl text-primary">Escolha os sabores</DialogTitle>
            <DialogDescription>
              Selecione as quantidades para {product.name}.
            </DialogDescription>
          </DialogHeader>
          <Content />
          <DialogFooter className="mt-4 flex-col border-t pt-4">
            <Footer />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[92vh]">
        <DrawerHeader className="text-left border-b pb-4">
          <DrawerTitle className="font-heading text-2xl text-primary">Escolha os sabores</DrawerTitle>
          <DrawerDescription>
            Selecione as quantidades para {product.name}.
          </DrawerDescription>
        </DrawerHeader>
        <Content />
        <DrawerFooter className="border-t">
          <Footer />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
