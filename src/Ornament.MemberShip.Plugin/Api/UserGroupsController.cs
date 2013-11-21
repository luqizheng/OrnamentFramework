using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Ornament.MemberShip.Dao;

namespace Ornament.MemberShip.Plugin.Api
{
    [Authorize]
    public class UserGroupsController : ApiController
    {
        private readonly IMemberShipFactory _factory;

        public UserGroupsController(IMemberShipFactory factory)
        {
            _factory = factory;
        }

        // GET api/usersapi
        public IEnumerable<object> Get(string name, int? page)
        {
            var page1 = page ?? 0;
            var result = _factory.CreateUserGroupDao().Find(name, page1, 10);

            var c = from user in result

                    select new
                        {
                            id = user.Id,
                            Name = user.Name,
                        };
            return c;
        }
    }
}