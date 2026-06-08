using Food_Rush.Pedidos.Domain.Entities;
using Food_Rush.Pedidos.DTOs;

namespace Food_Rush.Pedidos.Domain.Interfaces.IServices
{
    // Contrato que define o que qualquer implementação de serviço de pedidos deve seguir
    public interface IPedidoService
    {
        // Busca todos os pedidos cadastrados
        Task<IEnumerable<Pedido>> GetAllAsync();

        // Busca um pedido específico pelo seu Id
        Task<Pedido?> GetByIdAsync(int id);

        // Busca todos os pedidos de um restaurante específico
        Task<IEnumerable<Pedido>> GetByRestauranteIdAsync(int restauranteId);

        // Cria um novo pedido e retorna o pedido criado com o Id
        Task<Pedido> CreateAsync(CriarPedidoDTO dto);

        // Atualiza o status de um pedido
        Task UpdateStatusAsync(int id);

        // Cancela um pedido
        Task CancelAsync(int id);
    }
}