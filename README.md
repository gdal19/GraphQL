# Histórico de Decisões e Comentários

## Decisões de Arquitetura

1. **Separação em 3 serviços**:
   - Frontend React: Interface do usuário
   - GraphQL: Camada intermediária para abstrair o backend
   - Backend Node.js: Lógica de negócios e acesso a dados

2. **Banco de Dados**:
   - Escolhi MongoDB por sua flexibilidade com dados não estruturados
   - Schema simples com termo e popularidade para ordenação

3. **Comunicação**:
   - Frontend → GraphQL (Apollo Client)
   - GraphQL → Backend (REST)
   - Backend → MongoDB (Mongoose)

## Decisões de Implementação

1. **Autocomplete**:
   - Debounce de 300ms para evitar chamadas excessivas
   - Ativação apenas após 4 caracteres
   - Highlight do texto correspondente

2. **UI/UX**:
   - Estilização responsiva com styled-components
   - Feedback visual durante loading
   - Scroll para sugestões extras

3. **Performance**:
   - Indexação no campo "term" no MongoDB
   - Limite de 20 sugestões no backend
   - Exibição de apenas 10 inicialmente

## Problemas Encontrados

1. **CORS**:
   - Resolvido com middleware no backend
   - Configuração adequada no Apollo Client

2. **Debounce**:
   - Implementação manual com setTimeout/clearTimeout
   - Alternativa seria usar lodash.debounce

3. **Docker Networking**:
   - Nomes de serviço como hostnames (graphql, server, mongo)
   - Portas expostas corretamente

## Melhorias Futuras

1. **Testes**:
   - Unitários para funções de highlight e filtro
   - E2E para fluxo de autocomplete

2. **Features**:
   - Cache de sugestões no Apollo Client
   - Histórico de buscas recentes
   - Internacionalização

3. **Performance**:
   - CDN para assets estáticos
   - Otimização de queries MongoDB
   - SSR para melhor SEO