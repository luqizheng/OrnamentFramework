using System.Collections.Generic;
using Qi.Domain;

namespace Ornament.Regions.Dao
{
    public interface IAreaDao : IDao<int, Area>
    {
        IList<Area> FindByCity(City city);

        Area FindByName(string name, City city);
    }
}