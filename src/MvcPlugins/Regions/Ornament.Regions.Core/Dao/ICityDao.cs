using System.Collections.Generic;
using Qi.Domain;

namespace Ornament.Regions.Dao
{
    public interface ICityDao : IDao<int, City>
    {
        IList<City> FindByProvince(Province province);

        City FindByName(string name);
    }
}