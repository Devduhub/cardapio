export type PriceType = 'fixed' | 'per_kg' | 'per_unit' | 'bundle' | 'starting_at' | 'quote';

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  basePrice: number;
  priceType: PriceType;
  unit: string | null;
  weight: string | null;
  imageUrl: string | null;
}

export interface CakeConfig {
  flavor: string;
  weight: number;
  shape: string;
  decoration: string;
  notes?: string;
  flavorPrice?: number;
}

export interface SweetsConfig {
  flavors: { name: string; quantity: number }[];
}

export interface CartItem {
  id: string; // Unique ID for the cart item instance (uuid)
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  config?: CakeConfig | SweetsConfig | any;
}
