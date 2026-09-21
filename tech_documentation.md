# Documentação Técnica: Cardápio Digital

Este documento descreve a arquitetura atual, tecnologias, e a estrutura do projeto. O objetivo é fornecer uma visão técnica detalhada do frontend e backend (já implementados ou em preparação) para avaliação e sugestões de melhoria.

## 1. Stack Tecnológico (Tech Stack)

### 1.1 Frontend
- **Framework Principal:** [Next.js](https://nextjs.org/) (Versão 16.3.5) - Utilizando App Router (`src/app`).
- **Biblioteca de UI:** [React](https://react.dev/) (Versão 19.2.8).
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) (Versão 4) configurado via PostCSS.
- **Componentes de UI:** `@base-ui/react`, e utilitários como `class-variance-authority`, `cn`, `shadcn` e `tw-animate-css`.
- **Ícones:** `lucide-react`.
- **Gerenciamento de Estado Global:** [Zustand](https://github.com/pmndrs/zustand) utilizado para o carrinho de compras.
- **Linguagem:** TypeScript (Strict mode).

### 1.2 Backend / Serviços
- **BaaS (Backend as a Service):** [Supabase](https://supabase.com/) (`@supabase/supabase-js`). A SDK já está instalada, indicando infraestrutura de auth/db preparada.
- **Mock de Dados (Local):** `src/data.ts` atua como banco de dados estático e Mock temporário enquanto o backend não é integrado 100%.

## 2. Estrutura de Diretórios e Arquitetura

O projeto adota uma arquitetura modular focada em componentes em `src/`:

### `src/components/`
- `/layout`: Header, CategoryNav, SearchModal, Logo.
- `/products`: ProductCard (Renderização individual do produto).
- `/cart`: Lógica visual do carrinho.
- `/checkout`: Telas/forms de fechamento de pedido.
- `/ui`: Design System básico (elementos primitivos da interface).

### `src/store/`
- `useCartStore.ts`: Store (Zustand) que gerencia estado do carrinho e itens.

### Outros Diretórios
- `src/types/`: Tipagem TypeScript (Index de interfaces `Product`, `Category`, `CartItem`, etc.).
- `src/app/`: Next.js App Router, atualmente focado em `page.tsx` para o layout principal do cardápio.
- `src/lib/` & `src/hooks/`: Funções utilitárias e Custom Hooks.

## 3. Funcionalidades Atuais (Funcionais)
1. **Header Responsivo:** Busca de produtos, e botão de ver pedido integrados, com efeitos de scroll.
2. **Listagem de Produtos:** Exibição através do `ProductCard` e navegação rápida de seções com `CategoryNav`.
3. **Carrinho (Zustand):** Adicionar/Remover itens do store. O botão "PEDIDO" reflete a contagem em tempo real.
4. **Busca:** Modal de busca funcional e integrado (`SearchModal.tsx`).

## 4. Oportunidades de Análise (Para enviar ao Codex)
- Melhor forma de migrar os dados em `src/data.ts` para o Supabase e consumir via Server Components no Next.js 16/React 19.
- Otimização do Zustand Store e se pode causar hidration mismatch.
- Estrutura de pastas vs novas features planejadas.
