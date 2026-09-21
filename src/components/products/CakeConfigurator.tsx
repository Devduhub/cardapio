"use client";

import React, { useState, useMemo } from "react";
import { Product, CakeConfig } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useCartStore } from "@/store/useCartStore";

export const CAKE_FLAVORS = [
  // Tradicionais (R$ 89,90 / kg)
  { id: "abacaxi-coco", name: "Abacaxi c/ Coco", price: 89.90, category: "Tradicional" },
  { id: "alpino", name: "Alpino", price: 89.90, category: "Tradicional" },
  { id: "bicho-de-pe", name: "Bicho de Pé", price: 89.90, category: "Tradicional" },
  { id: "brigadeiro", name: "Brigadeiro", price: 89.90, category: "Tradicional" },
  { id: "brigadeiro-branco", name: "Brigadeiro Branco", price: 89.90, category: "Tradicional" },
  { id: "brigadeiro-crocante", name: "Brigadeiro Crocante", price: 89.90, category: "Tradicional" },
  { id: "chandelle", name: "Chandelle", price: 89.90, category: "Tradicional" },
  { id: "cocada-cremosa", name: "Cocada Cremosa", price: 89.90, category: "Tradicional" },
  { id: "coco-ameixa", name: "Coco c/ Ameixa", price: 89.90, category: "Tradicional" },
  { id: "creme-laka", name: "Creme Laka", price: 89.90, category: "Tradicional" },
  { id: "creme-laka-trufado", name: "Creme Laka c/ Trufado", price: 89.90, category: "Tradicional" },
  { id: "creme-suico-abacaxi", name: "Creme Suíço c/ Abacaxi", price: 89.90, category: "Tradicional" },
  { id: "doce-leite-abacaxi", name: "Doce de Leite c/ Abacaxi", price: 89.90, category: "Tradicional" },
  { id: "doce-leite-ameixa", name: "Doce de Leite c/ Ameixa", price: 89.90, category: "Tradicional" },
  { id: "doce-leite-beijinho", name: "Doce de Leite c/ Beijinho", price: 89.90, category: "Tradicional" },
  { id: "doce-leite-coco", name: "Doce de Leite c/ Coco", price: 89.90, category: "Tradicional" },
  { id: "doce-leite-ninho", name: "Doce de Leite c/ Ninho", price: 89.90, category: "Tradicional" },
  { id: "doce-leite-nozes", name: "Doce de Leite c/ Nozes", price: 89.90, category: "Tradicional" },
  { id: "doce-leite-trufado", name: "Doce de Leite c/ Trufado", price: 89.90, category: "Tradicional" },
  { id: "dois-amores", name: "Dois Amores", price: 89.90, category: "Tradicional" },
  { id: "floresta-negra", name: "Floresta Negra", price: 89.90, category: "Tradicional" },
  { id: "mousse-abacaxi", name: "Mousse de Abacaxi", price: 89.90, category: "Tradicional" },
  { id: "mousse-chocolate", name: "Mousse de Chocolate", price: 89.90, category: "Tradicional" },
  { id: "mousse-limao", name: "Mousse de Limão", price: 89.90, category: "Tradicional" },
  { id: "mousse-maracuja", name: "Mousse de Maracujá", price: 89.90, category: "Tradicional" },
  { id: "mousse-morango", name: "Mousse de Morango", price: 89.90, category: "Tradicional" },
  { id: "ninho-abacaxi", name: "Ninho c/ Abacaxi", price: 89.90, category: "Tradicional" },
  { id: "ninho-doce-leite", name: "Ninho c/ Doce de Leite", price: 89.90, category: "Tradicional" },
  { id: "ninho-nozes", name: "Ninho c/ Nozes", price: 89.90, category: "Tradicional" },
  { id: "ninho-trufado", name: "Ninho c/ Trufado", price: 89.90, category: "Tradicional" },
  { id: "oreo", name: "Oreo", price: 89.90, category: "Tradicional" },
  { id: "prestigio", name: "Prestígio", price: 89.90, category: "Tradicional" },
  { id: "sensacao", name: "Sensação", price: 89.90, category: "Tradicional" },
  { id: "sonho-de-valsa", name: "Sonho de Valsa", price: 89.90, category: "Tradicional" },
  { id: "trufado-prestigio", name: "Trufado c/ Prestígio", price: 89.90, category: "Tradicional" },
  { id: "trufado-choc-meio-amargo", name: "Trufado Chocolate Meio Amargo", price: 89.90, category: "Tradicional" },
  { id: "trufado-abacaxi", name: "Trufado de Abacaxi", price: 89.90, category: "Tradicional" },
  { id: "trufado-maracuja", name: "Trufado de Maracujá", price: 89.90, category: "Tradicional" },
  { id: "trufado-morango", name: "Trufado de Morango", price: 89.90, category: "Tradicional" },

  // Especiais (R$ 94,90 / kg)
  { id: "alpes-suicos", name: "Alpes Suíços", price: 94.90, category: "Especial" },
  { id: "brigadeiro-morango", name: "Brigadeiro c/ Morango", price: 94.90, category: "Especial" },
  { id: "creme-laka-morango", name: "Creme Laka c/ Morango", price: 94.90, category: "Especial" },
  { id: "creme-suico-frutas", name: "Creme Suíço c/ Frutas", price: 94.90, category: "Especial" },
  { id: "creme-suico-morango", name: "Creme Suíço c/ Morango", price: 94.90, category: "Especial" },
  { id: "doce-leite-morango", name: "Doce de Leite c/ Morango", price: 94.90, category: "Especial" },
  { id: "ferrero-rocher", name: "Ferrero Rocher", price: 94.90, category: "Especial" },
  { id: "floresta-frutas", name: "Floresta de Frutas", price: 94.90, category: "Especial" },
  { id: "floresta-morango", name: "Floresta de Morango", price: 94.90, category: "Especial" },
  { id: "kinder-bueno-ferrero", name: "Kinder Bueno com Ferrero", price: 94.90, category: "Especial" },
  { id: "leite-condensado-uva", name: "Leite Condensado c/ Uva", price: 94.90, category: "Especial" },
  { id: "leite-condensado-morango", name: "Leite Condensado c/ Morango", price: 94.90, category: "Especial" },
  { id: "ninho-ferrero", name: "Ninho c/ Ferrero", price: 94.90, category: "Especial" },
  { id: "ninho-morango", name: "Ninho c/ Morango", price: 94.90, category: "Especial" },
  { id: "ninho-uva", name: "Ninho c/ Uva", price: 94.90, category: "Especial" },
  { id: "trufado-morango-esp", name: "Trufado c/ Morango", price: 94.90, category: "Especial" },
];

const WEIGHTS = [1, 1.5, 2, 2.5, 3, 4, 5];
const SHAPES = ["Redondo", "Quadrado", "Retangular"];

interface CakeConfiguratorProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function CakeConfigurator({ product, isOpen, onClose }: CakeConfiguratorProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const addItem = useCartStore((state) => state.addItem);

  const [flavorSearch, setFlavorSearch] = useState("");
  const [flavorFilter, setFlavorFilter] = useState<"todos" | "Tradicional" | "Especial">("todos");
  const [flavor, setFlavor] = useState(CAKE_FLAVORS[0]);
  const [weight, setWeight] = useState(WEIGHTS[0]);
  const [shape, setShape] = useState(SHAPES[0]);
  const [decoration, setDecoration] = useState("Padrão");
  const [notes, setNotes] = useState("");

  const filteredFlavors = useMemo(() => {
    return CAKE_FLAVORS.filter((f) => {
      const matchesSearch = f.name.toLowerCase().includes(flavorSearch.toLowerCase());
      const matchesCategory = flavorFilter === "todos" || f.category === flavorFilter;
      return matchesSearch && matchesCategory;
    });
  }, [flavorSearch, flavorFilter]);

  const estimatedPrice = flavor.price * weight;

  const handleAddToCart = () => {
    const config: CakeConfig = {
      flavor: flavor.name,
      weight,
      shape,
      decoration,
      notes,
      flavorPrice: flavor.price,
    };

    addItem({
      id: crypto.randomUUID(),
      product,
      quantity: 1,
      unitPrice: estimatedPrice,
      totalPrice: estimatedPrice,
      config,
    });
    
    setFlavor(CAKE_FLAVORS[0]);
    setWeight(WEIGHTS[0]);
    onClose();
  };

  const Content = () => (
    <div className="flex flex-col gap-6 py-4 px-4 sm:px-0 max-h-[70vh] overflow-y-auto scrollbar-hide">
      
      {/* 1. Recheio/Sabor */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-primary">1. Sabor do Recheio ({CAKE_FLAVORS.length} opções)</h4>
          <span className="text-xs text-muted-foreground font-medium">Selecione 1 sabor</span>
        </div>

        {/* Filter Pills & Search */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
            <Input 
              placeholder="Buscar sabor (ex: Ninho, Morango, Alpino...)" 
              value={flavorSearch} 
              onChange={(e) => setFlavorSearch(e.target.value)} 
              className="pl-9 h-9 text-sm"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFlavorFilter("todos")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                flavorFilter === "todos" ? "bg-primary text-white" : "bg-secondary text-primary"
              }`}
            >
              Todos ({CAKE_FLAVORS.length})
            </button>
            <button
              type="button"
              onClick={() => setFlavorFilter("Tradicional")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                flavorFilter === "Tradicional" ? "bg-primary text-white" : "bg-secondary text-primary"
              }`}
            >
              Tradicionais (R$ 89,90/kg)
            </button>
            <button
              type="button"
              onClick={() => setFlavorFilter("Especial")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                flavorFilter === "Especial" ? "bg-primary text-white" : "bg-secondary text-primary"
              }`}
            >
              Especiais (R$ 94,90/kg)
            </button>
          </div>
        </div>

        {/* Flavors List */}
        <RadioGroup value={flavor.id} onValueChange={(val) => setFlavor(CAKE_FLAVORS.find(f => f.id === val) || CAKE_FLAVORS[0])} className="grid gap-2 max-h-56 overflow-y-auto pr-1">
          {filteredFlavors.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">Nenhum sabor encontrado.</p>
          ) : (
            filteredFlavors.map((f) => (
              <div 
                key={f.id} 
                className={`flex items-center space-x-2 border rounded-lg p-3 hover:bg-secondary/50 cursor-pointer transition-colors ${
                  flavor.id === f.id ? "border-primary bg-secondary/30 ring-1 ring-primary" : "border-border"
                }`}
              >
                <RadioGroupItem value={f.id} id={f.id} />
                <Label htmlFor={f.id} className="flex-1 cursor-pointer flex justify-between items-center text-sm">
                  <span className="font-medium text-primary">{f.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      f.category === "Especial" ? "bg-amber-100 text-amber-800" : "bg-blue-50 text-blue-700"
                    }`}>
                      {f.category}
                    </span>
                    <span className="text-muted-foreground font-semibold">R$ {f.price.toFixed(2).replace('.', ',')}/kg</span>
                  </div>
                </Label>
              </div>
            ))
          )}
        </RadioGroup>
      </div>

      {/* 2. Peso */}
      <div className="space-y-3">
        <h4 className="font-semibold text-primary">2. Peso Estimado (kg)</h4>
        <div className="flex flex-wrap gap-2">
          {WEIGHTS.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setWeight(w)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                weight === w 
                  ? "bg-primary text-white border-primary shadow-sm" 
                  : "bg-white text-foreground hover:bg-secondary border-border"
              }`}
            >
              {w} kg
            </button>
          ))}
        </div>
      </div>

      {/* 3. Formato */}
      <div className="space-y-3">
        <h4 className="font-semibold text-primary">3. Formato</h4>
        <div className="flex flex-wrap gap-2">
          {SHAPES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setShape(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                shape === s 
                  ? "bg-primary text-white border-primary shadow-sm" 
                  : "bg-white text-foreground hover:bg-secondary border-border"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Decoração */}
      <div className="space-y-3">
        <h4 className="font-semibold text-primary">4. Decoração</h4>
        <RadioGroup value={decoration} onValueChange={setDecoration} className="grid gap-2">
          <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-secondary/50 cursor-pointer">
            <RadioGroupItem value="Padrão" id="dec-padrao" />
            <Label htmlFor="dec-padrao" className="flex-1 cursor-pointer">
              <span className="font-medium">Decoração Padrão</span>
              <span className="text-xs text-muted-foreground block">Já inclusa no valor do kg.</span>
            </Label>
          </div>
          <div className="flex items-start space-x-2 border rounded-lg p-3 hover:bg-secondary/50 cursor-pointer">
            <RadioGroupItem value="Personalizada" id="dec-personalizada" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="dec-personalizada" className="cursor-pointer block font-medium">Decoração Personalizada</Label>
              <span className="text-xs text-muted-foreground block">Valor adicional a combinar no atendimento WhatsApp.</span>
            </div>
          </div>
        </RadioGroup>
        
        {decoration === "Personalizada" && (
          <div className="pt-2">
            <Label htmlFor="notes" className="mb-2 block text-xs font-semibold text-primary">Descreva a decoração desejada</Label>
            <Input 
              id="notes" 
              placeholder="Ex: Tema safari com nome Pedro 1 ano, tons de dourado..." 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        )}
      </div>

    </div>
  );

  const Footer = () => (
    <div className="flex flex-col gap-3 pt-4 sm:pt-0">
      <div className="flex justify-between items-center px-4 sm:px-0">
        <div className="flex flex-col">
          <span className="text-muted-foreground text-xs">Sabor selecionado:</span>
          <span className="text-sm font-semibold text-primary">{flavor.name} ({weight} kg)</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-muted-foreground block">Valor estimado</span>
          <span className="font-heading font-bold text-2xl text-primary">
            R$ {estimatedPrice.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>
      <button 
        onClick={handleAddToCart}
        className="w-full bg-[#C6A15B] hover:bg-[#B38E4B] text-white py-4 rounded-full font-medium transition-colors shadow-md flex-1"
      >
        Adicionar ao pedido
      </button>
      <p className="text-[10px] text-center text-muted-foreground">
        *Decorações personalizadas podem ter acréscimo informado no atendimento.
      </p>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[550px] p-6 gap-0">
          <DialogHeader className="mb-4">
            <DialogTitle className="font-heading text-2xl text-primary">Monte seu Bolo de Festa</DialogTitle>
            <DialogDescription>
              Escolha sabor, peso, formato e decoração.
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
          <DrawerTitle className="font-heading text-2xl text-primary">Monte seu Bolo de Festa</DrawerTitle>
          <DrawerDescription>
            Escolha sabor, peso, formato e decoração.
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
