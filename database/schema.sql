-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Products
-- price_type: 'fixed', 'per_kg', 'per_unit', 'bundle', 'starting_at', 'quote'
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    short_description TEXT,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    price_type VARCHAR(50) NOT NULL DEFAULT 'fixed',
    unit VARCHAR(50), -- e.g., 'kg', 'unidade', 'cento'
    weight VARCHAR(50), -- e.g., '40g', '1.5kg'
    image_url TEXT,
    active BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Product Variations (e.g., Cake Flavors, Sweet Flavors, Torta Fatia/Inteira)
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL, -- e.g., 'Abacaxi c/ Coco', 'Fatia', 'Inteira'
    price_adjustment DECIMAL(10, 2) DEFAULT 0.00,
    is_percentage BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0
);

-- 4. Product Options (Configurators like Formato, Decoração, Peso)
CREATE TABLE product_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL, -- e.g., 'Peso', 'Formato', 'Decoração'
    option_type VARCHAR(50) NOT NULL, -- 'select', 'radio', 'number', 'text'
    required BOOLEAN DEFAULT false,
    choices JSONB, -- Array of { label: string, price_adjustment: number }
    sort_order INTEGER DEFAULT 0
);

-- 5. Product Images (Gallery)
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Customers (Optional/Draft - minimal since login is not required)
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Orders
-- status: 'draft', 'submitted', 'contacted', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    public_id VARCHAR(50) UNIQUE NOT NULL, -- e.g., JC-A8K2
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    desired_date DATE,
    desired_time TIME,
    fulfillment_type VARCHAR(50) NOT NULL DEFAULT 'retirada', -- 'retirada', 'entrega'
    address TEXT,
    subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    additional_total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    estimated_total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    source VARCHAR(50) DEFAULT 'menu',
    utm_source VARCHAR(100),
    utm_campaign VARCHAR(100),
    whatsapp_session_id VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Order Items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
    variant_name VARCHAR(255),
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    configurations JSONB, -- Store selected options (weight, shape, notes)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Settings (Store Configuration)
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(255) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Settings
INSERT INTO settings (key, value, description) VALUES
('store_info', '{"name": "Jeny Confeitaria", "whatsapp": "5511966026794", "instagram": "jennyconfeitaria"}', 'Basic store information'),
('delivery', '{"enabled": false, "fee_type": "consult", "fixed_fee": 0}', 'Delivery configuration'),
('status', '{"is_open": true, "message": ""}', 'Store operational status');
