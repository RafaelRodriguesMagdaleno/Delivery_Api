import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../Shared/components/Header";
import RestauranteService from "../services/RestauranteService";
import { useCarrinho } from "../../Pedidos/context/CarrinhoContext";

// Página do restaurante - mostra as informações e o cardápio
export default function RestaurantePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { AdicionarItem } = useCarrinho();
  const [restaurante, setRestaurante] = useState(null);
  const [cardapio, setCardapio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // Busca o restaurante e o cardápio quando a página carrega
  useEffect(() => {
    const buscarDados = async () => {
      try {
        const dadosRestaurante = await RestauranteService.getById(id);
        const dadosCardapio = await RestauranteService.getCardapio(id);
        setRestaurante(dadosRestaurante);
        setCardapio(dadosCardapio);
      } catch (error) {
        setErro("Erro ao carregar o restaurante.");
      } finally {
        setLoading(false);
      }
    };

    buscarDados();
  }, [id]);

  if (loading) return <p style={styles.mensagem}>Carregando...</p>;
  if (erro) return <p style={styles.erro}>{erro}</p>;

  return (
    <div style={styles.container}>
      <Header />

      {/* Informações do Restaurante */}
      <div style={styles.info}>
        <h1 style={styles.nomeRestaurante}>{restaurante.nome}</h1>
        <p style={styles.endereco}>📍 {restaurante.endereco}</p>
      </div>

      {/* Cardápio */}
      <div style={styles.menu}>
        <h2 style={styles.tituloMenu}>Cardápio</h2>

        {/* Botão de adicionar item */}
        <div style={styles.botaoCadastroContainer}>
          <button
            style={styles.botaoCadastro}
            onClick={() => navigate(`/cadastro-item/${id}`)}
          >
            + Adicionar Item
          </button>
        </div>

        {cardapio.length === 0 ? (
          <p style={styles.mensagem}>Nenhum item no cardápio ainda.</p>
        ) : (
          cardapio.map((item) => (
            <div key={item.id} style={styles.cardItem}>
              <div style={styles.detalhes}>
                <h3>{item.nome}</h3>
                <p style={styles.descricao}>{item.descricao}</p>
                <strong style={styles.preco}>
                  R$ {item.preco.toFixed(2)}
                </strong>
              </div>

              <button
                style={styles.botao}
                onClick={() => AdicionarItem(item, parseInt(id))}
              >
                Adicionar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#F8F5FF",
    fontFamily: "Arial, sans-serif",
  },
  info: {
    padding: "20px",
    backgroundColor: "#FFFFFF",
    borderBottom: "3px solid #FF6B35",
  },
  nomeRestaurante: {
    color: "#6A0DAD",
    marginBottom: "8px",
  },
  endereco: {
    color: "#555",
  },
  menu: {
    padding: "20px",
  },
  tituloMenu: {
    color: "#6A0DAD",
    marginBottom: "20px",
  },
  cardItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: "15px",
    padding: "15px",
    marginBottom: "15px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  detalhes: {
    flex: 1,
    marginRight: "15px",
  },
  descricao: {
    color: "#555",
    fontSize: "13px",
    marginBottom: "6px",
  },
  preco: {
    color: "#FF6B35",
    fontSize: "18px",
  },
  botao: {
    backgroundColor: "#6A0DAD",
    color: "#FFFFFF",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    whiteSpace: "nowrap",
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