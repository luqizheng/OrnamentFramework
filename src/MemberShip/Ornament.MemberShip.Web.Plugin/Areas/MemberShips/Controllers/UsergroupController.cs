using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models;
using Ornament.MemberShip.Web.Plugin.Areas.MemberShips.Models;
using Ornament.Web.MemberShips;
using Ornament.Web.UI;
using Qi.Web.Mvc;

namespace Ornament.MemberShip.Web.Plugin.Areas.MemberShips.Controllers
{
    [Session]
    public class UsergroupController : Controller
    {
        private readonly IMemberShipFactory _factory;

        public UsergroupController(IMemberShipFactory factory)
        {
            _factory = factory;
        }

        //
        // GET: /Usergroups/
        [ResourceAuthorize(UserGroupOperator.Read, ResourceSetting.UserGroup)]
        [OrnamentMvcSiteMapNode(Title = "$resources:membership.sitemap,groupListTitle", ParentKey = "MemberShips",
            Key = "Usergroup", Order = 3,
            Resource = ResourceSetting.UserGroup, Operator = UserGroupOperator.Read)]
        public ActionResult Index()
        {
            return View();
        }

        [ResourceAuthorize(UserGroupOperator.Read, ResourceSetting.UserGroup)]
        public ActionResult List(int? index, int? size)
        {
            IUserGroupDao dao = _factory.CreateUserGroupDao();
            int total;
            IList<UserGroup> result = dao.FindAll(index ?? 0, size ?? 30, out total);

            var returnData = from a in result
                select new
                {
                    a.Id,
                    a.Name,
                    a.Remarks,
                    Roles = a.GetAllRoles().Select(s => s.Id)
                };

            return Json(new {data = returnData, totalRecords = total}, JsonRequestBehavior.AllowGet);
        }

        [ResourceAuthorize(UserGroupOperator.Modify, ResourceSetting.UserGroup), ValidateAjax, Session]
        [HttpPost]
        public ActionResult Save(UserGroup userGroup, string[] roles)
        {
            userGroup.Roles.Clear();
            IRoleDao roleDao = _factory.CreateRoleDao();

            foreach (string role in roles ?? new string[0])
            {
                userGroup.Roles.Add(roleDao.Get(role));
            }

            _factory.CreateUserGroupDao().SaveOrUpdate(userGroup);

            return Json(new {success = true, userGroup.Id}); //返回Id.更新View的时候需要Id
        }

        public ActionResult Delete(string id)
        {
            if (String.IsNullOrEmpty(id))
            {
                throw new HttpException(403, "id is not allow empty");
            }

            IUserGroupDao dao = _factory.CreateUserGroupDao();
            UserGroup ug = _factory.CreateUserGroupDao().Get(id);
            dao.Delete(ug);
            return Json(ug, JsonRequestBehavior.AllowGet);
        }

        [ResourceAuthorize(UserGroupOperator.Assign, ResourceSetting.UserGroup)]
        public ActionResult AssignRole(string id)
        {
            if (id == null)
                return Redirect("index");
            UserGroup ug = _factory.CreateUserGroupDao().Get(id);
            return View(ug);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        [ResourceAuthorize(UserGroupOperator.Assign, ResourceSetting.UserGroup)]
        public ActionResult AssignRole(string[] roles, string id)
        {
            IRoleDao roleDao = _factory.CreateRoleDao();
            UserGroup user =
                _factory.CreateUserGroupDao().Get(id);
            user.Roles.Clear();
            foreach (Role role in roleDao.GetRolesByName(roles))
            {
                user.Roles.Add(role);
            }
            return RedirectToAction("Index");
        }

        [ResourceAuthorize(UserGroupOperator.Assign, ResourceSetting.UserGroup)]
        public ActionResult AssignUser(string id)
        {
            if (id == null)
                return RedirectToAction("index");
            UserGroup ug = _factory.CreateUserGroupDao().Get(id);
            ViewData["Users"] = _factory.CreateUserDao().GetUsers(ug);
            return View(ug);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        [ResourceAuthorize(UserGroupOperator.Assign, ResourceSetting.UserGroup)]
        public ActionResult AssignUser(string[] loginIds, string id)
        {
            if (id == null)
                return RedirectToAction("index");

            UserGroup ug = _factory.CreateUserGroupDao().Get(id);
            IUserDao dao = _factory.CreateUserDao();

            foreach (User user in dao.GetUsers(loginIds))
            {
                user.UserGroups.Add(ug);
            }

            return RedirectToAction("index");
        }
    }
}