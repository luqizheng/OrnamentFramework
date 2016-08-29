using System.Collections.Generic;
using NHibernate.Criterion;
using Ornament.Identity.Enterprise;
using Ornament.Identity.Enterprise.Stores;
using Ornament.NHibernate;
using Ornament.NHibernate.Uow;

namespace Ornament.Identity.Dao.NhImple
{
    public class OrgStore : Store<Org, int>, IOrgStore
    {
        public OrgStore(NhUow context) : base(context)
        {
        }

        protected IProjection ParentProperty
        {
            get { return Projections.Property<Org>(s => s.Parent); }
        }

        public IEnumerable<Org> GetOrgs(Org parentOrg)
        {
            var criteria = DetachedCriteria.For<Org>()
                .Add(parentOrg == null
                    ? Restrictions.IsNull(ParentProperty)
                    : Restrictions.Eq(ParentProperty, parentOrg));
            return criteria.GetExecutableCriteria(Context).List<Org>();
        }
    }
}