using System.ComponentModel.DataAnnotations;
using Iesi.Collections.Generic;
using Qi.Domain;

namespace Badminton
{
    /// <summary>
    ///     场馆
    /// </summary>
    public class Gymnasium : DomainObject<Gymnasium, int>
    {
        private ISet<Yard> _yards;

        [Display(Name = "名字")]
        public virtual string Name { get; set; }

        public virtual string Phone { get; set; }
        public virtual string Address { get; set; }

        public virtual ISet<Yard> Yards
        {
            get { return _yards ?? (_yards = new HashedSet<Yard>()); }
        }

        public virtual string Remarks { get; set; }
    }
}