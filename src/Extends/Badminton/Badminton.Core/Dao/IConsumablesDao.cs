using Qi.Domain;

namespace Badminton.Dao
{
    public interface IConsumablesDao
    {
        void SaveOrUpdate(IConsumables consumables);
    }
}