import api from "../../Shared/api/api";

//Service responsável por todas as chamadas á API relacionadas a Restaurantes
const RestauranteService = {
    //Busca todos os restaurantes cadastrados
    getAll: async () => {
        const response = await api.get("/api/restaurantes");
        return response.data;
    },

    //Busca um restaurante específico pelo Id
    getById: async (id) => {
        const response = await api.get(`/api/restaurantes/${id}`);
        return response.data;
    },

    //Busca o cardápio de um restaurante
    getCardapio: async (id) => {
        const response = await api.get(`/api/restaurantes/${id}/cardapio`);
        return response.data;
    },

    // Cria um novo restaurante
    criar: async (dto) => {
        const response = await api.post("/api/restaurantes", dto);
        return response.data;
    },

    // Adiciona um item ao cardápio de um restaurante
    criarItemCardapio: async (dto) => {
        const response = await api.post("/api/restaurantes/cardapio", dto);
        return response.data;
    },
};

export default RestauranteService;