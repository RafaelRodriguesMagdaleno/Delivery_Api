using Food_Rush.Restaurantes.Domain.Entities;
using Food_Rush.Restaurantes.Domain.Interfaces.IRepositories;
using Food_Rush.Restaurantes.DTOs;

namespace Food_Rush.Restaurantes.UseCases
{
    // UseCase responsável por executar apenas a criação de um restaurante
    public class CriarRestauranteUseCase
    {
        private readonly IRestauranteRepository _repository;

        // O repositório é injetado pelo sistema de injeção de dependência
        public CriarRestauranteUseCase(IRestauranteRepository repository)
        {
            _repository = repository;
        }

        // Executa a criação do restaurante
        public async Task ExecuteAsync(CriarRestauranteDTO dto)
        {
            // A entidade valida os dados no construtor
            var restaurante = new Restaurante(dto.Nome, dto.Endereco);
            await _repository.AddAsync(restaurante);
        }
    }
}