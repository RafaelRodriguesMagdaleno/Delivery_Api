import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Shared/components/Header";
import { useCarrinho } from "../context/CarrinhoContext";
import PedidoService from "../services/PedidoService";

// Página do carrinho - finaliza o pedido enviando para a API
export default function CarrinhoPage() {
  const navigate = useNavigate();
  const { itens, restauranteId, nomeCliente, setNomeCliente, removerItem, limparCarrinho, calcularTotal } = useCarrinho();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const taxaEntrega = 5.99;
  const total = calcularTotal() + taxaEntrega;

  // Finaliza o pedido enviando para a API
  const finalizarPedido = async () => {
    if (!nomeCliente.trim()) {
      setErro("Por favor, informe seu nome.");
      return;
    }

    if (itens.length === 0) {
      setErro("Seu carrinho está vazio.");
      return;
    }

    try {
      setLoading(true);
      setErro(null);

      // Monta o DTO no formato que a API espera
      const dto = {
        restauranteId,
        nomeCliente,
        itens: itens.map((item) => ({
          itemCardapioId: item.itemCardapioId,
          quantidade: item.quantidade,
        })),
      };

      // Cria o pedido e usa o Id retornado para redirecionar
      const pedidoCriado = await PedidoService.criar(dto);
      limparCarrinho();
      navigate(`/pedido/${pedidoCriado.id}`);
    } catch (error) {
      setErro("Erro ao finalizar pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Header />

      <main style={styles.main}>
        <h1 style={styles.titulo}>Meu Carrinho 🛒</h1>

        {itens.length === 0 ? (
          <div style={styles.vazio}>
            <p>Seu carrinho está vazio!</p>
            <button style={styles.botaoVoltar} onClick={() => navigate("/")}>
              Ver Restaurantes
            </button>
          </div>
        ) : (
          <>
            {/* Lista de itens */}
            {itens.map((item) => (
              <div key={item.itemCardapioId} style={styles.card}>
                <div>
                  <h3>{item.nomeItem}</h3>
                  <p style={styles.preco}>
                    R$ {item.precoUnitario.toFixed(2)} x {item.quantidade}
                  </p>
                  <strong style={styles.subtotal}>
                    R$ {(item.precoUnitario * item.quantidade).toFixed(2)}
                  </strong>
                </div>
                <button
                  style={styles.botaoRemover}
                  onClick={() => removerItem(item.itemCardapioId)}
                >
                  Remover
                </button>
              </div>
            ))}

            {/* Nome do cliente */}
            <div style={styles.campo}>
              <label style={styles.label}>Seu nome:</label>
              <input
                type="text"
                placeholder="Digite seu nome"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                style={styles.input}
              />
            </div>

            {/* Resumo */}
            <div style={styles.resumo}>
              <h2>Resumo do Pedido</h2>
              <div style={styles.linha}>
                <span>Subtotal</span>
                <span>R$ {calcularTotal().toFixed(2)}</span>
              </div>
              <div style={styles.linha}>
                <span>Taxa de entrega</span>
                <span>R$ {taxaEntrega.toFixed(2)}</span>
              </div>
              <hr />
              <div style={styles.total}>
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Erro */}
            {erro && <p style={styles.erro}>{erro}</p>}

            {/* Botão finalizar */}
            <button
              style={styles.botaoFinalizar}
              onClick={finalizarPedido}
              disabled={loading}
            >
              {loading ? "Enviando..." : "Finalizar Pedido"}
            </button>
          </>
        )}
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#F8F5FF",
    fontFamily: "Arial, sans-serif",
  },
  main: {
    padding: "20px",
  },
  titulo: {
    color: "#6A0DAD",
    textAlign: "center",
    marginBottom: "25px",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "15px",
    padding: "15px",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  preco: {
    color: "#555",
    fontSize: "13px",
  },
  subtotal: {
    color: "#FF6B35",
    fontSize: "16px",
  },
  botaoRemover: {
    backgroundColor: "#FF0000",
    color: "#FFF",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  campo: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    color: "#6A0DAD",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "2px solid #D8B4FE",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  resumo: {
    backgroundColor: "#FFFFFF",
    borderRadius: "15px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  linha: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#6A0DAD",
    marginTop: "15px",
  },
  botaoFinalizar: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#FF6B35",
    color: "#FFF",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  vazio: {
    textAlign: "center",
    marginTop: "40px",
    color: "#555",
  },
  botaoVoltar: {
    marginTop: "15px",
    backgroundColor: "#6A0DAD",
    color: "#FFF",
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  erro: {
    color: "red",
    textAlign: "center",
    marginBottom: "15px",
  },
};