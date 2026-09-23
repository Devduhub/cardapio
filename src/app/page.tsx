// Server Component — no "use client" directive here
import React from "react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { Footer } from "@/components/layout/Footer";
import { FloatingDecorations } from "@/components/layout/FloatingDecorations";
import { mockProducts } from "@/data";
import { Product } from "@/types";
import { CatalogClient } from "@/components/catalog/CatalogClient";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // Revalidate every 60 seconds

async function getProducts(): Promise<Product[]> {
  try {
    const { data: products, error } = await supabase
      .from("products")
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
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error || !products || products.length === 0) {
      return mockProducts;
    }

    return products.map((p: any) => ({
      id: p.slug,
      categoryId: p.categories?.slug ?? "",
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
  } catch (err) {
    console.warn("Falling back to mockProducts:", err);
    return mockProducts;
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#F8F9FB] text-[#101828] relative overflow-x-hidden">
      {/* Camada independente de elementos decorativos flutuantes com scroll parallax */}
      <FloatingDecorations />

      <Header />
      <Hero />
      <CategoryNav />

      {/* CatalogClient handles all interactive state (cart, modals, configurators) */}
      <CatalogClient products={products} />

      <Footer />
    </main>
  );
}
