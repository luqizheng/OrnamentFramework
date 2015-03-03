using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;
using Ornament.MemberShip.Plugin.Models;
using Ornament.MemberShip.Web.Plugin.Areas.MemberShips.Models;
using Ornament.MemberShip.Web.Plugin.Models.Memberships;
using Ornament.Web.MemberShips;
using Ornament.Web.UI;
using Ornament.Web.UI.Paginations;
using Qi.Web.Mvc;

namespace Ornament.MemberShip.Web.Plugin.Areas.MemberShips.Controllers
{
    /// <summary>
    /// </summary>
    [Session]
    public class RoleController : Controller
    {
        private readonly IMemberShipDaoFactory _daoFactory;
        private readonly IRoleDao _roleDao;

        public RoleController(IMemberShipDaoFactory daoFactory)
        {
            _roleDao = daoFactory.CreateRoleDao();
            _daoFactory = daoFactory;
        }

        [HttpGet]
        public JsonResult NotDuplicate(string name, string id)
        {
            name = Request.QueryString[0];
            return Json(_daoFactory.CreateRoleDao().Count(name, id) == 0, JsonRequestBehavior.AllowGet);
        }

        [ResourceAuthorize(RoleOperator.Read, "Role"),
         OrnamentMvcSiteMapNode(Title = "$resources:membership.sitemap,roleListTitle",
             ParentKey = "MemberShips", Key = ResourceSetting.Role, Order = 4,
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
                             role.Remarks,
                             Permissions = role.Permissions.Select(s => s.Id)
                         };

            int count = _roleDao.Count();
            return Json(new
            {
                totalRecords = count,
                data = result
            }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost, ResourceAuthorize(RoleOperator.Delete, "Role"),Session(Transaction = true)]
        public ActionResult Delete(Role role)
        {
            IList<IPerformer> a = _daoFactory.CreateMemberDao().Find(role.Id);
            foreach (IPerformer member in a)
            {
                member.Roles.Remove(role);
            }
            _roleDao.Delete(role);
            if (Request.IsAjaxRequest())
                return Json(new { success = true });
            return RedirectToAction("Index");
        }

        [HttpPost]
        [ResourceAuthorize(RoleOperator.Modify, "Role")]
        [ValidateAjax]
        public ActionResult Save(Role role, string[] permissionIds)
        {
#if DEBUG
            Thread.Sleep(2 * 1000);
#endif


            IPermissionDao permissionDao =
                OrnamentContext.DaoFactory.MemberShipDaoFactory.CreatePermissionDao();
            role.Permissions.Clear();
            foreach (string id in permissionIds??(new string[0]))
            {
                role.Permissions.Add(permissionDao.Load(id));
            }
            _daoFactory.CreateRoleDao().SaveOrUpdate(role);
            return Json(new { success = true, Id = role.Id });
        }
    }
}