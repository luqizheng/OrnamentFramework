using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models;
using Ornament.MemberShip.Web.Plugin.Areas.MemberShips.Models;
using Ornament.MemberShip.Web.Plugin.Models.Memberships;
using Ornament.Web.MemberShips;
using Qi.Web.Mvc;

namespace Ornament.MemberShip.Web.Plugin.Areas.MemberShips.Controllers
{
    [Session]
    public class OrgController : Controller
    {
        private readonly IMemberShipDaoFactory _daoFactory;

        public OrgController(IMemberShipDaoFactory daoFactory)
        {
            _daoFactory = daoFactory;
        }

        //
        // GET: /Orgs/
        [OrnamentMvcSiteMapNode(Title = "$resources:membership.sitemap,orgListTitle",
            ParentKey = "MemberShips", Key = "Org", Order = 2, PreservedRouteParameters = "id",
            Resource = "Org", Operator = OrgOperator.Read), ResourceAuthorize(OrgOperator.Read, "Org")]
        public ActionResult Index(string id)
        {
            if (id == null)
            {
                User user = OrnamentContext.MemberShip.CurrentUser();
                bool isOrgUser = user.LoginId != MemberShip.User.AdminLoginId && user.Org != null;
                IEnumerable<Org> orgs = isOrgUser
                    ? _daoFactory.CreateOrgDao().GetSubOrgs(OrnamentContext.MemberShip.CurrentUser().Org)
                    : _daoFactory.CreateOrgDao().GetRootOrgs();
                ViewData["Orgs"] = orgs;
                if (isOrgUser)
                {
                    return View(user.Org);
                }

                return View((Org) null);
            }
            Org org = _daoFactory.CreateOrgDao().Get(id);
            ViewData["Orgs"] = org.Childs;
            return View(org);
        }


        [ResourceAuthorize(OrgOperator.Modify, "Org")]
        [OrnamentMvcSiteMapNode(DynamicNodeProvider =
            "Ornament.MemberShip.Web.Plugin.Models.SiteMapNodes.OrgNodeProvider,Ornament.MemberShip.Web.Plugin",
            Title = "$resources:membership.sitemap,orgEditTitle"
            , ParentKey = "Org")]
        public ActionResult Details(string id)
        {
            IOrgDao orgDao = _daoFactory.CreateOrgDao();
            Org org = orgDao.Get(id);
            IList<User> users = _daoFactory.CreateUserDao().GetUsers(org);
            ViewData["ParentOrg"] = org.Parent;
            return View(new OrgDetailsModel(org, users));
        }

        [ResourceAuthorize(OrgOperator.Modify, "Org")]
        [OrnamentMvcSiteMapNode(
            Title = "$resources:membership.sitemap,orgEditTitle"
            , ParentKey = "Org")]
        public ActionResult Edit(string id)
        {
            IOrgDao orgDao = _daoFactory.CreateOrgDao();
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
                a.Parent = _daoFactory.CreateOrgDao().Get(parentId);
            }
            return View(a);
        }

        [ResourceAuthorize(OrgOperator.Delete, "Org")]
        public ActionResult DeleteDetails(string id)
        {
            IOrgDao orgDao = _daoFactory.CreateOrgDao();
            Org org = orgDao.Get(id);
            return View(org);
        }

        [ResourceAuthorize(OrgOperator.Delete, "Org")]
        [HttpPost]
        public ActionResult Delete(string id, string parentId)
        {
            IOrgDao orgDao = _daoFactory.CreateOrgDao();
            Org org = orgDao.Get(id);
            orgDao.Delete(org);
            return RedirectToAction("Index", new {id = parentId});
        }

        //
        // POST: /Orgs/Create

        [AcceptVerbs(HttpVerbs.Post)]
        [ResourceAuthorize(OrgOperator.Modify, "Org")]
        public ActionResult Save(OrgModel org)
        {
            if (ModelState.IsValid)
            {
                IOrgDao orgDao = _daoFactory.CreateOrgDao();
                org.Save(orgDao);
                if (org.Parent == null)
                {
                    return RedirectToAction("Index");
                }
                return RedirectToAction("Index", new {id = org.Parent.Id});
            }

            return View(String.IsNullOrEmpty(org.Id) ? "Create" : "Edit", org);
        }
    }
}