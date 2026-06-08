namespace Food_Rush.Pedidos.DTOs
{
    // Objeto de transferência de dados para criação de um pedido, contém apenas os dados necessários e não expõe a entidade inteira
    public class CriarPedidoDTO
    {
        //Id do restaurante que vai preparar o pedido
        public int RestauranteId { get; set; }

        //Nome do cliente que está fazendo o pedido
        public string NomeCliente { get; set; }

        //Lista de itens que o cliente pediu
        public List<CriarItemPedidoDTO> Itens { get; set; }
    }
}
