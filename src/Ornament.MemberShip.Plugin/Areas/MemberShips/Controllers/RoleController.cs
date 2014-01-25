using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;
using Ornament.MemberShip.Plugin.Models;
using Ornament.Web;
using Ornament.Web.MemberShips;
using Ornament.Web.UI.Paginations;
using Qi.Web.Mvc;

namespace Ornament.MemberShip.Plugin.Areas.MemberShips.Controllers
{
    /// <summary>
    /// </summary>
    [Session]
    public class RoleController : Controller
    {
        private readonly IMemberShipFactory _factory;
        private readonly IRoleDao _roleDao;

        public RoleController(IMemberShipFactory factory)
        {
            _roleDao = factory.CreateRoleDao();
            _factory = factory;
        }

        [ResourceAuthorize(RoleOperator.Read, "Role"),
         OrnamentMvcSiteMapNode(Title = "$resources:membership.sitemap,roleListTitle",
             ParentKey = "MemberShips", Key = "Role", Order = 2,
             Resource = "Role", Operator = RoleOperator.Read)]
        public ActionResult Index(Pagination pagination)
        {
            return View();
        }
        [ResourceAuthorize(RoleOperator.Read, "Role")]
        public ActionResult List(Pagination pagination)
        {
            var result = from role in _roleDao.Find(pagination.PageSize, pagination.CurrentPage)
                         select new
                         {
                             role.Id,
                             role.Name,
                             role.Remarks
                         };

            var count = _roleDao.Count();
            return Json(new
            {
                totalRecords = count,
                data = result
            }, JsonRequestBehavior.AllowGet);

        }


        [
            ResourceAuthorize(RoleOperator.Modify, "Role"),
            OrnamentMvcSiteMapNode(Title = "$resources:membership.sitemap,roleEditTitle",
                ParentKey = "Role",
                Resource = "Role", Operator = RoleOperator.Modify)
        ]
        public ActionResult Edit(string id)
        {
            return View(_roleDao.Load(id));
        }

        [ResourceAuthorize(RoleOperator.Modify, "Role"),
         OrnamentMvcSiteMapNode(Title = "$resources:membership.sitemap,roleCreateTitle",
             ParentKey = "Role",
             Resource = "Role", Operator = RoleOperator.Modify)
        ]
        public ActionResult Create()
        {
            return View();
        }

        [ResourceAuthorize(RoleOperator.Delete, "Role")]
        [OrnamentMvcSiteMapNode(Title = "$resources:membership.sitemap,roleDeleteTitle",
            ParentKey = "Role",
            Resource = "Role", Operator = RoleOperator.Modify)
       ]
        public ActionResult Delete(string id)
        {
            IList<IPerformer> a = _factory.CreateMemberDao().Find(id);
            ViewData["members"] = a;
            return View(_roleDao.Get(id));
        }

        [HttpDelete, ResourceAuthorize(RoleOperator.Delete, "Role")]
        public ActionResult Delete(Role role)
        {
            IList<IPerformer> a = _factory.CreateMemberDao().Find(role.Id);
            foreach (IPerformer member in a)
            {
                member.Roles.Remove(role);
            }
            _roleDao.Delete(role);
            return RedirectToAction("Index");
        }

        [HttpPost, ResourceAuthorize(RoleOperator.Modify, "Role"),]
        public ActionResult Create(Role role, string[] permissionIds)
        {
            if (!ModelState.IsValid)
            {
                return View(role);
            }
            _roleDao.SaveOrUpdate(role);
            return RedirectToAction("Index");
        }

        [HttpPost]
        [ResourceAuthorize(RoleOperator.Modify, "Role")]
        public ActionResult Edit(Role role, string[] permissionIds)
        {
            if (!ModelState.IsValid)
            {
                return View(role);
            }

            IPermissionDao permissionDao =
                OrnamentContext.DaoFactory.MemberShipFactory.CreatePermissionDao();
            role.Permissions.Clear();
            foreach (string id in permissionIds)
            {
                role.Permissions.Add(permissionDao.Load(id));
            }
            return RedirectToAction("Index");
        }
    }
}