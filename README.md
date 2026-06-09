Food Rush

Sistema completo de entrega de comida

Sobre o Projeto

O Food Rush é um sistema fullstack de delivery que aplica **Domain-Driven Design (DDD)** tanto no backend (C# / ASP.NET Core) quanto no frontend (React + Vite), mantendo coerência arquitetural entre as duas camadas.

**Bounded Contexts**

| Contexto | Responsabilidade |
|---|---|
| Restaurantes/Cardápio | Cadastro de restaurantes e itens do cardápio |
| Pedidos | Criação, acompanhamento e controle de status dos pedidos |

## Tecnologias e Pacotes Instalados

### Backend

| Pacote | Versão | Comando de instalação |
|---|---|---|
| Microsoft.EntityFrameworkCore | 9.0.0 | `Install-Package Microsoft.EntityFrameworkCore -Version 9.0.0` |
| Microsoft.EntityFrameworkCore.Design | 9.0.0 | `Install-Package Microsoft.EntityFrameworkCore.Design -Version 9.0.0` |
| Microsoft.EntityFrameworkCore.Relational | 9.0.0 | `Install-Package Microsoft.EntityFrameworkCore.Relational -Version 9.0.0` |
| Pomelo.EntityFrameworkCore.MySql | 9.0.0 | `Install-Package Pomelo.EntityFrameworkCore.MySql -Version 9.0.0` |
| Swashbuckle.AspNetCore | 9.0.0 | `Install-Package Swashbuckle.AspNetCore -Version 9.0.0` |
| Microsoft.AspNetCore.OpenApi | 9.0.0 | `Install-Package Microsoft.AspNetCore.OpenApi -Version 9.0.0` |

### Frontend

| Pacote | Versão | Comando de instalação |
|---|---|---|
| React + Vite | Latest | `npm create vite@latest food-rush-front -- --template react` |
| Axios | Latest | `npm install axios` |
| React Router DOM | Latest | `npm install react-router-dom` |

## Como Rodar o Projeto

### Pré-requisitos
- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [MySQL](https://dev.mysql.com/downloads/) rodando localmente (via XAMPP ou MySQL Workbench)
- [Node.js](https://nodejs.org/) 18+

### Backend

**1. Crie o banco de dados** no MySQL Workbench:
```sql
CREATE DATABASE IF NOT EXISTS FoodRush;
```

**2. Configure o `appsettings.json`:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=FoodRush;User=root;Password=;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```
> Substitua a senha se necessário.

**3. Rode o projeto no Visual Studio:**
- Pressione **F5** ou clique em **▶ https**

**4. Acesse o Swagger para testar os endpoints:**
```
https://localhost:7197/swagger
```

> As tabelas são criadas automaticamente na primeira execução via `EnsureCreated()`.

### Frontend

**1. Acesse a pasta do projeto:**
```bash
cd food-rush-front
```

**2. Instale as dependências:**
```bash
npm install
```

**3. Rode o servidor de desenvolvimento:**
```bash
npm run dev
```

**4. Acesse no navegador:**
```
http://localhost:5173
```

O backend precisa estar rodando antes de iniciar o frontend.

## Endpoints da API

### Restaurantes

| Método | Rota | Descrição | Retorno |
|---|---|---|---|
| GET | `/api/restaurantes` | Lista todos os restaurantes | 200 + lista |
| POST | `/api/restaurantes` | Cria novo restaurante | 201 |
| GET | `/api/restaurantes/{id}` | Busca por Id | 200 ou 404 |
| GET | `/api/restaurantes/{id}/cardapio` | Lista o cardápio | 200 + lista |
| POST | `/api/restaurantes/cardapio` | Adiciona item ao cardápio | 201 |

### Pedidos

| Método | Rota | Descrição | Retorno |
|---|---|---|---|
| GET | `/api/pedidos` | Lista todos os pedidos | 200 + lista |
| POST | `/api/pedidos` | Cria pedido | 201 + objeto com Id |
| GET | `/api/pedidos/{id}` | Busca por Id | 200 ou 404 |
| GET | `/api/pedidos/restaurante/{id}` | Lista pedidos de um restaurante | 200 + lista |
| PATCH | `/api/pedidos/{id}/status` | Avança o status do pedido | 200 |
| PATCH | `/api/pedidos/{id}/cancelar` | Cancela o pedido | 200 |

## Exemplos de Requisições

### Criar Restaurante
```json
POST /api/restaurantes
{
  "nome": "Burger Rush",
  "endereco": "Rua das Flores, 123"
}
```

### Adicionar Item ao Cardápio
```json
POST /api/restaurantes/cardapio
{
  "nome": "X-Burguer",
  "preco": 25.90,
  "descricao": "Pão, carne, queijo e alface",
  "restauranteId": 1
}
```

### Criar Pedido
```json
POST /api/pedidos
{
  "restauranteId": 1,
  "nomeCliente": "João Silva",
  "itens": [
    { "itemCardapioId": 1, "quantidade": 2 }
  ]
}
```
## Regras de Negócio

| Regra | Onde está implementada |
|---|---|
| Nome do restaurante obrigatório | `Restaurante` — construtor |
| Endereço obrigatório | `Restaurante` — construtor |
| Preço do item maior que zero | `ItemCardapio` — construtor |
| Descrição do item obrigatória | `ItemCardapio` — construtor |
| Nome do cliente obrigatório | `Pedido` — construtor |
| Pedido não pode ser criado vazio | `Pedido.Finalize()` |
| Não adicionar itens a pedido entregue/cancelado | `Pedido.AddItem()` |
| Status segue ordem lógica (sem retroceder) | `Pedido.UpdateStatus()` |
| Pedido entregue não pode ser cancelado | `Pedido.Cancel()` |
| Item deve existir no cardápio do restaurante | `CriarPedidoUseCase` |
| Carrinho só aceita itens de um restaurante | `CarrinhoContext` (frontend) |

## Ciclo de Vida do Pedido

```
Recebido → EmPreparacao → EmEntrega → Entregue
    ↓            ↓              ↓
 Cancelado    Cancelado     Cancelado
```

---

## Páginas do Frontend

| Rota | Página | Descrição |
|---|---|---|
| `/` | Home | Lista restaurantes vindos da API |
| `/login` | LoginPage | Coleta nome, email e telefone |
| `/restaurante/:id` | RestaurantePage | Exibe cardápio e botão adicionar |
| `/cadastro-restaurante` | CadastroRestaurantePage | Formulário para criar restaurante |
| `/cadastro-item/:id` | CadastroItemCardapioPage | Formulário para adicionar item |
| `/carrinho` | CarrinhoPage | Resumo e finalização do pedido |
| `/pedido/:id` | AcompanharPedidoPage | Acompanha status em tempo real |

## Banco de Dados

### Tabelas criadas automaticamente

| Tabela | Entidade | Chave Estrangeira |
|---|---|---|
| Restaurantes | Restaurante | — |
| ItensCardapio | ItemCardapio | RestauranteId → Restaurantes |
| Pedidos | Pedido | — |
| ItensPedidos | ItemPedido | PedidoId → Pedidos |

## Conceitos Aplicados

**EntityBase** — classe abstrata base que centraliza `Id` e `CriadoEm`, evitando repetição (DRY).

**Aggregate Root** — `Restaurante` e `Pedido` são raízes dos agregados. Itens só existem dentro do contexto do pai.

**Repository Pattern** — interfaces no domínio (`IRestauranteRepository`, `IPedidoRepository`), implementações na infraestrutura.

**Use Case Pattern** — cada operação de criação tem sua própria classe com única responsabilidade (`CriarPedidoUseCase`, etc).

**DTO Pattern** — controllers nunca expõem entidades diretamente. Usam DTOs para entrada e saída.

**Dependency Injection** — todos os serviços, repositórios e UseCases são registrados no `Program.cs` e injetados automaticamente.

**Context API (React)** — `CarrinhoContext` gerencia o estado global do carrinho sem prop drilling.

**Service Layer (Frontend)** — `RestauranteService.js` e `PedidoService.js` centralizam as chamadas HTTP. Pages nunca chamam o Axios diretamente.

## Respostas HTTP

| Código | Quando é retornado |
|---|---|
| 200 OK | Busca ou atualização bem-sucedida |
| 201 Created | Criação bem-sucedida |
| 400 Bad Request | Violação de regra de negócio |
| 404 Not Found | Registro não encontrado |
