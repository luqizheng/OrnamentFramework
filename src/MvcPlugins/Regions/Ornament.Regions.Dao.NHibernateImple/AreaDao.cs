using System;
using System.Collections.Generic;
using NHibernate.Criterion;
using Qi.Domain.NHibernates;

namespace Ornament.Regions.Dao.NHibernateImple
{
    public class AreaDao : DaoBase<int, Area>, IAreaDao
    {
        public IList<Area> FindByCity(City city)
        {
            if (city == null) throw new ArgumentNullException("city");
            return CreateDetachedCriteria()
                .Add(Restrictions.Eq(Projections.Property<Area>(s => s.City), city))
                .GetExecutableCriteria(CurrentSession)
                .List<Area>();
        }

        public Area FindByName(string name)
        {
            if (name == null) throw new ArgumentNullException("name");
            return CreateDetachedCriteria()
                .Add(Restrictions.Eq(Projections.Property<Area>(s => s.Name), name))
                .GetExecutableCriteria(CurrentSession)
                .UniqueResult<Area>();
        }
    }
}