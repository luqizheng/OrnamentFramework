using System.Linq;
using NHibernate.Criterion;
using NHibernate.Linq;
using Ornament.MemberShip.Security;
using Qi.Domain.NHibernates;

namespace Ornament.MemberShip.Dao.NHibernateImple
{
    public sealed class UserSecurityTokenDao : DaoBase<string, UserSecretToken>, IUserSecurityTokenDao
    {
        public UserSecretToken Get(User user, string action)
        {
            var cri = CreateDetachedCriteria()
                .Add(Restrictions.Eq(Projections.Property<UserSecretToken>(s => s.Status), SecretTokenStatus.Effective))
                .Add(Restrictions.Eq(Projections.Property<UserSecretToken>(s => s.Account), user))
                .Add(Restrictions.Eq(Projections.Property<UserSecretToken>(s => s.Action), action));


            return cri.GetExecutableCriteria(this.CurrentSession).UniqueResult<UserSecretToken>();
        }

        public IQueryable<UserSecretToken> Tokens { get { return this.CurrentSession.Query<UserSecretToken>(); } }

        public override void SaveOrUpdate(UserSecretToken t)
        {
            if (t.Id == null)
            {
                var previousToke = this.Get(t.Account, t.Action);
                //if found the prevous Token, it should be let it invalidate.
                if (previousToke != null)
                {
                    previousToke.Expire();
                    base.SaveOrUpdate(previousToke);
                }
            }
            base.SaveOrUpdate(t);
        }

        public override string Save(UserSecretToken t)
        {
            if (t.Id == null)
            {
                var previousToke = this.Get(t.Account, t.Action);
                //if found the prevous Token, it should be let it invalidate.
                if (previousToke != null)
                {
                    previousToke.Expire();
                    base.SaveOrUpdate(previousToke);
                }
            }
            return base.Save(t);
        }
    }
}