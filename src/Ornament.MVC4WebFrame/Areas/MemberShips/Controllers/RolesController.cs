﻿using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Mvc;
using Ornament.MemberShip.Dao;

namespace Ornament.MVCWebFrame.Areas.MemberShips.Controllers
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
        public IEnumerable<object> Match(string name, int? pageIndex)
        {
            var page = pageIndex ?? 0;
            var result = _factory.CreateRoleDao().Find(name + "%", page, 10);

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