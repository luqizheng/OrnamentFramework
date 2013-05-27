﻿using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Profile;
using System.Web.Security;
using Ornament.MVCWebFrame.Models;
using Ornament.MVCWebFrame.Models.Membership;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Permissions;
using Ornament.Models.Memberships;
using Ornament.Web;
using Ornament.Web.MemberShips;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.MemberShips.Controllers
{
    /// <summary>
    /// </summary>
    [Session, HandleError]
    public class UserController : Controller
    {
        private readonly IMemberShipFactory _memberShipFactory;
        private readonly IUserDao _userDao;

        public UserController(IMemberShipFactory memberShipFactory)
        {
            _memberShipFactory = memberShipFactory;
            _userDao = _memberShipFactory.CreateUserDao();
        }

        [ResourceAuthorize(UserOperator.Read, "User")]
        public ActionResult Index(Pagination pagination)
        {
            IList<User> result = _userDao.FindAll(pagination.CurrentPage, pagination.PageSize);
            pagination.SetTotalPage(_userDao.Count());
            ViewData["Nav"] = pagination;
            return View(result);
        }

        [ResourceAuthorize(UserOperator.Modify, "User")]
        public ActionResult Edit(string id)
        {
            User user = _memberShipFactory.CreateUserDao().GetByLoginId(id);
            if (user == null)
                throw new MemberShipException("Not found user.");
            return View(new EditUserModel(user));
        }

        [AcceptVerbs(HttpVerbs.Post), ResourceAuthorize(UserOperator.Modify, "User")]
        public ActionResult Edit(EditUserModel user, FormCollection collection)
        {
            if (ModelState.IsValid)
            {
                var actualUser=user.Save(_memberShipFactory);
                ProfileBase profile = ProfileBase.Create(actualUser.LoginId, true);
                var properites = ProfileBase.Properties.GetEnumerator();
                if (properites != null)
                {
                    while (properites.MoveNext())
                    {
                        var property = properites.Current as SettingsProperty;
                        string v = collection[property.Name];
                        profile[property.Name] = v;
                    }
                    profile.Save();
                }
                return RedirectToAction("Index");
            }
            return View(user);
        }


        public ActionResult Assign(string id)
        {
            User user = _memberShipFactory.CreateUserDao().GetByLoginId(id);
            if (user == null)
            {
                throw new HttpException(404, "Cant' find the user with loginid is " + id);
            }
            var userGroupRoleMap = new Dictionary<string, List<string>>();
            var rolePermissionsMap = new Dictionary<string, List<string>>();
            foreach (UserGroup ug in _memberShipFactory.CreateUserGroupDao().GetAll())
            {
                userGroupRoleMap.Add(ug.Id, new List<string>());
                foreach (Role role in ug.GetAllRoles())
                {
                    userGroupRoleMap[ug.Id].Add(role.Id);
                }
            }
            foreach (Role role in _memberShipFactory.CreateRoleDao().GetAll())
            {
                rolePermissionsMap.Add(role.Id, new List<string>());
                foreach (Permission permission in role.Permissions)
                {
                    rolePermissionsMap[role.Id].Add(permission.Id);
                }
            }
            ViewData["userGroupRoleMap"] = userGroupRoleMap;
            ViewData["rolePermissionMap"] = rolePermissionsMap;


            return View(user);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Assign(string[] roles, string[] userGroups, string loginId)
        {
            IRoleDao roleDao = _memberShipFactory.CreateRoleDao();
            IUserGroupDao userGroupDao =
                _memberShipFactory.CreateUserGroupDao();
            User user = _memberShipFactory.CreateUserDao().GetByLoginId(loginId);
            user.ClearRole();
            foreach (Role role in roleDao.GetRoles(roles))
            {
                user.AddRole(role);
            }
            user.ClearUserGroup();
            foreach (UserGroup ug in userGroupDao.GetUserGroups(userGroups))
            {
                user.AddToUserGroup(ug);
            }
            _memberShipFactory.CreateUserDao().SaveOrUpdate(user);
            _memberShipFactory.CreateUserDao().Flush();

            return RedirectToAction("Index");
        }

        [ResourceAuthorize(UserOperator.Modify, ResourceSetting.User)]
        public ActionResult Create()
        {
            return View();
        }

        [Session(true, Transaction = true)]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Create(CreateUserModel createUser)
        {
            if (ModelState.IsValid)
            {
                string errormessage;
                if (createUser.Create(_memberShipFactory, out errormessage))
                {
                    var user = _memberShipFactory.CreateUserDao().GetByLoginId(createUser.BasicInfo.LoginId);
                    return Json(new
                        {
                            success = true,
                            user = new EditUserModel(user)
                        });
                }
                ModelState.AddModelError("BasicInfo.LoginId", errormessage);
            }
            return Json(new { success = false });
        }


        [ResourceAuthorize(UserOperator.Lock, "MessageReader")]
        public ActionResult Unlock(string[] loginIds)
        {
            IUserDao dao = _memberShipFactory.CreateUserDao();
            foreach (string loginid in loginIds)
            {
                User user = dao.GetByLoginId(loginid);
                user.IsLockout = false;
            }
            return RedirectToAction("Index");
        }

        [ResourceAuthorize(UserOperator.Lock, "MessageReader")]
        public ActionResult Lock(string[] loginIds)
        {
            IUserDao dao = _memberShipFactory.CreateUserDao();
            foreach (string loginid in loginIds)
            {
                User user = dao.GetByLoginId(loginid);
                user.IsLockout = true;
            }
            return RedirectToAction("Index");
        }


        [ResourceAuthorize(UserOperator.Approve, "MessageReader")]
        public ActionResult Approve(string[] loginIds)
        {
            IUserDao dao = _memberShipFactory.CreateUserDao();
            foreach (string loginid in loginIds)
            {
                User user = dao.GetByLoginId(loginid);
                user.IsApproved = true;
            }
            return RedirectToAction("Index");
        }

        [HttpPost, ResourceAuthorize(UserOperator.Delete, "MessageReader")]
        public ActionResult Delete(string[] loginIds)
        {
            IUserDao dao = _memberShipFactory.CreateUserDao();
            foreach (string loginid in loginIds)
            {
                User user = dao.GetByLoginId(loginid);
                dao.Delete(user);
            }
            return RedirectToAction("Index");
        }

        [ResourceAuthorize(UserOperator.SetPassword, "MessageReader")]
        public ActionResult ResetPassword(string loginId)
        {
            var privoder = Membership.Provider as MemberShipProvider;
            User user = _memberShipFactory.CreateUserDao().GetByLoginId(loginId);
            string newpassword = Membership.GeneratePassword(Membership.MinRequiredPasswordLength, 0);

            user.ChangePassword(privoder.EncodeString(newpassword, privoder.PasswordFormat));

            _memberShipFactory.CreateUserDao().SaveOrUpdate(user);
            return Json(newpassword);
        }

        public ActionResult Search(int? pageIndex, string loginIdOrEmail)
        {

            var result = from u in _userDao.Users.Take(30).Skip((pageIndex ?? 0) * 30)
                         where u.LoginId.Contains(loginIdOrEmail) || u.Email.Contains(loginIdOrEmail)
                         select new EditUserModel(u);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}