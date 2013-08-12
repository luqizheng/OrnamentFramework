using System.Collections.Generic;
using Qi.Domain;

namespace Ornament.MemberShip.Relatives
{
    public class FriendGroup : DomainObject<FriendGroup, string>
    {
        private ISet<Friend> _friends;
        public virtual string Name { get; set; }
        public virtual User Owner { get; set; }

        public virtual ISet<Friend> Friends
        {
            get { return _friends ?? (_friends = new HashSet<Friend>()); }
        }
    }
}