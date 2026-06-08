namespace Food_Rush.Restaurantes.DTOs
{
    //Objeto de tranferência de dados para a criação de um item no cardápio, contem apenas os dados necessários e com isso não expõe a entidade diretamente
    public class CriarItemCardapioDTO
    {
        //Nomde do item do cardápio
        public string Nome { get; set; }

        //Preço do item do cardápio
        public decimal Preco {  get; set; }

        //Descrição do item do cardápio
        public string Descricao { get; set; }

        //Id do restaurante ao qual o esse item pertence
        public int RestauranteId { get; set; }
    }
}
