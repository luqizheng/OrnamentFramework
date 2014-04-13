using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using NHibernate.Criterion;
using NHibernate.Mapping;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Areas.MemberShips.Models;
using Ornament.MemberShip.Plugin.Models;
using Qi.Web.Http;

namespace Ornament.MemberShip.Plugin.Api
{
    [ApiSession,]
    [Authorize]
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
            var currentUser = OrnamentContext.MemberShip.CurrentUser();
            if (OrnamentContext.MemberShip.HasRight(ResourceSetting.Org, OrgOperator.Read))
            {
                var orgDao = _factory.CreateOrgDao();
                int pageIndex = page ?? 0;
                IEnumerable<Org> result = currentUser.Org == null
                    ? orgDao.Find(name, pageIndex, 10)
                    : orgDao.Find(currentUser.Org, name, pageIndex, 10);

                var c = from org in result
                        select new
                        {
                            id = org.Id,
                            Name = org.Name,
                        };
                return c;
            }
            return new List<object>()
            {
                new
                {
                    id = "",
                    Name = "没有权限访问组织"
                }
            };
        }
    }
}