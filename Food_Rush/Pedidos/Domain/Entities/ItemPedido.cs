using Food_Rush.Shared;

namespace Food_Rush.Pedidos.Domain.Entities
{
    public class ItemPedido : EntityBase
    {
        // Construtor necessário para o Entity Framework conseguir carregar os dados do banco
        protected ItemPedido() { }

        //Id do item do cardápio que está sendo pedido
        public int ItemCardapioId { get; private set; }

        //Nome do item no momento do pedido (para manter o histórico mesmo que o nome do item do cardápio mude posteriormente)
        public string NomeItem { get; private set; }

        //Preço do item no momento do  pedido (para manter o histórico mesmo que o preço do item do cardápio mude posteriormente)
        public decimal PrecoUnitario { get; private set; }

        //Quantidade do item pedido
        public int Quantidade { get; private set; }

        // Chave estrangeira que vincula o item ao seu pedido
        public int PedidoId { get; private set; }

        //Construtor para garantir que um item do pedido sempre tenha dados válidos
        public ItemPedido(int itemCardapioId, string nomeItem, decimal precoUnitario, int quantidade)
        {
            //Aqui é uma regra para referenciar um item válido do cardápio
            if (itemCardapioId <= 0)
                throw new Exception("O Id do item do cardápio é inválido.");

            //Regra para o nome do item ser obrigatório
            if (string.IsNullOrWhiteSpace(nomeItem))
                throw new Exception("O nome do item é obrigatório.");

            //O preço nõa pode ser negativo
            if (precoUnitario <=0)
                throw new Exception("O preço do pedido é inválido.");

            //A quantidade deve ser pelo menos 1
            if (quantidade <= 0)
                throw new Exception("A quantidade do item é inválida, deve ter pelo menos 1 pedido.");

            ItemCardapioId = itemCardapioId;
            NomeItem = nomeItem;
            PrecoUnitario = precoUnitario;
            Quantidade = quantidade;
        }

        //Calcula o valor total do item do pedido (preço unitário multiplicado pela quantidade)
        public decimal CalculateSubtotal() => PrecoUnitario * Quantidade;
    }
}
