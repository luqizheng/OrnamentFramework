namespace Badminton.Dao
{
    public interface IBadmintonDaoFactory
    {
        IGymnasiumDao GymasiumDao();
        IYardDao YardDao();
        ICardDao CardDao();
        IActivityDao ActivityDao();
        IClassConsumablesDao ClassConsumablesDao();
        IBrandDao BrandDao();
        IModelDao ModelDao();
        IConsumablesDao ConsumablesDao();
        IConsumablesHistoryDao ConsumablesHistoryDao();

    }
}