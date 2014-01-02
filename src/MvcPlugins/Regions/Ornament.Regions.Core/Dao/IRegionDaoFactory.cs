namespace Ornament.Regions.Dao
{
    public interface IRegionDaoFactory
    {
        IAreaDao CreateAreaDao();
        ICityDao CreateCityDao();
        IProvicenDao CreateProvinceDao();
    }
}