using System.Linq;
using System.Web.Http;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Dao.NHibernateImple;
using Ornament.MemberShip.Web.Plugin.Models.Memberships;
using Qi.Web.Http;

namespace Ornament.MemberShip.Web.Plugin.Api
{
    [ApiSession, Authorize]
    public class OrgController : ApiController
    {
        private readonly IMemberShipFactory _factory;

        public OrgController(IMemberShipFactory factory)
        {
            _factory = factory;
        }

        [HttpGet]
        public object Get(string id)
        {
            IOrgDao dao = _factory.CreateOrgDao();
            Org org = dao.Get(id);
            if (org.Parent == null)
            {
                var restlt = new
                {
                    org.Name,
                    org.Id,
                    org.Remarks,
                    Roles = org.Roles.ToArray()
                };
                return restlt;
            }
            else
            {
                var restlt = new
                {
                    org.Name,
                    org.Id,
                    org.Remarks,
                    Parent = new
                    {
                        org.Parent.Name,
                        org.Parent.Id
                    },
                    Roles=org.Roles.Select(s=>s.Id).ToArray()
                };
                return restlt;
            }
        }


        [HttpPost]
        public object Save(OrgModel model)
        {
            model.Save(_factory.CreateOrgDao());
            return new
            {
                Success = true,
            };
        }
    }
}