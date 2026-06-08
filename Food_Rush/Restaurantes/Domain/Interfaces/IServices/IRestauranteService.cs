using Food_Rush.Restaurantes.Domain.Entities;
using Food_Rush.Restaurantes.DTOs;

namespace Food_Rush.Restaurantes.Domain.Interfaces.IServices
{
    //Contrato que define o que qualquer implementação de serviço de restaurante deve seguir
    public interface IRestauranteService
    {
        //Busca todos os restaurantes cadastrados
        Task<IEnumerable<Restaurante>> GetAllAsync();

        //Busca um restaurante específico pelo seu Id
        Task<Restaurante?> GetByIdAsync(int id);

        //Cria um novo restaurante
        Task CreateAsync(CriarRestauranteDTO dto);

        //Busca todos os itens do cardápio de um restaurante
        Task<IEnumerable<ItemCardapio>> GetCardapioAsync(int restauranteId);

        //Adiciona um item ao cardápio de um restaurante
        Task AddItemCardapioAsync(CriarItemCardapioDTO dto);

    }
}
