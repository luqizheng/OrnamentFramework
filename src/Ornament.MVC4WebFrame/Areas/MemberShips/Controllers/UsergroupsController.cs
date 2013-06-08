using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Ornament.MemberShip.Dao;

namespace Ornament.MVCWebFrame.Areas.MemberShips.Controllers
{
    public class UserGroupsController : ApiController
    {
        private readonly IMemberShipFactory _factory;

        public UserGroupsController(IMemberShipFactory factory)
        {
            _factory = factory;
        }

        // GET api/usersapi
        [HttpGet]
        public IEnumerable<object> Match(string name, int? pageIndex)
        {
            var page = pageIndex ?? 0;
            var result = _factory.CreateUserGroupDao().Find(name , page, 10);

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