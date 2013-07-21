using System;
using Qi.Domain;

namespace Badminton
{
    public class Model : DomainObject<Model, int>
    {
        protected Model()
        {
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="brand"></param>
        /// <exception cref="ArgumentNullException">brand 输入为空</exception>
        public Model(Brand brand)
        {
            if (brand == null) throw new ArgumentNullException("brand");
            Brand = brand;
        }

        public virtual string Prefix { get; set; }
        public virtual string Suffix { get; set; }
        public virtual string Name { get; set; }
        public virtual Brand Brand { get; set; }
        
        public override string ToString()
        {
            return Brand.Name + (Prefix ?? "") + (Name + Suffix ?? "");
        }
    }
}