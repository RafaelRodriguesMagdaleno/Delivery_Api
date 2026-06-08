namespace Food_Rush.Shared
{
    //Clase base para todas as entidades do sistema
    //Evita repetição de código, centralizando propriedades comuns em um só lugar
    public abstract class EntityBase
    {
        //Identificador único de qualquer entidade
        public int Id { get; protected set; }

        //Data e hora de criação do registro
        public DateTime CriadoEm {  get; protected set; } = DateTime.UtcNow;
    }
}
