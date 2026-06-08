using Food_Rush.Shared;

namespace Food_Rush.Pedidos.Domain.Entities
{
    //Enum para representar o status do pedido
    public enum StatusPedido
    {
        Recebido, // Pedido foi recebido e está aguardando processamento
        EmPreparacao, // Pedido está sendo preparado pelo restaurante
        EmEntrega, // Pedido está a caminho do cliente
        Entregue, // Pedido foi entregue ao cliente
        Cancelado // Pedido foi cancelado
    }

    //Entidade raiz do agregado de pedidos, representando um pedido feito por um cliente

    public class Pedido : EntityBase
    {
        // Construtor necessário para o Entity Framework conseguir carregar os dados do banco
        protected Pedido() { }

        //Id do restaurante ao qual vai preparar o pedido
        public int RestauranteId { get; private set; }

        //Nome do cliente que fez o pedido
        public string NomeCliente { get; private set; }

        //Status atual do pedido
        public StatusPedido Status { get; private set; }

        //Lista de itens do pedido - começa privada para garantir que só possa ser modificada por métodos controlados
        private List<ItemPedido> _itens = new List<ItemPedido>();

        //Exposição somente leitura dos itens do pedido
        public IReadOnlyList<ItemPedido> Itens => _itens;

        //Construtor - pedido nasce sempre com status "Recebido"
        public Pedido(int restauranteId, string nomeCliente)
        {
            // Regra para que o nome do cliente seja obrigatório
            if (string.IsNullOrWhiteSpace(nomeCliente))
                throw new Exception("O nome do cliente é obrigatório.");

            //O pedido deve estar associado a um restaurante válido
            if (restauranteId <= 0)
                throw new Exception("O Id do restaurante é inválido.");

            RestauranteId = restauranteId;
            NomeCliente = nomeCliente;
            Status = StatusPedido.Recebido;
        }

        //Metodo para adicionar itens ao pedido
        public void AddItem(int itemCardapioId, string nomeItem, decimal precoUnitario, int quantidade)
        {
            //Só é permitido adicionar itens se o pedido ainda não tiver sido entregue ou cancelado
            if (Status == StatusPedido.Entregue || Status == StatusPedido.Cancelado)
                throw new Exception("Não é possível adicionar itens a um pedido que já foi entregue ou cancelado.");
            
            var itemPedido = new ItemPedido(itemCardapioId, nomeItem, precoUnitario, quantidade);
            _itens.Add(itemPedido);
        }

        //O pedido não pode ser finalizado sem itens
        public void Finalize()
        {
            if(_itens.Count == 0)
                throw new Exception("Não é possível finalizar um pedido sem itens.");
        }

        //Metodo para atualizar o status do pedido
        public void UpdateStatus()
        {
            //O pedido que foi cancelado não pode ter seu status atualizado para outro status
            if(Status == StatusPedido.Cancelado)
                throw new Exception("Não é possível atualizar o status de um pedido cancelado.");

            // O pedido que foi entregue não pode ter seu status atualizado para outro status
            if(Status == StatusPedido.Entregue)
                throw new Exception("Não é possível atualizar o status de um pedido entregue.");

            // Transição de status: Recebido -> EmPreparacao -> EmEntrega -> Entregue
            Status = (StatusPedido)((int)Status +1);
        }

        //Metodo para cancelar o pedido
        public void Cancel()
        {
            //Só é permitido cancelar um pedido que ainda não foi entregue ou cancelado
            if (Status == StatusPedido.Entregue || Status == StatusPedido.Cancelado)
                throw new Exception("Não é possível cancelar um pedido que já foi entregue ou cancelado.");
            
            Status = StatusPedido.Cancelado;
        }

        //Calcula o valor total do pedido somando o subtotal de cada item do pedido
        public decimal CalculateTotal() => _itens.Sum(item => item.CalculateSubtotal());
    }
}
