using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using NHibernate.Criterion;
using NHibernate.Mapping;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Areas.MemberShips.Models;
using Qi.Web.Http;

namespace Ornament.MemberShip.Plugin.Api
{
    [ApiSession]
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
            var role = _factory.CreateRoleDao().GetByName(ResourceSetting.AdminAccount);
            var orgDao = _factory.CreateOrgDao();
            bool fiandAllOrg = currentUser.InRole(role);

            int page1 = page ?? 0;
            IEnumerable<Org> result;
            if (currentUser.Org != null)
            {
                result = fiandAllOrg
                    ? orgDao.Find(name, page1, 10)
                    : orgDao.Find(currentUser.Org, name, page1, 10);

                var c = from org in result
                        select new
                        {
                            id = org.Id,
                            Name = org.Name,
                        };
                return c;
            }
            else
            {
                return new List<object>()
                {
                    new
                    {
                        id="",
                        Name="没有权限访问组织"
                    }
                };
            }



        }
    }
}