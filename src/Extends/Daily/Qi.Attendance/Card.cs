using System.ComponentModel.DataAnnotations;
using Qi.Domain;

namespace Qi.Attendance
{
    public enum CardState
    {
        [EnumDescription("正常")] Normal,
        [EnumDescription("取消")] Cancel
    }

    public class Card : DomainObject<Card, string>
    {
        [Display(Name = "卡号")]
        public virtual string Number { get; set; }

        [Display(Name = "卡状态")]
        public virtual CardState State { get; set; }

        [Display(Name = "雇员")]
        public virtual Employee Employee { get; set; }

        protected bool Equals(Card other)
        {
            return base.Equals(other) && string.Equals(Number, other.Number) && State == other.State &&
                   Equals(Employee, other.Employee);
        }
    }
}