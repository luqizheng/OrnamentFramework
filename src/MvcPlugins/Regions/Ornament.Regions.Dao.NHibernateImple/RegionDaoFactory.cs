namespace Ornament.Regions.Dao.NHibernateImple
{
    public class RegionDaoFactory : IRegionDaoFactory
    {
        public IDistrictDao CreateAreaDao()
        {
            return new DistrictDao();
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