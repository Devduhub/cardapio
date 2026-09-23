"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { 
  Package, 
  ChefHat, 
  Check, 
  Clock, 
  CreditCard, 
  Calculator, 
  XCircle,
  Truck,
  MapPin,
  CalendarDays,
  RefreshCw,
  MessageCircle,
  ArrowRight
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Type definitions for the fetched data
type OrderItem = {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  configurations: any;
};

type Order = {
  id: string;
  public_id: string;
  customer_name: string;
  phone: string;
  desired_date: string;
  desired_time: string;
  fulfillment_type: string;
  address: string | null;
  subtotal: number;
  status: string;
  notes: string;
  order_items: OrderItem[];
  created_at: string;
  payment_url: string | null;
};

export default function PedidoTrackingPage() {
  const params = useParams();
  const id = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${id}`);
      if (!res.ok) {
        throw new Error("Pedido não encontrado");
      }
      const data = await res.json();
      setOrder(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    
    // Poll every 15 seconds to update status
    const interval = setInterval(() => {
      fetchOrder();
    }, 15000);
    
    return () => clearInterval(interval);
  }, [id]);

  const getStatusInfo = (status: string, fulfillmentType: string) => {
    switch (status) {
      case 'draft_quote':
        return {
          label: "Aguardando Orçamento",
          description: "Estamos analisando os detalhes para enviar o orçamento final pelo WhatsApp.",
          icon: <Calculator className="w-5 h-5 text-[#F5A000]" />,
          step: 1
        };
      case 'draft':
        return {
          label: "Aguardando pagamento",
          description: "Realize o pagamento para confirmarmos e iniciarmos o preparo do seu pedido.",
          icon: <CreditCard className="w-5 h-5 text-[#F5A000]" />,
          step: 1
        };
      case 'confirmed':
        return {
          label: "Pedido Confirmado",
          description: "Pagamento aprovado. Seu pedido será preparado no prazo estabelecido.",
          icon: <Check className="w-5 h-5 text-[#16A34A]" />,
          step: 2
        };
      case 'preparing':
        return {
          label: "Em Preparo",
          description: "Nossos confeiteiros começaram a preparar seu pedido com muito carinho.",
          icon: <ChefHat className="w-5 h-5 text-[#082B5C]" />,
          step: 3
        };
      case 'ready':
        return {
          label: fulfillmentType === 'entrega' ? "Saiu para entrega" : "Pronto para retirada",
          description: fulfillmentType === 'entrega' 
            ? "O pedido está a caminho. Fique atento no endereço informado." 
            : "Tudo pronto. O pedido já pode ser retirado na loja.",
          icon: fulfillmentType === 'entrega' 
            ? <Truck className="w-5 h-5 text-[#082B5C]" /> 
            : <Package className="w-5 h-5 text-[#082B5C]" />,
          step: 4
        };
      case 'completed':
        return {
          label: "Concluído",
          description: "Pedido finalizado com sucesso. Agradecemos a preferência.",
          icon: <Check className="w-5 h-5 text-[#16A34A]" />,
          step: 5
        };
      case 'cancelled':
        return {
          label: "Cancelado",
          description: "Este pedido foi cancelado. Se precisar, entre em contato com nosso atendimento.",
          icon: <XCircle className="w-5 h-5 text-[#D92D20]" />,
          step: 0
        };
      default:
        return {
          label: "Processando",
          description: "Aguarde um instante enquanto atualizamos o status.",
          icon: <Clock className="w-5 h-5 text-[#667085]" />,
          step: 0
        };
    }
  };

  if (loading && !order) {
    return (
      <div className="min-h-screen bg-[#F6F8FB] flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-[#101828]">
            <RefreshCw className="w-6 h-6 animate-spin text-[#082B5C]" />
            <p className="font-medium text-[14px]">Carregando pedido...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#F6F8FB] flex flex-col font-sans">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#FEF3F2] flex items-center justify-center mb-6">
            <XCircle className="w-6 h-6 text-[#D92D20]" />
          </div>
          <h1 className="text-[24px] font-bold text-[#101828] mb-2 tracking-tight">Pedido não encontrado</h1>
          <p className="text-[#667085] text-[15px] max-w-sm mb-8">
            Verifique se o link está correto ou entre em contato com nosso atendimento.
          </p>
          <a href="/" className="inline-flex h-[52px] items-center justify-center bg-[#082B5C] text-white px-8 rounded-[12px] font-semibold text-[15px] hover:bg-[#061F43] transition-all duration-200">
            Voltar ao Cardápio
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status, order.fulfillment_type);
  const steps = ['Pedido', 'Confirmado', 'Preparo', 'Entrega', 'Concluído'];

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex flex-col font-sans text-[#101828]">
      <Header />
      
      <main className="flex-1 w-full max-w-[1080px] mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-6">
        
        {/* Card Principal */}
        <div className="bg-white rounded-[20px] border border-[#E4E7EC] shadow-[0_1px_2px_rgba(16,24,40,0.03),0_8px_24px_rgba(16,24,40,0.05)] p-6 sm:p-10 flex flex-col items-center text-center">
          
          <span className="text-[12px] font-semibold tracking-[0.1em] uppercase text-[#667085] mb-2">
            Acompanhe seu pedido
          </span>
          
          <h1 className="text-[28px] sm:text-[32px] font-bold text-[#101828] tracking-tight mb-8">
            #{order.public_id}
          </h1>
          
          <div className="w-12 h-12 rounded-full bg-[#F6F8FB] border border-[#E4E7EC] flex items-center justify-center mb-5">
            {statusInfo.icon}
          </div>
          
          <h2 className="text-[24px] sm:text-[28px] font-bold text-[#101828] tracking-tight mb-3">
            {statusInfo.label}
          </h2>
          
          <p className="text-[15px] text-[#667085] max-w-[480px] mx-auto mb-10 leading-relaxed">
            {statusInfo.description}
          </p>

          {/* Timeline Premium */}
          {order.status !== 'cancelled' && (
            <div className="w-full max-w-[600px] mx-auto mb-10">
              <div className="relative flex justify-between items-center w-full">
                {/* Background Line */}
                <div className="absolute top-[11px] left-[5%] right-[5%] h-[2px] bg-[#E4E7EC] -z-10" />
                
                {/* Active Line Progress */}
                <div 
                  className="absolute top-[11px] left-[5%] h-[2px] bg-[#082B5C] -z-10 transition-all duration-500 ease-in-out" 
                  style={{ width: `${Math.max(0, (statusInfo.step - 1) * (90 / (steps.length - 1)))}%` }} 
                />

                {steps.map((step, idx) => {
                  const isPast = idx < statusInfo.step - 1;
                  const isCurrent = idx === statusInfo.step - 1;
                  const isFuture = idx > statusInfo.step - 1;

                  return (
                    <div key={step} className="flex flex-col items-center gap-3 bg-white px-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-[2px] transition-colors duration-300 ${
                        isPast 
                          ? 'bg-[#082B5C] border-[#082B5C]' 
                          : isCurrent 
                            ? 'bg-white border-[#082B5C]' 
                            : 'bg-white border-[#E4E7EC]'
                      }`}>
                        {isPast && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                        {isCurrent && <div className="w-2 h-2 rounded-full bg-[#082B5C]" />}
                      </div>
                      <span className={`text-[13px] font-semibold ${
                        isCurrent ? 'text-[#101828]' : 'text-[#667085]'
                      }`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Main CTAs */}
          {order.status === 'draft' && order.payment_url && (
            <a 
              href={order.payment_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[56px] w-full sm:w-auto items-center justify-center gap-3 bg-[#082B5C] text-white px-8 rounded-[14px] font-semibold text-[16px] hover:bg-[#061F43] hover:-translate-y-[1px] hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#082B5C]"
            >
              <CreditCard className="w-5 h-5" />
              Efetuar pagamento
              <ArrowRight className="w-5 h-5 opacity-80" />
            </a>
          )}

          {order.status === 'draft_quote' && (
            <a 
              href={`https://wa.me/5511966026794?text=Ol%C3%A1%21%20Gostaria%20de%20verificar%20o%20or%C3%A7amento%20do%20meu%20pedido%20%23${order.public_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[56px] w-full sm:w-auto items-center justify-center gap-3 bg-[#16A34A] text-white px-8 rounded-[14px] font-semibold text-[16px] hover:bg-[#15803d] hover:-translate-y-[1px] hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#16A34A]"
            >
              <MessageCircle className="w-5 h-5" />
              Chamar no WhatsApp
              <ArrowRight className="w-5 h-5 opacity-80" />
            </a>
          )}
        </div>

        {/* Grid de Informações (2 cols desktop, 1 col mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card Data/Hora */}
          <div className="bg-white rounded-[16px] border border-[#E4E7EC] p-6 flex items-start gap-4 hover:shadow-[0_2px_8px_rgba(16,24,40,0.04)] transition-shadow duration-200">
            <div className="w-10 h-10 rounded-[10px] bg-[#F6F8FB] border border-[#E4E7EC] flex items-center justify-center shrink-0">
              <CalendarDays className="w-5 h-5 text-[#667085]" />
            </div>
            <div className="flex flex-col pt-1">
              <h3 className="text-[15px] font-semibold text-[#101828] mb-1">
                Data e horário
              </h3>
              <p className="text-[14px] font-medium text-[#101828] mb-0.5">
                {order.desired_date ? new Date(order.desired_date).toLocaleDateString('pt-BR') : 'Data a combinar'} 
                {order.desired_time ? ` às ${order.desired_time}` : ''}
              </p>
              <p className="text-[14px] text-[#667085]">
                {order.fulfillment_type === 'retirada' ? 'Retirada na loja' : 'Entrega no endereço'}
              </p>
            </div>
          </div>

          {/* Card Cliente/Endereço */}
          <div className="bg-white rounded-[16px] border border-[#E4E7EC] p-6 flex items-start gap-4 hover:shadow-[0_2px_8px_rgba(16,24,40,0.04)] transition-shadow duration-200">
            <div className="w-10 h-10 rounded-[10px] bg-[#F6F8FB] border border-[#E4E7EC] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#667085]" />
            </div>
            <div className="flex flex-col pt-1">
              <h3 className="text-[15px] font-semibold text-[#101828] mb-1">
                {order.fulfillment_type === 'entrega' ? 'Endereço de entrega' : 'Dados do cliente'}
              </h3>
              <p className="text-[14px] font-medium text-[#101828] mb-0.5">
                {order.customer_name}
              </p>
              {order.fulfillment_type === 'entrega' && order.address && (
                <div className="text-[14px] text-[#667085] flex flex-col gap-0.5 mt-1">
                  {/* Assumindo que o endereço está separado por vírgulas, quebra em linhas para visual mais limpo, ou renderiza como bloco */}
                  {order.address.split(',').map((part, i) => (
                    <span key={i}>{part.trim()}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Card Resumo dos Itens */}
        <div className="bg-white rounded-[16px] border border-[#E4E7EC] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Package className="w-5 h-5 text-[#667085]" />
            <h3 className="text-[16px] font-semibold text-[#101828]">Resumo dos itens</h3>
          </div>
          
          <div className="flex flex-col gap-6">
            {order.order_items.map((item, idx) => (
              <React.Fragment key={item.id || idx}>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col">
                    <p className="text-[15px] font-semibold text-[#101828] mb-1">
                      {item.quantity}x {item.product_name}
                    </p>
                    {item.configurations && (
                      <div className="text-[14px] text-[#667085] flex flex-col gap-1">
                        {item.configurations.flavor && <span>Sabor: {item.configurations.flavor}</span>}
                        {item.configurations.weight && <span>Peso: {item.configurations.weight}kg</span>}
                        {item.configurations.shape && <span>Formato: {item.configurations.shape}</span>}
                        {item.configurations.decoration && <span>Decoração: {item.configurations.decoration}</span>}
                      </div>
                    )}
                  </div>
                  <div className="text-[15px] font-semibold text-[#101828] whitespace-nowrap pt-0.5">
                    R$ {Number(item.total_price).toFixed(2).replace('.', ',')}
                  </div>
                </div>
                
                {/* Internal Divider except for last item */}
                {idx < order.order_items.length - 1 && (
                  <div className="w-full h-[1px] bg-[#F2F4F7]" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Section Divider */}
          <div className="w-full h-[1px] bg-[#E4E7EC] my-8" />

          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="text-[16px] font-semibold text-[#667085] uppercase tracking-wide">
              {order.status === 'draft_quote' ? 'Total Estimado' : 'Total'}
            </span>
            <span className="text-[28px] font-bold text-[#101828]">
              R$ {Number(order.subtotal).toFixed(2).replace('.', ',')}
            </span>
          </div>

          {/* Notas */}
          {order.notes && (
            <div className="mt-8 bg-[#F6F8FB] border border-[#E4E7EC] rounded-[12px] p-4">
              <p className="text-[12px] font-semibold text-[#101828] uppercase tracking-wide mb-2">
                Observações do pedido
              </p>
              <p className="text-[14px] text-[#667085] leading-relaxed">
                {order.notes}
              </p>
            </div>
          )}
        </div>

      </main>
      
      <Footer />
    </div>
  );
}

