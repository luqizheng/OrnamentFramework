using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.MVCWebFrame.Models;
using Ornament.MVCWebFrame.Models.Membership;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;
using Ornament.Web;
using Ornament.Web.MemberShips;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.MemberShips.Controllers
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

            var result = _roleDao.Find(pagination.PageSize, pagination.CurrentPage);
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
            var a = _factory.CreateMemberDao().Find(id);
            ViewData["members"] = a;
            return View(_roleDao.Get(id));
        }

        [HttpDelete]
        public ActionResult Delete([ModelBinder(typeof(NHModelBinder))] Role role)
        {
            var a = _factory.CreateMemberDao().Find(role.Id);
            foreach (var member in a)
            {
                member.RemoveRole(role);
            }
            _roleDao.Delete(role);
            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult Create(Role role)
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
        public ActionResult Edit([ModelBinder(typeof(NHModelBinder))] Role role, string[] permissionIds)
        {
            if (!ModelState.IsValid)
            {
                return View(role);
            }

            IPermissionDao permissionDao =
                 OrnamentContext.DaoFactory.MemberShipFactory.CreatePermissionDao();
            role.Permissions.Clear();
            foreach (var id in permissionIds)
            {
                role.Permissions.Add(permissionDao.Load(id));
            }
            return RedirectToAction("Index");
        }
    }
}