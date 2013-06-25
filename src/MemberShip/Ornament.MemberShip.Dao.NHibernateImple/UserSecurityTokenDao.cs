using NHibernate.Criterion;
using Ornament.MemberShip.Secret;
using Qi.Domain.NHibernates;

namespace Ornament.MemberShip.Dao.NHibernateImple
{
    public sealed class UserSecurityTokenDao : DaoBase<string, UserSecretToken>, IUserSecurityTokenDao
    {
        public UserSecretToken Get(User user, ActiveUserAction action)
        {
            var cri = CreateDetachedCriteria()
                .Add(Restrictions.Eq(Projections.Property<UserSecretToken>(s => s.Account), user))
                .Add(Restrictions.Eq(Projections.Property<UserSecretToken>(s => s.Action), action));
            return cri.GetExecutableCriteria(this.CurrentSession).UniqueResult<UserSecretToken>();

        }
    }
}