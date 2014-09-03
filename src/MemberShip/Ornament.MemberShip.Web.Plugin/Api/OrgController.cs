using System.Linq;
using System.Web.Http;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Web.Plugin.Models.Memberships;
using Qi.Web.Http;
using Qi.Web.Mvc;

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
            object result;
            if (org.Parent == null)
            {
                result = new
                {
                    org.Name,
                    org.Id,
                    Remarks = org.Remarks ?? "",
                    Roles = org.Roles.ToArray(),
                    Parent = new
                    {
                        Name = "",
                        Id = "",
                    }
                };
            }
            else
            {
                result = new
                {
                    org.Name,
                    org.Id,
                    org.Remarks,
                    Parent = new
                    {
                        org.Parent.Name,
                        org.Parent.Id
                    },
                    Roles = org.Roles.Select(s => s.Id).ToArray()
                };
            }
            return result;
        }


        [HttpPost]
        public object Save(OrgModel model)
        {
            Org org = model.Save(_factory.CreateOrgDao());
            object result;
            if (org.Parent == null)
            {
                result = new
                {
                    org.Name,
                    org.Id,
                    org.Remarks,
                    Roles = org.Roles.ToArray()
                };
            }
            else
            {
                result = new
                {
                    org.Name,
                    org.Id,
                    org.Remarks,
                    Parent = new
                    {
                        org.Parent.Name,
                        org.Parent.Id
                    },
                    Roles = org.Roles.Select(s => s.Id).ToArray()
                };
            }
            return new
            {
                Success = true,
                Data = result
            };
        }

        [HttpDelete]
        public object Delete(string id)
        {
            var org = _factory.CreateOrgDao().Get(id);
            _factory.CreateOrgDao().Delete(org);
            return new
            {
                Success = true
            };
        }
    }
}