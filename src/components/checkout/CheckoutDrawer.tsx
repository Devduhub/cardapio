"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("retirada");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // Build items payload
      const orderItems = items.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        configurations: item.config || null
      }));

      const payload = {
        customer_name: name,
        phone: whatsapp,
        desired_date: date,
        desired_time: time,
        fulfillment_type: type,
        address: type === 'entrega' ? address : null,
        notes,
        items: orderItems,
        is_quote: requiresQuote,
        utm_source: 'web',
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Falha ao salvar pedido no servidor');
      }
      if (requiresQuote) {
        const itemsText = items.map(item => {
          let text = `• ${item.quantity}x ${item.product.name}\n`;
          if (item.config) {
            if (item.config.flavor) text += `  Sabor: ${item.config.flavor}\n`;
            if (item.config.weight) text += `  Peso: ${item.config.weight}kg\n`;
            if (item.config.shape) text += `  Formato: ${item.config.shape}\n`;
            if (item.config.decoration) text += `  Decoração: ${item.config.decoration}\n`;
          }
          return text;
        }).join('\n');

        const intentText = "Gostaria de solicitar um orçamento para o pedido abaixo.";

        const message = `Olá! Montei meu pedido pelo cardápio da Jeny Confeitaria Gourmet 💙\n\n${intentText}\n\nPedido: #${data.publicId}\n\nItens:\n${itemsText}\nTipo de Recebimento: ${type === 'retirada' ? 'Retirada na loja' : 'Entrega'}\n${type === 'entrega' ? `Endereço: ${address}\n` : ''}Data desejada: ${date}\nHorário: ${time}\n\nNome: ${name}\nWhatsApp: ${whatsapp}\n${notes ? `\nObservações: ${notes}\n` : ''}\nLink para acompanhamento: ${data.shareUrl}\n\nTotal estimado: R$ ${subtotal.toFixed(2).replace('.', ',')}`;

        const encodedMessage = encodeURIComponent(message);
        const phoneNumber = "5511966026794";
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(url, "_blank");
      } else {
        // If it's a direct purchase, go to tracking page (which will have the Asaas payment link)
        router.push(`/pedido/${data.publicId}`);
      }
      
      clearCart();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao gerar o pedido. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Check if any item requires a custom quote
  const requiresQuote = items.some(item => 
    item.product.id === 'p1_custom' || 
    item.config?.decoration === 'Personalizada' ||
    item.product.priceType === 'quote'
  );

  // Data mínima é hoje
  const today = new Date().toISOString().split('T')[0];
  const isFormValid = name.trim().length >= 2 && whatsapp.trim().length >= 8 && (type === "retirada" || address.trim().length >= 5);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l border-[rgba(1,29,77,0.16)] bg-white">
        
        <SheetHeader className="p-6 border-b border-[rgba(1,29,77,0.16)] text-left bg-[#011D4D] text-white">
          <SheetTitle className="font-heading text-2xl text-white">
            Só falta combinar os detalhes
          </SheetTitle>
          <SheetDescription className="text-white/80 text-xs">
            Preencha seus dados para finalizar o pedido. A data e horário podem ser combinados depois.
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
                  Data desejada (Opcional)
                </Label>
                <Input 
                  id="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  type="date"
                  min={today}
                  className="h-11 border-[rgba(1,29,77,0.16)] focus:border-[#011D4D] rounded-xl text-xs"
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-xs font-semibold text-[#011D4D] mb-1.5 block">
                  Horário (Opcional)
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

            {type === "entrega" && (
              <div>
                <Label htmlFor="address" className="text-xs font-semibold text-[#011D4D] mb-1.5 block">
                  Endereço de Entrega *
                </Label>
                <Input 
                  id="address" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  placeholder="Rua, Número, Bairro, Ponto de Ref." 
                  className="h-11 border-[rgba(1,29,77,0.16)] focus:border-[#011D4D] rounded-xl text-sm"
                />
              </div>
            )}

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

          {requiresQuote && (
            <p className="text-xs text-[#EAB308] font-medium mb-3 bg-[#FEF9C3] p-2 rounded-md">
              Seu pedido contém itens personalizados. O valor é estimado e será confirmado no atendimento.
            </p>
          )}

          <button 
            onClick={handleCheckout}
            disabled={!isFormValid || isLoading}
            className="w-full bg-[#011D4D] hover:bg-[#01245F] active:bg-[#01163E] disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Processando...</span>
            ) : requiresQuote ? (
              <>
                <MessageCircle size={20} className="text-[#25D366]" />
                <span>Solicitar Orçamento no WhatsApp</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={20} className="text-[#25D366]" />
                <span>Confirmar Pedido</span>
              </>
            )}
          </button>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}
