using System.ComponentModel.DataAnnotations;
using Qi.Domain;

namespace Badminton
{
    /// <summary>
    /// 场地，场馆下属的每一片场地
    /// </summary>
    public class Yard : DomainObject<Yard, int>
    {
        
        [Display(Name="名称")]
        public virtual string Name { get; set; }

        [Display(Name = "单价")]
        public virtual decimal Price { get; set; }
        [Display(Name = "描述")]
        public virtual string Remarks { get; set; }

    }
}