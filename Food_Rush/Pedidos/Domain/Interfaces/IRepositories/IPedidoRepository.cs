using Food_Rush.Pedidos.Domain.Entities;

namespace Food_Rush.Pedidos.Domain.Interfaces.IRepositories
{
    // Contrato que define o que qualquer implementação de repositório de pedidos deve seguir
    public interface IPedidoRepository
    {
        // Busca todos os pedidos cadastrados
        Task<IEnumerable<Pedido>> GetAllAsync();

        // Busca um pedido específico pelo seu Id
        Task<Pedido?> GetByIdAsync(int id);

        // Busca todos os pedidos de um restaurante específico
        Task<IEnumerable<Pedido>> GetByRestauranteIdAsync(int restauranteId);

        // Adiciona um novo pedido ao sistema
        Task AddAsync(Pedido pedido);

        // Atualiza um pedido existente
        Task UpdateAsync(Pedido pedido);
    }
}