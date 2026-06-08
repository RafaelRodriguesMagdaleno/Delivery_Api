import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../../Pedidos/context/CarrinhoContext";

// Componente compartilhado - aparece em todas as páginas
export default function Header() {
  const navigate = useNavigate();
  const { itens } = useCarrinho();

  // Conta a quantidade total de itens no carrinho
  const totalItens = itens.reduce((total, item) => total + item.quantidade, 0);

  return (
    <header style={styles.header}>
      {/* Logo, clica nela para voltar à Home */}
      <h1 style={styles.logo} onClick={() => navigate("/")}>
        🍔 Food Rush
      </h1>

      {/* Botão do carrinho com contador */}
      <button style={styles.botaoCarrinho} onClick={() => navigate("/carrinho")}>
        🛒 Carrinho
        {totalItens > 0 && (
          <span style={styles.badge}>{totalItens}</span>
        )}
      </button>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#6A0DAD",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: "#FFF",
    cursor: "pointer",
    margin: 0,
    fontSize: "22px",
  },
  botaoCarrinho: {
    backgroundColor: "#FF6B35",
    color: "#FFF",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  badge: {
    backgroundColor: "#FFF",
    color: "#6A0DAD",
    borderRadius: "50%",
    width: "22px",
    height: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "bold",
  },
};