using Food_Rush.Restaurantes.Domain.Entities;
using Food_Rush.Pedidos.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Food_Rush.Shared.Database
{
    //Classe responsável por conectar as entidades do domínio com o banco de dados usando Entity Framework Core
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base (options) { }

        //Tabela de restaurantes no banco de dados 
        public DbSet<Restaurante> Restaurantes { get; set; }

        //Tabela de itens do cardapio no banco de dados 
        public DbSet<ItemCardapio> ItensCardapio { get; set; }

        //Tabela de pedidos no banco de dados
        public DbSet<Pedido> Pedidos { get; set; }

        //Tabela da itens dos pedidos no banco de dados
        public DbSet<ItemPedido> ItensPedidos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Configuração da entidade Restaurante
            modelBuilder.Entity<Restaurante>(entity =>
            {
                entity.HasKey(r => r.Id); //Chave primária
                entity.Property(r => r.Nome).IsRequired(); //Nome é obrigatório
                entity.Property(r => r.Endereco).IsRequired(); //Endereço é obrigatório

                //Um restaurante pode ter vários itens no cardápio
                entity.HasMany(r => r.Cardapio)
                        .WithOne()
                        .HasForeignKey(ic => ic.RestauranteId)
                        .OnDelete(DeleteBehavior.Cascade);
            });

            //Configuração da entidade ItemCardapio

            modelBuilder.Entity<ItemCardapio>(entity =>
            {
                entity.HasKey(ic => ic.Id); //Chave primária
                entity.Property(ic => ic.Nome).IsRequired(); //Nome é obrigatório
                entity.Property(ic => ic.Preco).IsRequired(); //Preço é obrigatório
                entity.Property(ic => ic.Descricao).IsRequired(); //Parte da descrição do produto
            });

            //Configuração da entidade Pedido
            modelBuilder.Entity<Pedido>(entity =>
            {
                entity.HasKey(p => p.Id);
                entity.Property(p => p.NomeCliente).IsRequired();

                //Status é salvo como string no banco de dados
                entity.Property(p => p.Status)
                    .HasConversion<string>()
                    .IsRequired();

                //Um pedido tem muitos itens
                entity.HasMany(p => p.Itens)
                    .WithOne()
                    .HasForeignKey(i => i.PedidoId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            //Configuração da entidade ItemPedido
            modelBuilder.Entity<ItemPedido>(entity =>
            {
                entity.HasKey(ip => ip.Id); //Id do pedido
                entity.Property(ip => ip.NomeItem).IsRequired(); // Nome do pedido
                entity.Property(ip => ip.PrecoUnitario).IsRequired(); // Preço
                entity.Property(ip => ip.Quantidade).IsRequired();// Quantidade
            });

        }
    }
}
