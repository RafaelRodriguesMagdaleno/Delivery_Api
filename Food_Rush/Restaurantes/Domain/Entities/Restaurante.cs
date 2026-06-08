using Food_Rush.Shared;

namespace Food_Rush.Restaurantes.Domain.Entities
{
    public class Restaurante : EntityBase
    {
        // Construtor necessário para o Entity Framework conseguir carregar os dados do banco
        protected Restaurante() { }

        //Nome do restaurante - obrigatório
        public string Nome { get; private set; }

        //Endereço do restaurante
        public string Endereco { get; private set; }

        //Lista de itens do cardápio do restaurante
        public List<ItemCardapio> Cardapio { get; private set; }

        //Construtor para garantir que um restaurante sempre tenha dados válidos
        public Restaurante(string nome, string endereco)
        {
            // Regra para que o nome não fique vazio
            if (string.IsNullOrWhiteSpace(nome))
                throw new Exception("O nome do restaurante é obrigatório.");

            // Regra para que o endereço não fique vazio
            if (string.IsNullOrWhiteSpace(endereco))
                throw new Exception("O endereço do restaurante é obrigatório.");
            
            Nome = nome;
            Endereco = endereco;

            //Cardapio começa vazio, para ser preenchido posteriormente
            Cardapio = new List<ItemCardapio>();
        }
    }
}
