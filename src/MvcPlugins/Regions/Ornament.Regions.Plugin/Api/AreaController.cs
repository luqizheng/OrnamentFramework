using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Ornament.Regions.Dao;
using Qi.Web.Http;

namespace Ornament.Regions.Plugin.Api
{
    [ApiSession]
    public class AreaController : ApiController
    {
        private readonly IRegionDaoFactory _regionDaoFactory;

        public AreaController(IRegionDaoFactory regionDaoFactory)
        {
            _regionDaoFactory = regionDaoFactory;
        }

        [HttpGet]
        public IEnumerable<object> Areas([FromUri] int? id)
        {
            City city = _regionDaoFactory.CreateCityDao().Get(id.Value);

            return from area in _regionDaoFactory.CreateAreaDao().FindByCity(city)
                select new
                {
                    id = area.Id.ToString(),
                    text = area.Name
                };
        }
    }
}