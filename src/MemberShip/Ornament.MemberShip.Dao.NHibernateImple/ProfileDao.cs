using System;
using System.Collections.Generic;
using System.Linq;
using NHibernate;
using NHibernate.Criterion;
using NHibernate.Linq;
using NHibernate.Type;
using Qi;
using Qi.Domain.NHibernates;

namespace Ornament.MemberShip.Dao.NHibernateImple
{
    public class ProfileDao : DaoBase<string, ProfileValue>, IUserProfileDao
    {
        private readonly ObjectInitialization _pools = new ObjectInitialization();

        protected IProjection LoginIdProperty
        {
            get { return _pools.Once(() => Projections.Property<ProfileValue>(s => s.LoginId)); }
        }


        protected IProjection LastActivityDateProperty
        {
            get { return _pools.Once(() => Projections.Property<ProfileValue>(s => s.LastActivityDate)); }
        }

        protected IProjection AnonymousProperty
        {
            get { return _pools.Once(() => Projections.Property<ProfileValue>(s => s.IsAnonymous)); }
        }

      
        #region IUserProfileDao Members

        public int Delete(string[] userName)
        {
            var disjunction = new Disjunction();
            int i = 0;
            foreach (string user in userName)
            {
                disjunction.Add(Restrictions.Eq(LoginIdProperty, user));
            }
            foreach (ProfileValue profile in CreateCriteria().Add(disjunction).List<ProfileValue>())
            {
                i++;
                CurrentSession.Delete(profile);
            }
            return i;
        }

        public int DeleteAnonymous(DateTime userInactiveSinceDate)
        {
            return CurrentSession.Delete(
                string.Format("from ProfileValue p where p.{0}<:date and p.{1}=:anonymous", LastActivityDateProperty,
                              AnonymousProperty),
                new object[] {userInactiveSinceDate, true}, new IType[] {NHibernateUtil.Date, NHibernateUtil.Boolean});
        }

        public int DeleteAuthenticated(DateTime userInactiveSinceDate)
        {
            return CurrentSession.Delete(
                string.Format("from ProfileValue p where p.{0}<:date and p.{1}=:anonymous", LastActivityDateProperty,
                              AnonymousProperty),
                new object[] {userInactiveSinceDate, false}, new IType[] {NHibernateUtil.Date, NHibernateUtil.Boolean});
        }

        public int Delete(DateTime userInactiveSinceDate)
        {
            return CurrentSession.Delete(
                string.Format("from ProfileValue p where p.{0}<:date", LastActivityDateProperty),
                new object[] {userInactiveSinceDate}, new IType[] {NHibernateUtil.Date});
        }

        public int CountAnonymous(DateTime userInactiveSinceDate)
        {
            return CreateDetachedCriteria()
                .Add(Restrictions.Le(LastActivityDateProperty, userInactiveSinceDate))
                .Add(Restrictions.Eq(AnonymousProperty, true))
                .SetProjection(Projections.RowCount())
                .GetExecutableCriteria(CurrentSession).UniqueResult<int>();
        }

        public int CountAuthenticated(DateTime userInactiveSinceDate)
        {
            return CreateDetachedCriteria()
                .Add(Restrictions.Le(LastActivityDateProperty, userInactiveSinceDate))
                .Add(Restrictions.Eq(AnonymousProperty, false))
                .SetProjection(Projections.RowCount())
                .GetExecutableCriteria(CurrentSession).UniqueResult<int>();
        }

        public int Count(DateTime userInactiveSinceDate)
        {
            return CreateDetachedCriteria()
                .Add(Restrictions.Le(LastActivityDateProperty, userInactiveSinceDate))
                .SetProjection(Projections.RowCount())
                .GetExecutableCriteria(CurrentSession).UniqueResult<int>();
        }

        public IList<ProfileValue> GetAllAnonymous(int pageIndex, int pageSize, out int totalRecords)
        {
            totalRecords = CreateDetachedCriteria()
                .Add(Restrictions.Eq(AnonymousProperty, true))
                .SetProjection(Projections.RowCount()).GetExecutableCriteria(this.CurrentSession).UniqueResult<int>();
            return CreateDetachedCriteria()
                   .Add(Restrictions.Eq(AnonymousProperty, true))
                   .SetFirstResult(pageIndex*pageSize)
                   .SetMaxResults(pageSize)
                   .GetExecutableCriteria(CurrentSession).List<ProfileValue>();
        }

        public IList<ProfileValue> GetAllAuthenticated(int pageIndex, int pageSize, out int totalRecords)
        {
            totalRecords = CreateDetachedCriteria()
                .Add(Restrictions.Eq(AnonymousProperty, false))
                .SetProjection(Projections.RowCount()).GetExecutableCriteria(this.CurrentSession).UniqueResult<int>();
            return CreateDetachedCriteria()
                   .Add(Restrictions.Eq(AnonymousProperty, false))
                   .SetFirstResult(pageIndex * pageSize)
                   .SetMaxResults(pageSize)
                   .GetExecutableCriteria(CurrentSession).List<ProfileValue>();
        }

        public IList<ProfileValue> GetAll(int pageIndex, int pageSize, out int totalRecords)
        {
            totalRecords = CreateDetachedCriteria()
               //.Add(Restrictions.Eq(AnonymousProperty, false))
               .SetProjection(Projections.RowCount()).GetExecutableCriteria(this.CurrentSession).UniqueResult<int>();
            return CreateDetachedCriteria()
                  // .Add(Restrictions.Eq(AnonymousProperty, false))
                   .SetFirstResult(pageIndex * pageSize)
                   .SetMaxResults(pageSize)
                   .GetExecutableCriteria(CurrentSession).List<ProfileValue>();
        }


        public IQueryable<ProfileValue> Profiles
        {
            get { return CurrentSession.Query<ProfileValue>(); }
        }

        public ProfileValue FindByLoginId(string loginId)
        {
            return
                CreateDetachedCriteria().Add(Restrictions.Eq(LoginIdProperty, loginId).IgnoreCase()).
                    GetExecutableCriteria(CurrentSession).UniqueResult<ProfileValue>();
        }

        #endregion
    }
}