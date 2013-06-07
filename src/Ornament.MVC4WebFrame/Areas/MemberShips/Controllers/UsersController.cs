using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
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
        public IEnumerable<object> Match(string nameOrEmailOrLoginId, int? pageIndex)
        {
            var page = pageIndex ?? 0;
            var result = _factory.CreateUserDao().Search(nameOrEmailOrLoginId, nameOrEmailOrLoginId, null, null, null, pageIndex, 40);

            var c = from user in result

                    select new
                        {
                            id = user.Id,
                            Name = user.Name,
                            Email = user.Email,
                            LoginId = user.LoginId
                        };
            return c;

        }


    }
}
