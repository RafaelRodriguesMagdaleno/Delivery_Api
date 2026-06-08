using Food_Rush.Restaurantes.Domain.Entities;
using Food_Rush.Restaurantes.Domain.Interfaces.IRepositories;
using Food_Rush.Shared.Database;
using Microsoft.EntityFrameworkCore;


namespace Food_Rush.Restaurantes.Repositories
{
    //Aqui é aonde acessamos o banco de dados
    public class RestauranteRepository : IRestauranteRepository
    {
        private readonly AppDbContext _context;

        //O contexto é injetado pelo sistema de injeção de dependência
        public RestauranteRepository(AppDbContext context)
        {
            _context = context;
        }

        //Busca todos os restaurantes inluindo seus cardápios
        public async Task<IEnumerable<Restaurante>> GetAllAsync()
        {
            return await _context.Restaurantes
                .Include(r => r.Cardapio)
                .ToListAsync();
        }

        //Busca um restaurante pelo Id incluindo seu cardápio
        public async Task<Restaurante?> GetByIdAsync(int id)
        {
            return await _context.Restaurantes
                .Include (r => r.Cardapio)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        //Adiciona um novo restaurante ao banco
        public async Task AddAsync(Restaurante restaurante)
        {
            await _context.Restaurantes.AddAsync(restaurante);
            await _context.SaveChangesAsync();
        }

        //Busca todos os itens do cardápio de um restaurante
        public async Task<IEnumerable<ItemCardapio>> GetCardapioAsync(int restauranteId)
        {
            return await _context.ItensCardapio
                .Where(i => i.RestauranteId == restauranteId)
                .ToListAsync();
        }

        //Adiciona um item ao cardápio de um restaurante
        public async Task AddItemCardapioAsync(ItemCardapio item)
        {
            await _context.ItensCardapio .AddAsync(item);
            await _context.SaveChangesAsync();
        }
    }
}
