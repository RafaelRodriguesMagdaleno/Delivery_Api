import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../Shared/components/Header";
import PedidoService from "../services/PedidoService";

// Mapa de status para exibição amigável e cor
const statusConfig = {
  Recebido: { label: "✅ Pedido Recebido", cor: "#6A0DAD" },
  EmPreparacao: { label: "👨‍🍳 Em Preparação", cor: "#FF6B35" },
  EmEntrega: { label: "🛵 Em Entrega", cor: "#F59E0B" },
  Entregue: { label: "🎉 Entregue!", cor: "#10B981" },
  Cancelado: { label: "❌ Cancelado", cor: "#EF4444" },
};

export default function AcompanharPedidoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [atualizando, setAtualizando] = useState(false);

  useEffect(() => {
    buscarPedido();
  }, [id]);

  const buscarPedido = async () => {
    try {
      const dados = await PedidoService.getById(id);
      setPedido(dados);
      // Limpa o erro ao recarregar com sucesso
      setErro(null);
    } catch (error) {
      setErro("Pedido não encontrado.");
    } finally {
      setLoading(false);
    }
  };

  // Avança o status do pedido
  const avancarStatus = async () => {
    try {
      setAtualizando(true);
      setErro(null);
      await PedidoService.atualizarStatus(id);
      // Recarrega o pedido para mostrar o novo status
      await buscarPedido();
    } catch (error) {
      setErro("Não é possível avançar o status deste pedido.");
    } finally {
      setAtualizando(false);
    }
  };

  // Cancela o pedido
  const cancelarPedido = async () => {
    if (!confirm("Deseja cancelar o pedido?")) return;
    try {
      setAtualizando(true);
      setErro(null);
      await PedidoService.cancelar(id);
      await buscarPedido();
    } catch (error) {
      setErro("Não é possível cancelar este pedido.");
    } finally {
      setAtualizando(false);
    }
  };

  if (loading) return <p style={styles.mensagem}>Carregando pedido...</p>;
  if (!pedido && !erro) return <p style={styles.mensagem}>Pedido não encontrado.</p>;

  const config = pedido
    ? statusConfig[pedido.status] || { label: pedido.status, cor: "#555" }
    : null;

  return (
    <div style={styles.container}>
      <Header />

      <main style={styles.main}>
        <h1 style={styles.titulo}>Acompanhar Pedido</h1>

        {/* Status atual */}
        {pedido && config && (
          <div style={{ ...styles.statusCard, borderColor: config.cor }}>
            <p style={{ ...styles.statusLabel, color: config.cor }}>
              {config.label}
            </p>
            <p style={styles.pedidoInfo}>Pedido #{pedido.id}</p>
            <p style={styles.pedidoInfo}>Cliente: {pedido.nomeCliente}</p>
          </div>
        )}

        {/* Lista de itens */}
        {pedido && (
          <div style={styles.card}>
            <h2 style={styles.subtitulo}>Itens do Pedido</h2>
            {pedido.itens.map((item, index) => (
              <div key={index} style={styles.item}>
                <span>{item.nomeItem} x{item.quantidade}</span>
                <span style={styles.preco}>
                  R$ {(item.precoUnitario * item.quantidade).toFixed(2)}
                </span>
              </div>
            ))}
            <hr />
            <div style={styles.total}>
              <span>Total</span>
              <span>
                R$ {pedido.itens
                  .reduce((t, i) => t + i.precoUnitario * i.quantidade, 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* Botões de ação */}
        {pedido && pedido.status !== "Entregue" && pedido.status !== "Cancelado" && (
          <div style={styles.botoes}>
            <button
              style={styles.botaoAvancar}
              onClick={avancarStatus}
              disabled={atualizando}
            >
              {atualizando ? "Atualizando..." : "Avançar Status"}
            </button>

            <button
              style={styles.botaoCancelar}
              onClick={cancelarPedido}
              disabled={atualizando}
            >
              Cancelar Pedido
            </button>
          </div>
        )}

        {/* Erro inline - não substitui a página */}
        {erro && <p style={styles.erro}>{erro}</p>}

        <button
          style={styles.botaoVoltar}
          onClick={() => navigate("/")}
        >
          Voltar ao Início
        </button>
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
    maxWidth: "500px",
    margin: "0 auto",
  },
  titulo: {
    color: "#6A0DAD",
    textAlign: "center",
    marginBottom: "20px",
  },
  statusCard: {
    backgroundColor: "#FFF",
    borderRadius: "15px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    border: "3px solid",
    textAlign: "center",
  },
  statusLabel: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  pedidoInfo: {
    color: "#555",
    fontSize: "14px",
    marginBottom: "4px",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: "15px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  subtitulo: {
    color: "#6A0DAD",
    marginBottom: "15px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    color: "#333",
  },
  preco: {
    color: "#FF6B35",
    fontWeight: "bold",
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    fontSize: "18px",
    color: "#6A0DAD",
    marginTop: "10px",
  },
  botoes: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  botaoAvancar: {
    flex: 1,
    padding: "15px",
    backgroundColor: "#6A0DAD",
    color: "#FFF",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  botaoCancelar: {
    flex: 1,
    padding: "15px",
    backgroundColor: "#EF4444",
    color: "#FFF",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  botaoVoltar: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#EEE",
    color: "#333",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    cursor: "pointer",
  },
  mensagem: {
    textAlign: "center",
    marginTop: "40px",
    color: "#555",
  },
  erro: {
    textAlign: "center",
    marginBottom: "15px",
    color: "red",
  },
};