using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Ornament.MemberShip.Dao;

namespace Ornament.MemberShip.Plugin.Api
{
    public class RolesController : ApiController
    {
        private readonly IMemberShipFactory _factory;

        public RolesController(IMemberShipFactory factory)
        {
            _factory = factory;
        }

        // GET api/usersapi
        [System.Web.Http.HttpGet]
        public IEnumerable<object> Match(string name, int? page)
        {
            var page1 = page ?? 0;
            var result = _factory.CreateRoleDao().Find(name + "%", page1, 10);

            var c = from role in result

                    select new
                        {
                            id = role.Id,
                            Name = role.Name,
                        };
            return c;
        }
    }
}