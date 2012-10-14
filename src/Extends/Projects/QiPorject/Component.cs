using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Qi.Domain;

namespace QiProject
{
    public class Component:DomainObject<Component,int>
    {
        public virtual string Name { get; set; }

    }
}
