-- ============================================================
-- RLS Policies para leitura pública do cardápio
-- Execute este script no SQL Editor do Supabase
-- ============================================================

-- 1. Habilita RLS nas tabelas (já pode estar habilitado por padrão)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

-- 2. Política de leitura pública — qualquer visitante pode ver o cardápio
CREATE POLICY "public can read categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "public can read active products"
  ON products FOR SELECT
  USING (active = true);

CREATE POLICY "public can read product variants"
  ON product_variants FOR SELECT
  USING (active = true);

-- ============================================================
-- Tabelas de pedidos e clientes — somente via service_role (backend)
-- O anon key NÃO pode inserir ou ler pedidos diretamente
-- ============================================================
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Bloqueia leitura/escrita direta pelo frontend (o backend usa service_role que ignora RLS)
-- Nenhuma política = acesso negado para anon

-- ============================================================
-- Settings — leitura pública OK (nome da loja, whatsapp etc.)
-- ============================================================
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can read settings"
  ON settings FOR SELECT
  USING (true);
