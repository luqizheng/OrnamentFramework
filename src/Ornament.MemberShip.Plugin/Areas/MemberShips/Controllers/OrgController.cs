using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Areas.MemberShips.Models;
using Ornament.MemberShip.Plugin.Models;
using Ornament.MemberShip.Plugin.Models.Memberships;
using Ornament.Web.MemberShips;
using Qi.Web.Mvc;

namespace Ornament.MemberShip.Plugin.Areas.MemberShips.Controllers
{
    [Session]
    public class OrgController : Controller
    {
        private readonly IMemberShipFactory _factory;

        public OrgController(IMemberShipFactory factory)
        {
            _factory = factory;
        }

        //
        // GET: /Orgs/
        [OrnamentMvcSiteMapNode(Title = "$resources:membership.sitemap,orgListTitle",
            ParentKey = "MemberShips", Key = "Org", Order = 4,
            DynamicNodeProvider = "Ornament.MemberShip.Plugin.Models.SiteMapNodes.OrgNodeProvider,Ornament.MemberShip.Plugin",
            Resource = "Org", Operator = OrgOperator.Read), ResourceAuthorize(OrgOperator.Read, "Org")]
        public ActionResult Index(string id)
        {
            if (id == null)
            {
                IList<Org> orgs = _factory.CreateOrgDao().GetRootOrgs();
                ViewData["Orgs"] = orgs;
                return View((Org)null);
            }
            Org org = _factory.CreateOrgDao().Get(id);
            ViewData["Orgs"] = org.Childs;
            return View(org);
        }


        [ResourceAuthorize(OrgOperator.Modify, "Org")]
        [OrnamentMvcSiteMapNode(DynamicNodeProvider = "Ornament.MemberShip.Plugin.Models.SiteMapNodes.OrgNodeProvider,Ornament.MemberShip.Plugin",
            Title = "$resources:membership.sitemap,orgEditTitle"
            , ParentKey = "Org")]
        public ActionResult Details(string id)
        {
            IOrgDao orgDao = _factory.CreateOrgDao();
            Org org = orgDao.Get(id);
            var users = _factory.CreateUserDao().GetUsers(org);
            ViewData["ParentOrg"] = org.Parent;
            return View(new OrgDetailsModel(org, users));
        }

        [ResourceAuthorize(OrgOperator.Modify, "Org")]
        [OrnamentMvcSiteMapNode(
            Title = "$resources:membership.sitemap,orgEditTitle"
            , ParentKey = "Org")]
        public ActionResult Edit(string id)
        {
            IOrgDao orgDao = _factory.CreateOrgDao();
            Org org = orgDao.Get(id);
            ViewData["ParentOrg"] = org.Parent;
            return View(new OrgModel(org));
        }

        //
        // GET: /Orgs/Create. id is parentId
        [ResourceAuthorize(OrgOperator.Modify, "Org")]
        [OrnamentMvcSiteMapNode(Title = "$resources:membership.sitemap,orgCreateTitle", ParentKey = "Org",
            Operator = OrgOperator.Modify, Resource = "Org")]
        public ActionResult Create(string parentId)
        {
            var a = new OrgModel();
            if (parentId != null)
            {
                a.Parent = _factory.CreateOrgDao().Get(parentId);
            }

            return View(a);
        }

        //
        // POST: /Orgs/Create

        [AcceptVerbs(HttpVerbs.Post)]
        [ResourceAuthorize(OrgOperator.Modify, "Org")]
        public ActionResult Save(OrgModel org)
        {
            if (ModelState.IsValid)
            {
                IOrgDao orgDao = _factory.CreateOrgDao();
                org.Save(orgDao);
                if (org.Parent == null)
                {
                    return RedirectToAction("Index");
                }
                return RedirectToAction("Index", new { id = org.Parent.Id });
            }

            return View(String.IsNullOrEmpty(org.Id) ? "Create" : "Edit", org);
        }
    }
}