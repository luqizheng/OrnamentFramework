using Ornament.Contexts;
using Ornament.Regions.Dao;

// ReSharper disable once CheckNamespace

namespace Ornament
{
    public static class OramentContext
    {
        public static IRegionDaoFactory RegionsDaoFactory(this DaoFactory daoFactory)
        {
            return daoFactory.GetDaoFactory<IRegionDaoFactory>();
        }
    }
}