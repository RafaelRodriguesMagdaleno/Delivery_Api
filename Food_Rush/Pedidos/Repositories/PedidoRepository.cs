using Food_Rush.Pedidos.Domain.Entities;
using Food_Rush.Pedidos.Domain.Interfaces.IRepositories;
using Food_Rush.Shared.Database;
using Microsoft.EntityFrameworkCore;

namespace Food_Rush.Pedidos.Repositories
{
    //Implementação do repositório de pedidos
    public class PedidoRepository : IPedidoRepository
    {
        private readonly AppDbContext _context;

        //O contexto é injetado pelo sistema de injeção de dependência
        public PedidoRepository(AppDbContext context)
        {
            _context = context;
        }

        //Busca todos os pedidos incluindo seus itens
        public async Task<IEnumerable<Pedido>> GetAllAsync()
        {
            return await _context.Pedidos
                .Include(p => p.Itens)
                .ToListAsync();
        }

        //Busca um pedido pelo Id incluindo seus itens
        public async Task<Pedido?> GetByIdAsync(int id)
        {
            return await _context.Pedidos
                .Include (p => p.Itens)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        //Busca todos os pedidos de um restaurante específico
        public async Task<IEnumerable<Pedido>> GetByRestauranteIdAsync(int restauranteId)
        {
            return await _context.Pedidos
                .Include(p => p.Itens)
                .Where(p => p.RestauranteId == restauranteId)
                .ToListAsync();
        }

        //Adiciona um novo pedido ao banco
        public async Task AddAsync(Pedido pedido)
        {
            await _context.Pedidos.AddAsync(pedido);
            await _context.SaveChangesAsync();
        }

        //Atualiza um pedido existente no banco
        public async Task UpdateAsync(Pedido pedido)
        {
            _context.Pedidos.Update(pedido);
            await _context.SaveChangesAsync();
        }

    }
}
