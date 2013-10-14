using Qi.Domain;

namespace Sand
{
    public class ClientModel : DomainObject<ClientModel, string>
    {
        public virtual string Name { get; set; }
    }
}