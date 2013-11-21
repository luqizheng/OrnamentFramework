using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Ornament.MemberShip.Dao;

namespace Ornament.MemberShip.Plugin.Api
{
    public class OrgsController : ApiController
    {
        private readonly IMemberShipFactory _factory;

        public OrgsController(IMemberShipFactory factory)
        {
            _factory = factory;
        }

        // GET api/usersapi
        [HttpGet]
        public IEnumerable<object> Match(string name, int? page)
        {
            int page1 = page ?? 0;
            IEnumerable<Org> result = _factory.CreateOrgDao().Find(name, page1, 10);

            var c = from org in result
                    select new
                        {
                            id = org.Id,
                            Name=org.Name,
                        };
            return c;
        }
    }
}