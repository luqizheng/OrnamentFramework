using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models;
using Ornament.MemberShip.Web.Plugin.Areas.MemberShips.Models;
using Ornament.MemberShip.Web.Plugin.Models.Memberships;
using Qi.Web.Http;

namespace Ornament.MemberShip.Web.Plugin.Api
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
        public IEnumerable<object> List()
        {
            User currentUser = OrnamentContext.MemberShip.CurrentUser();
            
            if (OrnamentContext.MemberShip.HasRight(ResourceSetting.Org, OrgOperator.Read))
            {
                IOrgDao orgDao = _factory.CreateOrgDao();
                
                IEnumerable<Org> result = currentUser.Org == null
                    ? orgDao.GetRootOrgs()
                    : orgDao.GetSubOrgs(currentUser.Org);

                return OrgDto.ToTree(result);
            }
            return new List<object>
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