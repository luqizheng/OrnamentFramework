using System.Collections.Generic;
using Qi.Domain;

namespace Sand
{
    public class Shop : DomainObject<Shop, string>
    {
        /// <summary>
        /// 
        /// </summary>
        private IList<ContactItem> _contacts = new List<ContactItem>();
        /// <summary>
        /// 
        /// </summary>
        public virtual string Name { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public virtual IList<ContactItem> Contacts
        {
            get { return _contacts ?? (_contacts = new List<ContactItem>()); }
        }
    }
}