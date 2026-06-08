import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Shared/components/Header";
import RestauranteService from "../services/RestauranteService";

// Página de cadastro de restaurante
// Envia os dados para o POST /api/restaurantes
export default function CadastroRestaurantePage() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);

    // Validações básicas no front antes de enviar para a API
    if (!nome.trim()) {
      setErro("Nome do restaurante é obrigatório.");
      return;
    }
    if (!endereco.trim()) {
      setErro("Endereço do restaurante é obrigatório.");
      return;
    }

    try {
      setLoading(true);

      // Chama o Service que envia para a API
      await RestauranteService.criar({ nome, endereco });

      alert("Restaurante cadastrado com sucesso! 🎉");
      navigate("/");
    } catch (error) {
      // Exibe a mensagem de erro vinda da API
      setErro(error.response?.data || "Erro ao cadastrar restaurante.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Header />

      <main style={styles.main}>
        <div style={styles.card}>
          <h1 style={styles.titulo}>Cadastrar Restaurante</h1>

          <form onSubmit={handleSubmit}>
            {/* Campo Nome */}
            <div style={styles.campo}>
              <label style={styles.label}>Nome do Restaurante</label>
              <input
                type="text"
                placeholder="Ex: Burger Rush"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={styles.input}
              />
            </div>

            {/* Campo Endereço */}
            <div style={styles.campo}>
              <label style={styles.label}>Endereço</label>
              <input
                type="text"
                placeholder="Ex: Rua das Flores, 123"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
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
              {loading ? "Cadastrando..." : "Cadastrar Restaurante"}
            </button>

            <button
              type="button"
              style={styles.botaoCancelar}
              onClick={() => navigate("/")}
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
    marginBottom: "25px",
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