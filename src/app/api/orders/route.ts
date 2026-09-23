import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { mockProducts } from '@/data'; // fallback only
import { CAKE_FLAVORS } from '@/data/cakeFlavors';
import { createMPPreference, MPItem } from '@/lib/mercadopago';

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
      notes,
      items,
      whatsapp_session_id,
      utm_source,
      utm_campaign,
      is_quote
    } = body;

    // Convert empty strings to null for optional date/time fields
    const safeDate = desired_date && desired_date.trim() !== '' ? desired_date : null;
    const safeTime = desired_time && desired_time.trim() !== '' ? desired_time : null;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Pedido sem itens' }, { status: 400 });
    }

    // Fetch current prices from Supabase (slugs used as product_id on frontend)
    const slugs = items.map((i: any) => i.product_id);
    const { data: dbProducts } = await supabase
      .from('products')
      .select('id, slug, name, base_price, price_type')
      .in('slug', slugs);

    // Server-side validation of prices
    let calculatedSubtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      // Try DB first, fall back to mockProducts for dev
      const dbProduct = dbProducts?.find((p: any) => p.slug === item.product_id);
      const mockProduct = mockProducts.find(p => p.id === item.product_id);
      
      if (!dbProduct && !mockProduct) {
        return NextResponse.json({ error: `Produto não encontrado: ${item.product_id}` }, { status: 400 });
      }

      const productName = dbProduct?.name ?? mockProduct?.name ?? item.product_id;
      let unitPrice = dbProduct ? Number(dbProduct.base_price) : (mockProduct?.basePrice ?? 0);

      // Handle cake custom configs (price = flavorPrice × weight)
      if (item.configurations?.flavor && item.configurations?.weight) {
        const flavor = CAKE_FLAVORS.find(f => f.name === item.configurations.flavor);
        if (flavor) {
          unitPrice = flavor.price * item.configurations.weight;
        }
      }

      const totalPrice = unitPrice * item.quantity;
      calculatedSubtotal += totalPrice;

      validatedItems.push({
        product_id: dbProduct?.id ?? null,
        product_name: productName,
        quantity: item.quantity,
        unit_price: unitPrice,
        total_price: totalPrice,
        configurations: item.configurations || null
      });
    }

    const estimatedTotal = calculatedSubtotal;

    // 1. Generate unique short public ID
    const publicId = `JC-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // 2. Find or create customer
    let customerId = null;
    if (customer_name && phone) {
      // Try to find existing customer by phone first
      const { data: existing } = await supabaseAdmin
        .from('customers')
        .select('id')
        .eq('phone', phone)
        .maybeSingle();

      if (existing) {
        customerId = existing.id;
      } else {
        // Create new customer
        const { data: newCustomer } = await supabaseAdmin
          .from('customers')
          .insert([{ name: customer_name, phone }])
          .select('id')
          .single();
        if (newCustomer) customerId = newCustomer.id;
      }
    }

    // 3. Insert order
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert([
        {
          public_id: publicId,
          customer_id: customerId,
          customer_name,
          phone,
          desired_date: safeDate,
          desired_time: safeTime,
          fulfillment_type,
          address,
          subtotal: calculatedSubtotal,
          additional_total: 0,
          estimated_total: estimatedTotal,
          notes,
          whatsapp_session_id,
          utm_source,
          utm_campaign,
          status: is_quote ? 'draft_quote' : 'draft'
        }
      ])
      .select()
      .single();

    if (orderError) throw orderError;

    // 4. Insert order items
    if (validatedItems.length > 0) {
      const orderItems = validatedItems.map((item) => ({
        order_id: order.id,
        ...item
      }));

      const { error: itemsError } = await supabaseAdmin
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;
    }

    // 5. Generate URLs
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const shareUrl = `${baseUrl}/pedido/${publicId}`;

    // 6. Mercado Pago Integration for direct purchases
    let paymentUrl = null;
    let mpPaymentId = null;

    if (!is_quote && estimatedTotal > 0) {
      // Map items to MP format
      const mpItems: MPItem[] = validatedItems.map(item => ({
        id: item.product_id,
        title: item.product_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: 'BRL'
      }));

      const preference = await createMPPreference(
        mpItems,
        publicId,
        customer_name,
        phone
      );
      
      if (preference) {
        paymentUrl = preference.init_point;
        mpPaymentId = preference.id;

        // Update the order with Mercado Pago info
        await supabaseAdmin
          .from('orders')
          .update({
            asaas_payment_id: mpPaymentId, // Reusing column for preference id to avoid DB schema changes now
            payment_url: paymentUrl
          })
          .eq('id', order.id);
      }
    }

    return NextResponse.json({
      id: order.id,
      publicId: order.public_id,
      status: order.status,
      shareUrl: shareUrl,
      paymentUrl: paymentUrl
    });

  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
