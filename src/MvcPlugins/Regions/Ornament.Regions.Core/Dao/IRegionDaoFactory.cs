namespace Ornament.Regions.Dao
{
    public interface IRegionDaoFactory
    {
        IDistrictDao CreateAreaDao();
        ICityDao CreateCityDao();
        IProvicenDao CreateProvinceDao();
    }
}