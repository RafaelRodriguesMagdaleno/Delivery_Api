namespace Food_Rush.Pedidos.DTOs
{
    public class CriarItemPedidoDTO
    {
        //Id do item do cardápio escolhido pelo cliente
        public int ItemCardapioId { get; set; }

        //Quantidade do item pedido
        public int Quantidade { get; set; }
    }
}
