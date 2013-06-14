﻿using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;

namespace Ornament.MVCWebFrame.Areas.MemberShips.Controllers
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
        public IEnumerable<object> Match(string name, int? pageIndex)
        {
            int page = pageIndex ?? 0;
            IEnumerable<Org> result = _factory.CreateOrgDao().Find(name, page, 10);

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