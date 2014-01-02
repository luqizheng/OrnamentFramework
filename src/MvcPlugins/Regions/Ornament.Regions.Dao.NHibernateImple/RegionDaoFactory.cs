namespace Ornament.Regions.Dao.NHibernateImple
{
    public class RegionDaoFactory : IRegionDaoFactory
    {
        public IAreaDao CreateAreaDao()
        {
            return new AreaDao();
        }

        public ICityDao CreateCityDao()
        {
            return new CityDao();
        }

        public IProvicenDao CreateProvinceDao()
        {
            return new ProvinceDao();
        }
    }
}