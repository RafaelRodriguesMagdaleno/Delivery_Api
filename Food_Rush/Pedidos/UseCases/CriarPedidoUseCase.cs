using Food_Rush.Pedidos.Domain.Entities;
using Food_Rush.Pedidos.Domain.Interfaces.IRepositories;
using Food_Rush.Pedidos.DTOs;
using Food_Rush.Restaurantes.Domain.Interfaces.IRepositories;

namespace Food_Rush.Pedidos.UseCases
{
    // UseCase responsável por executar apenas a criação de um pedido
    public class CriarPedidoUseCase
    {
        private readonly IPedidoRepository _pedidoRepository;
        private readonly IRestauranteRepository _restauranteRepository;

        // Os repositórios são injetados pelo sistema de injeção de dependência
        public CriarPedidoUseCase(IPedidoRepository pedidoRepository, IRestauranteRepository restauranteRepository)
        {
            _pedidoRepository = pedidoRepository;
            _restauranteRepository = restauranteRepository;
        }

        // Executa a criação do pedido e retorna o pedido criado com o Id
        public async Task<Pedido> ExecuteAsync(CriarPedidoDTO dto)
        {
            // Verifica se o restaurante existe
            var restaurante = await _restauranteRepository.GetByIdAsync(dto.RestauranteId);
            if (restaurante == null)
                throw new Exception("Restaurante não encontrado.");

            // Cria o pedido - a entidade valida os dados no construtor
            var pedido = new Pedido(dto.RestauranteId, dto.NomeCliente);

            // Adiciona cada item do DTO ao pedido
            foreach (var itemDto in dto.Itens)
            {
                // Busca o item do cardápio para obter nome e preço
                var itemCardapio = restaurante.Cardapio
                    .FirstOrDefault(i => i.Id == itemDto.ItemCardapioId);

                if (itemCardapio == null)
                    throw new Exception($"Item {itemDto.ItemCardapioId} não encontrado no cardápio.");

                pedido.AddItem(itemCardapio.Id, itemCardapio.Nome, itemCardapio.Preco, itemDto.Quantidade);
            }

            // Regra de negócio: pedido não pode ser vazio
            pedido.Finalize();

            await _pedidoRepository.AddAsync(pedido);

            // Retorna o pedido criado com o Id gerado pelo banco
            return pedido;
        }
    }
}