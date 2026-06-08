import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarrinhoProvider } from "./Pedidos/context/CarrinhoContext";
import Home from "./Restaurantes/pages/Home";
import RestaurantePage from "./Restaurantes/pages/RestaurantePage";
import CarrinhoPage from "./Pedidos/pages/CarrinhoPage";
import CadastroRestaurantePage from "./Restaurantes/pages/CadastroRestaurantePage";
import CadastroItemCardapioPage from "./Restaurantes/pages/CadastroItemCardapioPage";
import LoginPage from "./Pedidos/pages/LoginPage";
import AcompanharPedidoPage from "./Pedidos/pages/AcompanharPedidoPage";

// Componente raiz da aplicação
export default function App() {
  return (
    <BrowserRouter>
      <CarrinhoProvider>
        <Routes>
          {/* Página de login - primeira tela do usuário */}
          <Route path="/login" element={<LoginPage />} />

          {/* Página inicial - lista de restaurantes */}
          <Route path="/" element={<Home />} />

          {/* Página do restaurante - cardápio */}
          <Route path="/restaurante/:id" element={<RestaurantePage />} />

          {/* Página do carrinho */}
          <Route path="/carrinho" element={<CarrinhoPage />} />

          {/* Página de cadastro de restaurante */}
          <Route path="/cadastro-restaurante" element={<CadastroRestaurantePage />} />

          {/* Página de cadastro de item do cardápio */}
          <Route path="/cadastro-item/:restauranteId" element={<CadastroItemCardapioPage />} />

          {/* Página de acompanhamento do pedido */}
          <Route path="/pedido/:id" element={<AcompanharPedidoPage />} />
        </Routes>
      </CarrinhoProvider>
    </BrowserRouter>
  );
}