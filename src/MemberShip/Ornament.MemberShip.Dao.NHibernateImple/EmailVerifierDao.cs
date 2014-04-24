using System.Linq;
using NHibernate.Criterion;
using NHibernate.Linq;
using Ornament.MemberShip.Security;
using Qi.Domain.NHibernates;

namespace Ornament.MemberShip.Dao.NHibernateImple
{
    public sealed class EmailVerifierDao : DaoBase<string, EmailVerifier>, IUserSecurityTokenDao
    {
        public EmailVerifier Get(User user, VerifyType type)
        {
            DetachedCriteria cri = CreateDetachedCriteria()
                .Add(Restrictions.Eq(Projections.Property<EmailVerifier>(s => s.Status), SecretTokenStatus.Effective))
                .Add(Restrictions.Eq(Projections.Property<EmailVerifier>(s => s.Account), user))
                .Add(Restrictions.Eq(Projections.Property<EmailVerifier>(s => s.Type), type));
            ;


            return cri.GetExecutableCriteria(CurrentSession).UniqueResult<EmailVerifier>();
        }

        public IQueryable<EmailVerifier> Tokens
        {
            get { return CurrentSession.Query<EmailVerifier>(); }
        }

        public override void SaveOrUpdate(EmailVerifier t)
        {
            if (t.Id == null)
            {
                EmailVerifier previousToke = Get(t.Account, t.Type);
                //if found the prevous Token, it should be let it invalidate.
                if (previousToke != null)
                {
                    previousToke.Expire();
                    base.SaveOrUpdate(previousToke);
                }
            }
            base.SaveOrUpdate(t);
        }

        public override string Save(EmailVerifier t)
        {
            if (t.Id == null)
            {
                EmailVerifier previousToke = Get(t.Account, t.Type);
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