using System.Collections.Generic;
using NHibernate.Criterion;
using Ornament.MemberShip.Relatives;
using Qi.Domain.NHibernates;

namespace Ornament.MemberShip.Dao.NHibernateImple
{
    public class FriendDao : DaoBase<string, Friend>, IFriendDao
    {
        public IList<Friend> GetFriends(User owner)
        {
            return CreateDetachedCriteria()
                .Add(NHibernate.Criterion.Restrictions.Eq(Projections.Property<Friend>(s => s.Owner), owner))
                .SetMaxResults(400)
                .GetExecutableCriteria(this.CurrentSession).List<Friend>();
        }
    }
}