using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Ornament.MemberShip.Dao;

namespace Ornament.MemberShip.Web.Plugin.Api
{
    [Authorize]
    public class UserGroupsController : ApiController
    {
        private readonly IMemberShipDaoFactory _daoFactory;

        public UserGroupsController(IMemberShipDaoFactory daoFactory)
        {
            _daoFactory = daoFactory;
        }

        // GET api/usersapi
        public IEnumerable<object> Get(string name, int? page)
        {
            int page1 = page ?? 0;
            IEnumerable<UserGroup> result = _daoFactory.CreateUserGroupDao().Find(name, page1, 10);

            var c = from user in result
                select new
                {
                    id = user.Id,
                    user.Name,
                };
            return c;
        }
    }
}