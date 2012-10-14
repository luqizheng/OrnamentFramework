using System.ComponentModel.DataAnnotations;
using Iesi.Collections.Generic;
using Qi.Domain;

namespace QiProject
{
    public class Product : DomainObject<Product, int>
    {
        private ISet<Component> _components;

        [Display(Name = "Name")]
        public virtual string Name { get; set; }

        [Display(Name = "Components"), UIHint("Components")]
        public virtual ISet<Component> Components
        {
            get { return _components ?? (_components = new HashedSet<Component>()); }
        }

        public override string ToString()
        {
            return Name;
        }
    }
}