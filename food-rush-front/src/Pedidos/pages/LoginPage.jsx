import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../context/CarrinhoContext";

// Página de login simples - coleta os dados do cliente
// antes de ele fazer um pedido
export default function LoginPage() {
  const navigate = useNavigate();
  const { setNomeCliente } = useCarrinho();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState(null);

  const handleEntrar = (e) => {
    e.preventDefault();
    setErro(null);

    // Validações básicas
    if (!nome.trim()) {
      setErro("Nome é obrigatório.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErro("E-mail inválido.");
      return;
    }
    if (!telefone.trim()) {
      setErro("Telefone é obrigatório.");
      return;
    }

    // Salva o nome no contexto do carrinho
    // para ser usado automaticamente no pedido
    setNomeCliente(nome);

    // Salva os dados no sessionStorage para manter durante a sessão
    sessionStorage.setItem("cliente", JSON.stringify({ nome, email, telefone }));

    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Logo */}
        <h1 style={styles.logo}>🍔 Food Rush</h1>
        <p style={styles.subtitulo}>Faça seu pedido agora!</p>

        <form onSubmit={handleEntrar}>
          {/* Campo Nome */}
          <div style={styles.campo}>
            <label style={styles.label}>Nome completo</label>
            <input
              type="text"
              placeholder="Ex: João Silva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Campo Email */}
          <div style={styles.campo}>
            <label style={styles.label}>E-mail</label>
            <input
              type="email"
              placeholder="Ex: joao@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Campo Telefone */}
          <div style={styles.campo}>
            <label style={styles.label}>Telefone</label>
            <input
              type="tel"
              placeholder="Ex: (11) 99999-9999"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Mensagem de erro */}
          {erro && <p style={styles.erro}>{erro}</p>}

          {/* Botão entrar */}
          <button type="submit" style={styles.botao}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#F3E8FF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "20px",
    padding: "40px 30px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  logo: {
    color: "#6A0DAD",
    textAlign: "center",
    marginBottom: "5px",
    fontSize: "28px",
  },
  subtitulo: {
    color: "#555",
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "14px",
  },
  campo: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    color: "#6A0DAD",
    fontWeight: "bold",
    marginBottom: "8px",
    fontSize: "14px",
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
    fontSize: "13px",
  },
  botao: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#6A0DAD",
    color: "#FFF",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
};