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
            var list = _regionDaoFactory.CreateCityDao().FindByProvince(province);
            return from area in list
                   select new
                   {
                       id = area.Id.ToString(),
                       text = area.Name
                   };
        }
    }
}