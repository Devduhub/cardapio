import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // We can fetch by UUID (id) or by public_id
    // To handle both securely, we'll try to find by public_id first, since it's used in the URL
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('public_id', id)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);

  } catch (error: any) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
