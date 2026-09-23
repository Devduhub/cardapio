import { MercadoPagoConfig, Preference } from 'mercadopago';

// Initialize the Mercado Pago client
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || '', 
  options: { timeout: 5000, idempotencyKey: 'abc' } // idempotency can be passed per request later
});

export const mpPreference = new Preference(client);

export interface MPItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
}

export async function createMPPreference(
  items: MPItem[], 
  orderPublicId: string, 
  payerName: string, 
  payerPhone: string
) {
  if (!process.env.MP_ACCESS_TOKEN) {
    console.warn("MP_ACCESS_TOKEN is not set. Skipping MP preference creation.");
    return null;
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  try {
    const response = await mpPreference.create({
      body: {
        items,
        external_reference: orderPublicId,
        payer: {
          name: payerName,
          phone: {
            number: payerPhone,
          }
        },
        back_urls: {
          success: `${baseUrl}/pedido/${orderPublicId}?status=success`,
          failure: `${baseUrl}/pedido/${orderPublicId}?status=failure`,
          pending: `${baseUrl}/pedido/${orderPublicId}?status=pending`,
        }
      }
    });

    return {
      id: response.id,
      init_point: response.init_point, // Checkout Pro URL
      sandbox_init_point: response.sandbox_init_point,
    };
  } catch (error) {
    console.error("Mercado Pago preference creation failed:", error);
    return null;
  }
}
