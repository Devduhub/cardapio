-- Seed Categories
INSERT INTO categories (id, name, slug, sort_order) VALUES
('c1000000-0000-0000-0000-000000000001', 'Bolos de Festa', 'bolos-de-festa', 1),
('c1000000-0000-0000-0000-000000000002', 'Doces', 'doces', 2),
('c1000000-0000-0000-0000-000000000003', 'Salgados', 'salgados', 3),
('c1000000-0000-0000-0000-000000000004', 'Kits Festa', 'kits-festa', 4),
('c1000000-0000-0000-0000-000000000005', 'Bolos Caseiros', 'bolos-caseiros', 5),
('c1000000-0000-0000-0000-000000000006', 'Tortas', 'tortas', 6),
('c1000000-0000-0000-0000-000000000007', 'Pudim', 'pudim', 7),
('c1000000-0000-0000-0000-000000000008', 'Travessas', 'travessas', 8),
('c1000000-0000-0000-0000-000000000009', 'Descartáveis', 'descartaveis', 9)
ON CONFLICT (id) DO NOTHING;

-- Seed Base Configurable Products
INSERT INTO products (id, category_id, name, slug, short_description, base_price, price_type, unit) VALUES
('p1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'Bolo de Festa Personalizado', 'bolo-de-festa', 'Monte seu bolo escolhendo sabor, peso, formato e decoração.', 89.90, 'starting_at', 'kg'),
('p1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000002', 'Doces Tradicionais', 'doces-tradicionais', 'Brigadeiro, Beijinho, Cajuzinho e mais. Cento por R$ 116,00.', 1.40, 'per_unit', 'unidade'),
('p1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000002', 'Doces Especiais', 'doces-especiais', 'Brigadeiro c/ Nutella, Ninho c/ Uva e mais. Cento por R$ 145,00.', 1.70, 'per_unit', 'unidade'),
('p1000000-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000003', 'Salgados Fritos (Prontos)', 'salgados-fritos', 'Coxinha, Bolinho de Queijo, Kibe. 50uni=R$58 / 100uni=R$116.', 1.40, 'per_unit', 'unidade'),
('p1000000-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000003', 'Salgados Assados (Prontos)', 'salgados-assados', 'Esfihas, Empadas, Bauru. 50uni=R$58 / 100uni=R$116.', 1.40, 'per_unit', 'unidade'),
('p1000000-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000003', 'Salgados Congelados', 'salgados-congelados', 'Para fritar/assar em casa. 25uni=R$27 / 50uni=R$53.', 1.08, 'per_unit', 'unidade'),
('p1000000-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000004', 'Kit 1 (Serve 5 a 7 pessoas)', 'kit-1', '1kg de bolo, 50 salgados, 25 docinhos.', 178.70, 'bundle', 'kit'),
('p1000000-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000004', 'Kit 2 (Serve até 15 pessoas)', 'kit-2', '2kg de bolo, 100 salgados, 50 docinhos.', 349.70, 'bundle', 'kit'),
('p1000000-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000004', 'Kit 3 (Serve até 25 pessoas)', 'kit-3', '3kg de bolo, 200 salgados, 100 docinhos.', 599.70, 'bundle', 'kit'),
('p1000000-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000004', 'Kit 4 (Serve até 35 pessoas)', 'kit-4', '4kg de bolo, 250 salgados, 125 docinhos.', 778.70, 'bundle', 'kit')
ON CONFLICT (id) DO NOTHING;
