using Food_Rush.Restaurantes.Domain.Entities;
using Food_Rush.Restaurantes.Domain.Interfaces.IRepositories;
using Food_Rush.Restaurantes.Domain.Interfaces.IServices;
using Food_Rush.Restaurantes.DTOs;
using Food_Rush.Restaurantes.UseCases;

namespace Food_Rush.Restaurantes.Services
{
    // Implementação do serviço de restaurantes, camada entre o Controller e os UseCases
    public class RestauranteService : IRestauranteService
    {
        private readonly IRestauranteRepository _repository;
        private readonly CriarRestauranteUseCase _criarRestauranteUseCase;
        private readonly CriarItemCardapioUseCase _criarItemCardapioUseCase;

        // Os UseCases e repositório são injetados pelo sistema de injeção de dependência
        public RestauranteService(
            IRestauranteRepository repository,
            CriarRestauranteUseCase criarRestauranteUseCase,
            CriarItemCardapioUseCase criarItemCardapioUseCase)
        {
            _repository = repository;
            _criarRestauranteUseCase = criarRestauranteUseCase;
            _criarItemCardapioUseCase = criarItemCardapioUseCase;
        }

        // Busca todos os restaurantes
        public async Task<IEnumerable<Restaurante>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        // Busca um restaurante pelo Id
        public async Task<Restaurante?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        // Delega a criação ao UseCase para a criação do restaurante
        public async Task CreateAsync(CriarRestauranteDTO dto)
        {
            await _criarRestauranteUseCase.ExecuteAsync(dto);
        }

        // Busca o cardápio de um restaurante
        public async Task<IEnumerable<ItemCardapio>> GetCardapioAsync(int restauranteId)
        {
            return await _repository.GetCardapioAsync(restauranteId);
        }

        // Delega a criação ao UseCase para a criação do item do cardapio
        public async Task AddItemCardapioAsync(CriarItemCardapioDTO dto)
        {
            await _criarItemCardapioUseCase.ExecuteAsync(dto);
        }
    }
}