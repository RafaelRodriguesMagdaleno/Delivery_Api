import api from "../../Shared/api/api";

//Service responsável por todas as chamadas á API relacionadas a Pedidos
const PedidoService = {
    //Cria um novo pedido, o dto precisa ter restauranteId, nomeCliente, itens
    criar: async (dto) => {
        const response = await api.post("/api/pedidos", dto);
        return response.data;
    },

    //Busca um pedido pelo Id
    getById: async (id) => {
        const response = await api.get(`/api/pedidos/${id}`);
        return response.data;
    },

    //Atualiza o status do pedido
    atualizarStatus: async (id) => {
        const response = await api.patch(`/api/pedidos/${id}/status`);
        return response.data;
    },

    //Cancela um pedido
    cancelar: async (id) => {
        const response = await api.patch(`/api/pedidos/${id}/cancelar`);
        return response.data;
    },
};

export default PedidoService;