using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Ornament.Regions.Dao;
using Qi.Web.Http;

namespace Ornament.Regions.Plugin.Api
{
    [ApiSession]
    public class CityController : ApiController
    {
        private readonly IRegionDaoFactory _regionDaoFactory;

        public CityController(IRegionDaoFactory regionDaoFactory)
        {
            _regionDaoFactory = regionDaoFactory;
        }

        [HttpGet]
        public IEnumerable<object> Cities([FromUri] int? id)
        {
            Province province = _regionDaoFactory.CreateProvinceDao().Get(id.Value);

            return from area in _regionDaoFactory.CreateCityDao().FindByProvince(province)
                select new
                {
                    id = area.Id.ToString(),
                    text = area.Name
                };
        }
    }
}