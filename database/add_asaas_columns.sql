-- Execute no SQL Editor do Supabase para adicionar as colunas do Asaas à tabela de pedidos

ALTER TABLE orders
ADD COLUMN asaas_payment_id VARCHAR(255),
ADD COLUMN payment_url TEXT;

-- O webhook do Asaas atualizará o pedido usando o asaas_payment_id ou o public_id.
