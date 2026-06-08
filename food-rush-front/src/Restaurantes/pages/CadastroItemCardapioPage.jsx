import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Shared/components/Header";
import RestauranteService from "../services/RestauranteService";

// Página de cadastro de item do cardápio
// Envia os dados para o POST /api/restaurantes/cardapio
export default function CadastroItemCardapioPage() {
  const navigate = useNavigate();
  const { restauranteId } = useParams();
  const [restaurante, setRestaurante] = useState(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  // Busca o restaurante para mostrar o nome na tela
  useEffect(() => {
    const buscarRestaurante = async () => {
      try {
        const dados = await RestauranteService.getById(restauranteId);
        setRestaurante(dados);
      } catch {
        setErro("Restaurante não encontrado.");
      }
    };
    buscarRestaurante();
  }, [restauranteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);

    // Validações básicas no front antes de enviar para a API
    if (!nome.trim()) {
      setErro("Nome do item é obrigatório.");
      return;
    }
    if (!descricao.trim()) {
      setErro("Descrição do item é obrigatória.");
      return;
    }
    if (!preco || parseFloat(preco) <= 0) {
      setErro("Preço deve ser maior que zero.");
      return;
    }

    try {
      setLoading(true);

      // Monta o DTO no formato que a API espera
      const dto = {
        nome,
        descricao,
        preco: parseFloat(preco),
        restauranteId: parseInt(restauranteId),
      };

      await RestauranteService.criarItemCardapio(dto);
      alert("Item cadastrado com sucesso! 🎉");
      navigate(`/restaurante/${restauranteId}`);
    } catch (error) {
      setErro(error.response?.data || "Erro ao cadastrar item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Header />

      <main style={styles.main}>
        <div style={styles.card}>
          <h1 style={styles.titulo}>Adicionar Item ao Cardápio</h1>

          {restaurante && (
            <p style={styles.nomeRestaurante}>
              Restaurante: <strong>{restaurante.nome}</strong>
            </p>
          )}

          <form onSubmit={handleSubmit}>
            {/* Campo Nome */}
            <div style={styles.campo}>
              <label style={styles.label}>Nome do Item</label>
              <input
                type="text"
                placeholder="Ex: X-Burguer Especial"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={styles.input}
              />
            </div>

            {/* Campo Descrição */}
            <div style={styles.campo}>
              <label style={styles.label}>Descrição</label>
              <textarea
                placeholder="Ex: Pão, carne, queijo e alface"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                style={styles.textarea}
              />
            </div>

            {/* Campo Preço */}
            <div style={styles.campo}>
              <label style={styles.label}>Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Ex: 29.90"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                style={styles.input}
              />
            </div>

            {/* Mensagem de erro */}
            {erro && <p style={styles.erro}>{erro}</p>}

            {/* Botões */}
            <button
              type="submit"
              style={styles.botaoSalvar}
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Adicionar Item"}
            </button>

            <button
              type="button"
              style={styles.botaoCancelar}
              onClick={() => navigate(`/restaurante/${restauranteId}`)}
            >
              Cancelar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#F3E8FF",
    fontFamily: "Arial, sans-serif",
  },
  main: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "15px",
    padding: "30px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginTop: "20px",
  },
  titulo: {
    color: "#6A0DAD",
    textAlign: "center",
    marginBottom: "10px",
  },
  nomeRestaurante: {
    textAlign: "center",
    color: "#555",
    marginBottom: "20px",
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
  textarea: {
    width: "100%",
    minHeight: "90px",
    padding: "12px",
    borderRadius: "10px",
    border: "2px solid #D8B4FE",
    fontSize: "14px",
    boxSizing: "border-box",
    resize: "none",
  },
  erro: {
    color: "red",
    textAlign: "center",
    marginBottom: "15px",
  },
  botaoSalvar: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#6A0DAD",
    color: "#FFF",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "10px",
  },
  botaoCancelar: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#EEE",
    color: "#333",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
  },
};