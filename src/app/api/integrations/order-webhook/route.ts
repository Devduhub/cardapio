import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // Here we would handle incoming webhook events
    // Example: status updates from n8n, make, evolution-api or whatsapp agent
    
    console.log('Received Webhook:', payload);

    // If the event is order.created, maybe we notify a local dashboard or external ERP
    if (payload.event === 'order.created') {
      // Process...
    }

    return NextResponse.json({ success: true, message: 'Webhook received' });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
