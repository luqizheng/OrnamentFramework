﻿using System.Collections.Generic;
using Qi.Domain;

namespace Sand
{
    public class Company : DomainObject<Company, string>
    {
        private IList<ContactItem> _contacts = new List<ContactItem>();
        public virtual string Name { get; set; }

        public virtual IList<ContactItem> Contacts
        {
            get { return _contacts ?? (_contacts = new List<ContactItem>()); }
        }
    }
}