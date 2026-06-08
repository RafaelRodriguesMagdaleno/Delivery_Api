import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Shared/components/Header";
import RestauranteService from "../services/RestauranteService";

// Página principal - lista todos os restaurantes vindos da API
export default function Home() {
  const navigate = useNavigate();
  const [restaurantes, setRestaurantess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // Redireciona para o login se o cliente não estiver identificado
  useEffect(() => {
    const cliente = sessionStorage.getItem("cliente");
    if (!cliente) {
      navigate("/login");
    }
  }, []);

  // Busca os restaurantes da API quando a página carrega
  useEffect(() => {
    const buscarRestaurantes = async () => {
      try {
        const dados = await RestauranteService.getAll();
        setRestaurantess(dados);
      } catch (error) {
        setErro("Erro ao carregar restaurantes. Verifique se a API está rodando.");
      } finally {
        setLoading(false);
      }
    };

    buscarRestaurantes();
  }, []);

  if (loading) return <p style={styles.mensagem}>Carregando restaurantes...</p>;
  if (erro) return <p style={styles.erro}>{erro}</p>;

  return (
    <div style={styles.container}>
      <Header />

      <main style={styles.main}>
        <section style={styles.banner}>
          <h2>Bem-vindo ao Food Rush!</h2>
          <p>Escolha um restaurante e faça seu pedido</p>
        </section>

        <h2 style={styles.titulo}>Restaurantes</h2>

        {/* Botão de cadastrar restaurante */}
        <div style={styles.botaoCadastroContainer}>
          <button
            style={styles.botaoCadastro}
            onClick={() => navigate("/cadastro-restaurante")}
          >
            + Cadastrar Restaurante
          </button>
        </div>

        {restaurantes.length === 0 ? (
          <p style={styles.mensagem}>Nenhum restaurante cadastrado ainda.</p>
        ) : (
          <div style={styles.cards}>
            {restaurantes.map((restaurante) => (
              <div
                key={restaurante.id}
                style={styles.card}
                onClick={() => navigate(`/restaurante/${restaurante.id}`)}
              >
                <h3 style={styles.nomeRestaurante}>{restaurante.nome}</h3>
                <p style={styles.endereco}>📍 {restaurante.endereco}</p>
                <button style={styles.botao}>Ver Cardápio</button>
              </div>
            ))}
          </div>
        )}
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
  },
  banner: {
    backgroundColor: "#7E22CE",
    color: "white",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "25px",
    textAlign: "center",
  },
  titulo: {
    color: "#581C87",
    marginBottom: "15px",
  },
  cards: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    width: "220px",
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
  },
  nomeRestaurante: {
    color: "#6A0DAD",
    marginBottom: "8px",
  },
  endereco: {
    color: "#555",
    fontSize: "13px",
    marginBottom: "12px",
  },
  botao: {
    backgroundColor: "#6A0DAD",
    color: "#FFF",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  mensagem: {
    textAlign: "center",
    marginTop: "40px",
    color: "#555",
  },
  erro: {
    textAlign: "center",
    marginTop: "40px",
    color: "red",
  },
  botaoCadastroContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "15px",
  },
  botaoCadastro: {
    backgroundColor: "#FF6B35",
    color: "#FFF",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};