using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;

namespace Ornament.MVCWebFrame.Areas.MemberShips.Controllers
{
    public class UsersController : ApiController
    {
        private readonly IMemberShipFactory _factory;

        public UsersController(IMemberShipFactory factory)
        {
            _factory = factory;
        }

        // GET api/usersapi
        [HttpGet]
        public IEnumerable<object> Match(string name,
            string email, string loginId,string phone, int? pageIndex, int? pageSize)
        {
            if (pageIndex == null)
                pageIndex = 0;
            if (pageSize == 0)
                pageSize = 10;
            IList<User> result = _factory.CreateUserDao()
                .QuickSearch(name, loginId, email, phone, pageSize.Value, pageIndex.Value);

            var c = from user in result
                    select new
                        {
                            id = user.Id,
                            user.Name,
                            user.Email,
                            user.LoginId
                        };
            return c;
        }
    }
}