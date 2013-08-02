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
            Relative = relative;
        }

        public virtual User Owner { get; set; }
        public virtual User Relative { get; set; }
        public virtual string Memo { get; set; }
        public virtual string Group { get; set; }
    }
}