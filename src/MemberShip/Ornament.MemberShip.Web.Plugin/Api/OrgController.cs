using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using Ornament.MemberShip.Dao.NHibernateImple;
using Ornament.MemberShip.Plugin.Models.Memberships;
using Ornament.MemberShip.Web.Plugin.Models.Memberships;
using Qi.Web.Http;
using Qi.Web.Mvc;

namespace Ornament.MemberShip.Web.Plugin.Api
{
    public class OrgController : ApiController
    {
        private readonly MemberShipFactory _factory;

        public OrgController(MemberShipFactory factory)
        {
            _factory = factory;
        }

        [System.Web.Http.HttpGet]
        [ApiSession]
        public object Get(string id)
        {
            var dao = _factory.CreateOrgDao();
            var org = dao.Get(id);
            if (org.Parent == null)
            {
                var restlt = new
                {
                    org.Name,
                    org.Id,
                    org.Remarks,

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
                        Name = org.Name,
                        Id = org.Id
                    }
                };
                return restlt;
            }
        }
        [ApiSession]
        [System.Web.Http.HttpPost]
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
