using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Models.Memberships;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.MemberShips.Controllers
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

        public ActionResult Index(string id)
        {
            if (id == null)
            {
                IList<Org> orgs = _factory.CreateOrgDao().GetRootOrgs();
                ViewData["Orgs"] = orgs;
                return View((Org)null);
            }
            Org org = _factory.CreateOrgDao().Get(id);
            ViewData["Orgs"] = org.GetAllChilds();
            return View(org);
        }

        public ActionResult Edit(string id)
        {
            IOrgDao orgDao = _factory.CreateOrgDao();
            Org org = orgDao.Get(id);
            ViewData["ParentOrg"] = org.Parent;
            return View(new OrgModel(org));
        }

        //
        // GET: /Orgs/Create. id is parentId

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
        public ActionResult Save(OrgModel org)
        {
            if (ModelState.IsValid)
            {
                IOrgDao orgDao = _factory.CreateOrgDao();
                org.Save(orgDao);
                return RedirectToAction("Index");
            }
            return View("Edit", org);
        }
    }
}