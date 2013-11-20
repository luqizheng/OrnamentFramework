using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.MVCWebFrame.Models;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;
using Ornament.MemberShip.Plugin.Models;
using Ornament.Web;
using Ornament.Web.MemberShips;
using Qi.Web.Mvc;

namespace Ornament.MemberShip.Plugin.Areas.MemberShip.Controllers
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

        [ResourceAuthorize(RoleOperator.Read, ResourceSetting.Role)]
        public ActionResult Index(Pagination pagination)
        {
            IList<Role> result = _roleDao.Find(pagination.PageSize, pagination.CurrentPage);
            ViewData["Nav"] = pagination;
            return View(result);
        }

        [ResourceAuthorize(RoleOperator.Modify, ResourceSetting.Role)]
        public ActionResult Edit(string id)
        {
            return View(_roleDao.Load(id));
        }

        [ResourceAuthorize(RoleOperator.Modify, ResourceSetting.Role)]
        public ActionResult Create()
        {
            return View();
        }

        public ActionResult Delete(string id)
        {
            IList<IPerformer> a = _factory.CreateMemberDao().Find(id);
            ViewData["members"] = a;
            return View(_roleDao.Get(id));
        }

        [HttpDelete]
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

        [HttpPost]
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
        [ResourceAuthorize(RoleOperator.Modify, ResourceSetting.Role)]
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