import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customer_name,
      phone,
      desired_date,
      desired_time,
      fulfillment_type,
      address,
      subtotal,
      additional_total,
      estimated_total,
      notes,
      items,
      whatsapp_session_id,
      utm_source,
      utm_campaign
    } = body;

    // 1. Generate unique short public ID
    const publicId = `JC-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // 2. Insert or find customer (simplified for this MVP)
    let customerId = null;
    if (customer_name && phone) {
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .insert([{ name: customer_name, phone }])
        .select()
        .single();
      
      if (!customerError && customerData) {
        customerId = customerData.id;
      }
    }

    // 3. Insert order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          public_id: publicId,
          customer_id: customerId,
          customer_name,
          phone,
          desired_date,
          desired_time,
          fulfillment_type,
          address,
          subtotal,
          additional_total,
          estimated_total,
          notes,
          whatsapp_session_id,
          utm_source,
          utm_campaign,
          status: 'draft'
        }
      ])
      .select()
      .single();

    if (orderError) throw orderError;

    // 4. Insert order items
    if (items && items.length > 0) {
      const orderItems = items.map((item: any) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
        configurations: item.configurations
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;
    }

    // 5. Generate URLs
    // Base URL should come from env in production
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const shareUrl = `${baseUrl}/pedido/${publicId}`;

    // We can also trigger the webhook here asynchronously if needed
    // fetch(process.env.ORDER_WEBHOOK_URL, { method: 'POST', body: JSON.stringify(order) })

    return NextResponse.json({
      id: order.id,
      publicId: order.public_id,
      status: order.status,
      shareUrl: shareUrl
    });

  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
