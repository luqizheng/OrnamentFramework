using System.Collections.Generic;
using Qi.Domain;

namespace Sand
{
    public class ContactItem
    {
        /// <summary>
        ///     联络内容
        /// </summary>
        public string Content { get; set; }

        /// <summary>
        ///     联络名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        ///     联络人
        /// </summary>
        public string Contact { get; set; }
    }

    public class Company : DomainObject<Company, string>
    {

        public virtual string Name { get; set; }
        IList<ContactItem> _contacts = new List<ContactItem>();
        public virtual IList<ContactItem> Contacts { get { return _contacts ?? (_contacts = new List<ContactItem>()); } }
    }

    public class Shop : DomainObject<Shop, string>
    {
        public virtual string Name { get; set; }
        IList<ContactItem> _contacts = new List<ContactItem>();
        public virtual IList<ContactItem> Contacts { get { return _contacts ?? (_contacts = new List<ContactItem>()); } }
    }

    public class Client : DomainObject<Client, string>
    {
        public virtual string Name { get; set; }
        
    }
}