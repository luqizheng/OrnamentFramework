using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using NHibernate;
using NHibernate.Criterion;
using NHibernate.Linq;
using Qi;
using Qi.Domain.NHibernates;

namespace Ornament.MemberShip.Dao.NHibernateImple
{
    public class UserGroupDao : DaoBase<string, UserGroup>, IUserGroupDao
    {
        private readonly ObjectInitialization _objPools = new ObjectInitialization();

        public IProjection NameProperty
        {
            get { return _objPools.Once(() => Projections.Property<UserGroup>(p => p.Name)); }
        }

        #region IUserGroupDao Members

        public override IList<UserGroup> GetAll()
        {
            return CreateDetachedCriteria().GetExecutableCriteria(CurrentSession).List<UserGroup>();
        }

        public IQueryable<UserGroup> UserGroups
        {
            get { return CurrentSession.Query<UserGroup>(); }
        }

        public ReadOnlyCollection<UserGroup> GetUserGroupByUser(string userLoginId)
        {
            IQuery query = CreateQuery("Select elements(u.UserGroups) from User u where u.LoginId=?");
            query.SetString(0, userLoginId);

            return new ReadOnlyCollection<UserGroup>(query.List<UserGroup>());
        }

        public ReadOnlyCollection<UserGroup> GetUnuseGroup(string loginId)
        {
            IQuery query =
                CreateQuery(
                    "From UserGroup ug where ug not in(Select elements(u.UserGroups) from User u where u.LoginId=?)");
            query.SetString(0, loginId);

            return new ReadOnlyCollection<UserGroup>(query.List<UserGroup>());
        }

        public IList<UserGroup> GetUserGroups(string[] guids)
        {
            if (guids == null || guids.Length == 0)
                return new ReadOnlyCollection<UserGroup>(new List<UserGroup>());

            ICriteria ica = CreateCriteria().Add(Restrictions.In("Id", guids));
            return new ReadOnlyCollection<UserGroup>(ica.List<UserGroup>());
        }

        public void Delete(string[] ids)
        {
            var builder = new StringBuilder("From UserGroup ug where ug in (");
            bool isFirst = true;
            foreach (string id in ids)
            {
                if (!isFirst)
                {
                    builder.Append(",");
                }
                else
                {
                    isFirst = false;
                }
                builder.Append("'" + id + "'");
            }
            builder.Append(")");
            CurrentSession.Delete(builder.ToString());
        }

        public UserGroup GetByName(string groupName)
        {
            PropertyProjection name = Projections.Property<UserGroup>(s => s.Name);
            return CreateDetachedCriteria().Add(Restrictions.Eq(name, groupName)).GetExecutableCriteria(
                CurrentSession).UniqueResult<UserGroup>();
        }

        public IList<UserGroup> FindAll(int pageIndex, int pageSize, out int total)
        {
            total =
                CreateDetachedCriteria()
                    .SetProjection(Projections.RowCount())
                    .GetExecutableCriteria(CurrentSession)
                    .UniqueResult<int>();
            return
                CreateDetachedCriteria().SetFirstResult(pageIndex*pageSize).SetMaxResults(pageSize).
                    GetExecutableCriteria(
                        CurrentSession).List<UserGroup>();
        }

        public IEnumerable<UserGroup> Find(string name, int pageIndex, int pageSize)
        {
            return CreateDetachedCriteria().SetMaxResults(pageSize).SetFirstResult(pageIndex*pageSize)
                .Add(Restrictions.InsensitiveLike(NameProperty, name))
                .GetExecutableCriteria(CurrentSession).List<UserGroup>();
        }

        public IEnumerable<UserGroup> GetByIds(string[] ids)
        {
            if (ids == null || ids.Length == 0)
                return new UserGroup[0];
            Disjunction disJunction = Restrictions.Disjunction();
            foreach (string id in ids)
            {
                disJunction.Add(Restrictions.Eq(Projections.Property<UserGroup>(s => s.Id), id).IgnoreCase());
            }

            return CreateDetachedCriteria().Add(disJunction).GetExecutableCriteria(CurrentSession).List<UserGroup>();
        }

        #endregion
    }
}