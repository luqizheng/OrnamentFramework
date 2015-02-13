using System.Collections.Generic;
using Qi.Domain;

namespace Ornament.Regions.Dao
{
    public interface IAreaDao : IDao<int, District>
    {
        IList<District> FindByCity(City city);

        District FindByName(string name, City city);
    }
}