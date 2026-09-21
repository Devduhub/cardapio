"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { useCartStore } from "@/store/useCartStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MessageCircle, CheckCircle2 } from "lucide-react";

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutDrawer({ isOpen, onClose }: CheckoutDrawerProps) {
  const { items, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("retirada");
  const [notes, setNotes] = useState("");

  const handleWhatsAppCheckout = () => {
    const shortId = `JC-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    
    const itemsText = items.map(item => {
      let text = `• ${item.quantity}x ${item.product.name}\n`;
      if (item.config) {
        if (item.config.flavor) text += `  Sabor: ${item.config.flavor}\n`;
        if (item.config.weight) text += `  Peso: ${item.config.weight}kg\n`;
        if (item.config.shape) text += `  Formato: ${item.config.shape}\n`;
        if (item.config.decoration) text += `  Decoração: ${item.config.decoration}\n`;
        if (item.config.flavors) {
          text += `  Sabores: ${item.config.flavors.map((f: any) => `${f.quantity}x ${f.name}`).join(', ')}\n`;
        }
      }
      text += `  R$ ${item.totalPrice.toFixed(2).replace('.', ',')}\n`;
      return text;
    }).join('\n');

    const message = `Olá! Montei meu pedido pelo cardápio da Jeny Confeitaria Gourmet 💙

Pedido: #${shortId}

Itens:
${itemsText}
Tipo de Recebimento: ${type === 'retirada' ? 'Retirada na loja' : 'Entrega'}
Data desejada: ${date}
Horário: ${time}

Nome: ${name}
WhatsApp: ${whatsapp}
${notes ? `\nObservações: ${notes}\n` : ''}
Total estimado: R$ ${subtotal.toFixed(2).replace('.', ',')}

Gostaria de confirmar a disponibilidade e o valor final.`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "5511966026794";
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(url, "_blank");
    onClose();
  };

  const isFormValid = name.trim().length >= 2 && whatsapp.trim().length >= 8 && date && time;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l border-[rgba(1,29,77,0.16)] bg-white">
        
        <SheetHeader className="p-6 border-b border-[rgba(1,29,77,0.16)] text-left bg-[#011D4D] text-white">
          <SheetTitle className="font-heading text-2xl text-white">
            Só falta combinar os detalhes
          </SheetTitle>
          <SheetDescription className="text-white/80 text-xs">
            Preencha seus dados para enviar o pedido direto para o nosso WhatsApp.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-5">
          <div className="space-y-4 text-sm text-[#011D4D]">
            
            <div>
              <Label htmlFor="name" className="text-xs font-semibold text-[#011D4D] mb-1.5 block">
                Seu Nome *
              </Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Como gostaria de ser chamado?" 
                className="h-11 border-[rgba(1,29,77,0.16)] focus:border-[#011D4D] focus:ring-1 focus:ring-[#011D4D] rounded-xl text-sm"
              />
            </div>
            
            <div>
              <Label htmlFor="whatsapp" className="text-xs font-semibold text-[#011D4D] mb-1.5 block">
                Seu WhatsApp *
              </Label>
              <Input 
                id="whatsapp" 
                value={whatsapp} 
                onChange={(e) => setWhatsapp(e.target.value)} 
                placeholder="(11) 90000-0000" 
                type="tel"
                className="h-11 border-[rgba(1,29,77,0.16)] focus:border-[#011D4D] focus:ring-1 focus:ring-[#011D4D] rounded-xl text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="date" className="text-xs font-semibold text-[#011D4D] mb-1.5 block">
                  Data desejada *
                </Label>
                <Input 
                  id="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  type="date"
                  className="h-11 border-[rgba(1,29,77,0.16)] focus:border-[#011D4D] rounded-xl text-xs"
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-xs font-semibold text-[#011D4D] mb-1.5 block">
                  Horário *
                </Label>
                <Input 
                  id="time" 
                  value={time} 
                  onChange={(e) => setTime(e.target.value)} 
                  type="time"
                  className="h-11 border-[rgba(1,29,77,0.16)] focus:border-[#011D4D] rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-[#011D4D] mb-2 block">
                Tipo de recebimento *
              </Label>
              <RadioGroup value={type} onValueChange={setType} className="grid grid-cols-2 gap-3">
                <div className={`flex items-center space-x-2 border rounded-xl p-3 cursor-pointer transition-colors ${
                  type === "retirada" ? "border-[#011D4D] bg-[#F7F8FA] font-semibold" : "border-[rgba(1,29,77,0.16)]"
                }`}>
                  <RadioGroupItem value="retirada" id="retirada" />
                  <Label htmlFor="retirada" className="cursor-pointer text-xs">Retirada na loja</Label>
                </div>
                <div className={`flex items-center space-x-2 border rounded-xl p-3 cursor-pointer transition-colors ${
                  type === "entrega" ? "border-[#011D4D] bg-[#F7F8FA] font-semibold" : "border-[rgba(1,29,77,0.16)]"
                }`}>
                  <RadioGroupItem value="entrega" id="entrega" />
                  <Label htmlFor="entrega" className="cursor-pointer text-xs">Entrega</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="notes" className="text-xs font-semibold text-[#011D4D] mb-1.5 block">
                Observações do pedido (Opcional)
              </Label>
              <Input 
                id="notes" 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
                placeholder="Ex: Restrições, cores de fita, cartão de presente..." 
                className="h-11 border-[rgba(1,29,77,0.16)] focus:border-[#011D4D] rounded-xl text-sm"
              />
            </div>

          </div>
        </div>

        <SheetFooter className="p-6 border-t border-[rgba(1,29,77,0.16)] mt-auto flex-col bg-[#F7F8FA]">
          <div className="flex justify-between items-center w-full mb-4">
            <span className="text-sm font-medium text-[#526070]">Total estimado</span>
            <span className="font-heading text-2xl font-bold text-[#011D4D]">
              R$ {subtotal.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <button 
            onClick={handleWhatsAppCheckout}
            disabled={!isFormValid}
            className="w-full bg-[#011D4D] hover:bg-[#01245F] active:bg-[#01163E] disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} className="text-[#25D366]" />
            <span>Finalizar pelo WhatsApp</span>
          </button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}
