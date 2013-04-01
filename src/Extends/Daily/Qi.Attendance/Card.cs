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

        public override int GetHashCode()
        {
            unchecked
            {
                int hashCode = base.GetHashCode();
                hashCode = (hashCode*397) ^ (Number != null ? Number.GetHashCode() : 0);
                hashCode = (hashCode*397) ^ (int) State;
                hashCode = (hashCode*397) ^ (Employee != null ? Employee.GetHashCode() : 0);
                return hashCode;
            }
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != GetType()) return false;
            return Equals((Card) obj);
        }
    }
}