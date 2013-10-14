using Qi.Domain;

namespace Sand
{
    public class Client : DomainObject<Client, string>
    {
        protected Client()
        {
        }

        public Client(ClientModel model, string name)
        {
            Model = model;
            Name = name;
        }

        public virtual ClientModel Model { get; set; }
        public virtual string Name { get; set; }
    }
}