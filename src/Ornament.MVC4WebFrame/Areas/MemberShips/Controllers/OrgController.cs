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


        //
        // GET: /Orgs/Create. id is parentId

        public ActionResult Create(string id)
        {
            ViewData["ParentOrg"] = id != null ? _factory.CreateOrgDao().Get(id) : null;
            return View("Edit");
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

        //
        // POST: /Orgs/Edit/5
        [HttpPost]
        public ActionResult Edit([ModelBinder(typeof(NHModelBinder))] Org org, string parentId)
        {
            if (parentId == null)
            {
                IList<Org> orgs = _factory.CreateOrgDao().GetRootOrgs();
                ViewData["Orgs"] = orgs;
            }
            else
            {
                ViewData["Orgs"] = org.GetAllChilds();
            }

            if (ModelState.IsValid)
            {
                if (parentId != null)
                {
                    Org parentOrg = _factory.CreateOrgDao().Load(parentId);
                    parentOrg.Add(parentOrg);
                }
                _factory.CreateOrgDao().SaveOrUpdate(org);
            }
            if (parentId != null)
                return RedirectToAction("Index", new { id = parentId });
            else
                return RedirectToAction("Index");
        }
    }
}