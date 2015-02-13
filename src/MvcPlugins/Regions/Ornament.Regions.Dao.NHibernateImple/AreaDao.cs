using System;
using System.Collections.Generic;
using NHibernate.Criterion;
using Qi.Domain.NHibernates;

namespace Ornament.Regions.Dao.NHibernateImple
{
    public class AreaDao : DaoBase<int, District>, IAreaDao
    {
        public IList<District> FindByCity(City city)
        {
            if (city == null) throw new ArgumentNullException("city");
            return CreateDetachedCriteria()
                .Add(Restrictions.Eq(Projections.Property<District>(s => s.City), city))
                .GetExecutableCriteria(CurrentSession)
                .List<District>();
        }

        public District FindByName(string name,City city)
        {
            if (name == null) throw new ArgumentNullException("name");
            return CreateDetachedCriteria()
                .Add(Restrictions.Eq(Projections.Property<District>(s => s.Name), name))
                .Add(Restrictions.Eq(Projections.Property<District>(s => s.City), city))
                .GetExecutableCriteria(CurrentSession)
                .UniqueResult<District>();
        }
    }
}