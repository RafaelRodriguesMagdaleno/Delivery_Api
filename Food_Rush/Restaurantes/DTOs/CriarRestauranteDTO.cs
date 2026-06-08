namespace Food_Rush.Restaurantes.DTOs
{
    //Objeto de tranferência de dados para a criação de um restaurante, contem apenas os dados necessários e com isso não expõe a entidade diretamente
    public class CriarRestauranteDTO
    {
        //Nome do restaurante
        public string Nome { get; set; }

        //Endereço do restaurante
        public string Endereco { get; set; }
    }
}
