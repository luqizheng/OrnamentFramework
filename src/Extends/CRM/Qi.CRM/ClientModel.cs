using Qi.Domain;

namespace Qi.CRM
{
    public class ClientModel : DomainObject<ClientModel, string>
    {
        public virtual string Name { get; set; }
    }
}