import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Asaas Webhook Documentation: https://docs.asaas.com/docs/webhooks
export async function POST(request: Request) {
  try {
    // Basic security: require a pre-shared token from Asaas
    const asaasToken = request.headers.get('asaas-access-token');
    const expectedToken = process.env.ASAAS_WEBHOOK_TOKEN;
    
    if (expectedToken && asaasToken !== expectedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await request.json();
    console.log('Received Asaas Webhook:', payload.event, payload.payment?.id);

    // We only care about successful payments for now
    if (payload.event === 'PAYMENT_RECEIVED' || payload.event === 'PAYMENT_CONFIRMED') {
      const payment = payload.payment;
      
      // externalReference should contain our order's public_id (e.g., JC-ABCD)
      const orderPublicId = payment.externalReference;
      
      if (orderPublicId) {
        // Update order status in Supabase
        const { data, error } = await supabaseAdmin
          .from('orders')
          .update({ 
            status: 'confirmed',
            // Optional: You could save payment_id or specific Asaas data in a JSONB column
          })
          .eq('public_id', orderPublicId)
          .select();
          
        if (error) {
          console.error('Error updating order:', error);
          throw error;
        }
        
        console.log(`Order ${orderPublicId} confirmed successfully via Asaas.`);
      }
    }

    return NextResponse.json({ success: true, message: 'Webhook processed' });
  } catch (error: any) {
    console.error('Error processing Asaas webhook:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
