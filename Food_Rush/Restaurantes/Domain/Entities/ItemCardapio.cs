using Food_Rush.Shared;

namespace Food_Rush.Restaurantes.Domain.Entities
{

    public class ItemCardapio : EntityBase
    {
        // Construtor necessário para o Entity Framework conseguir carregar os dados do banco
        protected ItemCardapio() { }

        //Nome do item do cardápio (ex: Hambúrguer, Pizza)
        public string Nome { get; private set; }

        //Preço do item do cardápio - Não pode ser negativo ou zero
        public decimal Preco { get; private set; }

        //Descrição do item do cardápio (ex: Um hambúrguer delicioso com carne de bovino e queijo)
        public string Descricao { get; private set; }

        //Id do restaurante ao qual esse item do cardápio pertence
        public int RestauranteId { get; private set; }

        //Construtor para garantir que um item do cardápio sempre tenha dados válidos
        public ItemCardapio(string nome, decimal preco, string descricao, int restauranteId)
        {
            // Regra para que o nome não fique vazio
            if (string.IsNullOrWhiteSpace(nome))
                throw new Exception("O nome do item do cardápio é obrigatório.");
            // Regra para que o preço não seja negativo
            if (preco <= 0)
                throw new Exception("O preço do item do cardápio deve ser maior que zero.");
            // Regra para que a descrição não fique vazia
            if (string.IsNullOrWhiteSpace(descricao))
                throw new Exception("A descrição do item do cardápio é obrigatória.");

            Nome = nome;
            Preco = preco;
            Descricao = descricao;
            RestauranteId = restauranteId;
        }
    }
}
