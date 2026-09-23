import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        id,
        category_id,
        name,
        slug,
        short_description,
        description,
        base_price,
        price_type,
        unit,
        weight,
        image_url,
        active,
        featured,
        sort_order,
        categories (slug)
      `)
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;

    // Map DB columns to the Product interface used by the frontend
    const mapped = (products || []).map((p: any) => ({
      id: p.slug,                          // frontend uses slug as id for cart
      categoryId: p.categories?.slug ?? '', // slug of the category
      name: p.name,
      slug: p.slug,
      shortDescription: p.short_description,
      description: p.description,
      basePrice: Number(p.base_price),
      priceType: p.price_type,
      unit: p.unit,
      weight: p.weight,
      imageUrl: p.image_url,
    }));

    return NextResponse.json(mapped, {
      headers: {
        // Cache for 60 seconds on the CDN edge, re-validate in background
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      }
    });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
