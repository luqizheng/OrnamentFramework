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

        [Display(Name = "联系电话")]
        public virtual string Phone { get; set; }

        [Display(Name = "地址")]
        public virtual string Address { get; set; }

        public virtual ISet<Yard> Yards
        {
            get { return _yards ?? (_yards = new HashedSet<Yard>()); }
        }

        [Display(Name = "备注")]
        public virtual string Remarks { get; set; }
    }


    


}