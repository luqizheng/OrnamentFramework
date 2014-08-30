using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Ornament.MemberShip.Dao;
using Qi.Web.Http;

namespace Ornament.MemberShip.Web.Plugin.Api
{
    [Authorize]
    public class RolesController : ApiController
    {
        private readonly IMemberShipFactory _factory;

        public RolesController(IMemberShipFactory factory)
        {
            _factory = factory;
        }

        // GET api/usersapi
        [HttpGet, ApiSession]
        public IEnumerable<object> Match(string name, int? page)
        {
            int page1 = page ?? 0;
            var user = OrnamentContext.MemberShip.CurrentUser();
            IList<Role> result = _factory.CreateRoleDao().Find("%" + name + "%", page1, 10, user);
            var c = from role in result
                    select new
                    {
                        id = role.Id,
                        role.Name,
                    };
            return c;
        }


    }
}