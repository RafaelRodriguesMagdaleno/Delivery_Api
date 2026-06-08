using Food_Rush.Pedidos.Domain.Entities;
using Food_Rush.Pedidos.Domain.Interfaces.IRepositories;
using Food_Rush.Pedidos.Domain.Interfaces.IServices;
using Food_Rush.Pedidos.DTOs;
using Food_Rush.Pedidos.UseCases;

namespace Food_Rush.Pedidos.Services
{
    // Implementação do serviço de pedidos, camada entre o Controller e os UseCases
    public class PedidoService : IPedidoService
    {
        private readonly IPedidoRepository _pedidoRepository;
        private readonly CriarPedidoUseCase _criarPedidoUseCase;

        // Os UseCases e repositório são injetados pelo sistema de injeção de dependência
        public PedidoService(
            IPedidoRepository pedidoRepository,
            CriarPedidoUseCase criarPedidoUseCase)
        {
            _pedidoRepository = pedidoRepository;
            _criarPedidoUseCase = criarPedidoUseCase;
        }

        // Busca todos os pedidos
        public async Task<IEnumerable<Pedido>> GetAllAsync()
        {
            return await _pedidoRepository.GetAllAsync();
        }

        // Busca um pedido pelo Id
        public async Task<Pedido?> GetByIdAsync(int id)
        {
            return await _pedidoRepository.GetByIdAsync(id);
        }

        // Busca todos os pedidos de um restaurante
        public async Task<IEnumerable<Pedido>> GetByRestauranteIdAsync(int restauranteId)
        {
            return await _pedidoRepository.GetByRestauranteIdAsync(restauranteId);
        }

        // Delega a criação ao UseCase e retorna o pedido criado com o Id
        public async Task<Pedido> CreateAsync(CriarPedidoDTO dto)
        {
            return await _criarPedidoUseCase.ExecuteAsync(dto);
        }

        // Atualiza o status do pedido
        public async Task UpdateStatusAsync(int id)
        {
            var pedido = await _pedidoRepository.GetByIdAsync(id);
            if (pedido == null)
                throw new Exception("Pedido não encontrado.");

            pedido.UpdateStatus();
            await _pedidoRepository.UpdateAsync(pedido);
        }

        // Cancela um pedido
        public async Task CancelAsync(int id)
        {
            var pedido = await _pedidoRepository.GetByIdAsync(id);
            if (pedido == null)
                throw new Exception("Pedido não encontrado.");

            pedido.Cancel();
            await _pedidoRepository.UpdateAsync(pedido);
        }
    }
}