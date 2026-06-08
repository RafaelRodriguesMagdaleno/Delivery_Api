using Food_Rush.Restaurantes.Domain.Entities;
using Food_Rush.Restaurantes.Domain.Interfaces.IRepositories;
using Food_Rush.Restaurantes.DTOs;

namespace Food_Rush.Restaurantes.UseCases
{
    // UseCase responsável por executar apenas a criação de um item do cardápio
    public class CriarItemCardapioUseCase
    {
        private readonly IRestauranteRepository _repository;

        // O repositório é injetado pelo sistema de injeção de dependência
        public CriarItemCardapioUseCase(IRestauranteRepository repository)
        {
            _repository = repository;
        }

        // Executa a adição do item ao cardápio
        public async Task ExecuteAsync(CriarItemCardapioDTO dto)
        {
            // Verifica se o restaurante existe antes de adicionar o item
            var restaurante = await _repository.GetByIdAsync(dto.RestauranteId);
            if (restaurante == null)
                throw new Exception("Restaurante não encontrado.");

            // A entidade valida os dados no construtor
            var item = new ItemCardapio(dto.Nome, dto.Preco, dto.Descricao, dto.RestauranteId);
            await _repository.AddItemCardapioAsync(item);
        }
    }
}