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
        private readonly IMemberShipDaoFactory _daoFactory;

        public OrgController(IMemberShipDaoFactory daoFactory)
        {
            _daoFactory = daoFactory;
        }

        [HttpGet]
        public object Get(string id)
        {
            IOrgDao dao = _daoFactory.CreateOrgDao();
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
            Org org = model.Save(_daoFactory.CreateOrgDao());
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
            var org = _daoFactory.CreateOrgDao().Get(id);
            _daoFactory.CreateOrgDao().Delete(org);
            return new
            {
                Success = true
            };
        }
    }
}