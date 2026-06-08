import axios from "axios";

//Configuração base do Axios para comunicação com a Api, a baseURL aponta para o backend que está rodando localmente

const api = axios.create({
    baseURL: "https://localhost:7197",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;