using System.Collections.Generic;
using NHibernate.Criterion;
using Qi.Domain.NHibernates;

namespace Ornament.Regions.Dao.NHibernateImple
{
    public class CityDao : DaoBase<int, City>, ICityDao
    {
        public IList<City> FindByProvince(Province province)
        {
            return CreateDetachedCriteria()
                .Add(Restrictions.Eq(Projections.Property<City>(s => s.Province), province))
                .GetExecutableCriteria(this.CurrentSession)
                .List<City>();
        }

        public City FindByName(string name)
        {
            return CreateDetachedCriteria()
                .Add(Restrictions.Eq(Projections.Property<City>(s => s.Name), name))
                .GetExecutableCriteria(this.CurrentSession)
                .UniqueResult<City>();
        }
    }
}