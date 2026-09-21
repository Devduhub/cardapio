import React from "react";
import { MessageCircle, ArrowRight } from "lucide-react";

export function WhatsAppBanner() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center space-y-8 p-12 md:p-16 rounded-[2rem] bg-[#011D4D]">
          
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#E8D777]">
            Atendimento Personalizado
          </span>
          
          <h3 className="font-heading text-3xl md:text-5xl font-normal text-white max-w-2xl leading-tight">
            Tem alguma dúvida ou deseja personalizar um <span className="italic text-[#FBF59C]">pedido especial?</span>
          </h3>
          
          <p className="text-white/70 text-sm md:text-base max-w-xl font-light leading-relaxed">
            Nossa equipe está pronta para ajudar você a escolher os melhores sabores, montar kits exclusivos e organizar os detalhes da sua entrega.
          </p>
          
          <div className="pt-4">
            <a
              href="https://wa.me/5511966026794"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 bg-white text-[#011D4D] px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-[#FBF59C]"
            >
              <MessageCircle size={20} className="text-[#25D366]" />
              <span className="text-sm tracking-wide">Falar no WhatsApp</span>
              <ArrowRight size={18} className="text-[#011D4D]/50 group-hover:text-[#011D4D] group-hover:translate-x-1 transition-all" />
            </a>
          </div>
          
        </div>
      </div>
    </section>
  );
}
