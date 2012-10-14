using System;
using System.Collections.Generic;
using System.Linq;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao.NHibernateImple;
using Ornament.MemberShip.Permissions;
using Qi;
using Qi.Domain.NHibernates;
using NHibernate.Criterion;
using QiProject.Operators;

namespace QiProject.Dao.NhImple
{
    public class ProjectDao : DaoBase<int, Project>, IProjectDao
    {
        private readonly ObjectInitialization _pools = new ObjectInitialization();


        private IProjection NameProperty
        {
            get { return _pools.Once(() => Projections.Property<Permission>(s => s.Name)); }
        }

        private IProjection ResourceProperty
        {
            get { return _pools.Once(() => Projections.Property<Permission>(s => s.Resource)); }
        }

        private IProjection UserLoginidProperty
        {
            get { return _pools.Once(() => Projections.Property<User>(s => s.LoginId)); }
        }

        private IProjection UserOrgProperty
        {
            get { return _pools.Once(() => Projections.Property<User>(s => s.Org)); }
        }

        public IList<Project> List(User currentUser, DefectOperator @operator)
        {
            if (currentUser == null)
                throw new ArgumentNullException("currentUser");

            var res = new ResourceDao();
            return res.FindResources<Project>(currentUser, @operator);

        }
    }
}