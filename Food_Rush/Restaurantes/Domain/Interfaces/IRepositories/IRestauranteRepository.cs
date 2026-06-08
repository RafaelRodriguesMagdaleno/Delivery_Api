using Food_Rush.Restaurantes.Domain.Entities;

namespace Food_Rush.Restaurantes.Domain.Interfaces.IRepositories
{
    public interface IRestauranteRepository
    {
        //Contrato que define o que qualquer implementação de repositório de restaurantes deve seguir
        //O dominio depende dessa interface, mas não de uma implementação específica, o que promove a flexibilidade e a testabilidade do código

        //Busca todos os restaurantes cadastrados
        Task<IEnumerable<Restaurante>> GetAllAsync();

        //Busca um restaurante específico pelo seu ID
        Task<Restaurante?> GetByIdAsync(int id);

        //Adiciona um novo restaurante ao sistema
        Task AddAsync(Restaurante restaurante);

        //Busca todos os itens do cardápio de um restaurante
        Task<IEnumerable<ItemCardapio>> GetCardapioAsync(int restauranteId);

        //Adiciona um item ao cardápio de um restaurante
        Task AddItemCardapioAsync(ItemCardapio item);
    }
}
