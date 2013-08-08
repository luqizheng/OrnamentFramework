using Qi.Domain;

namespace Ornament.MemberShip.Relatives
{
    public class Friend : DomainObject<Friend, string>
    {
        protected Friend()
        {
        }

        public Friend(User owner, User relative)
        {
            Owner = owner;
            User = relative;
        }

        public virtual User Owner { get; set; }
        public virtual User User { get; set; }
        public virtual string Remarks { get; set; }
        public virtual string GroupName { get; set; }
    }
}