using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Security;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models;
using Ornament.MemberShip.Plugin.Models.Memberships;
using Ornament.MemberShip.Web.Plugin.Areas.MemberShips.Models;
using Ornament.MemberShip.Web.Plugin.Models.Memberships;
using Ornament.Web.MemberShips;
using Ornament.Web.UI;
using Qi.Web.Mvc;

namespace Ornament.MemberShip.Web.Plugin.Areas.MemberShips.Controllers
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

        #region Validation

        [HttpGet, Session]
        public JsonResult NotDuplicate(string loginId, string id)
        {
            if (loginId == null)
                throw new ArgumentNullException("loginId");
            loginId = Request.QueryString[0];
            return Json(_memberShipFactory.CreateUserDao().Count(loginId, id) == 0, JsonRequestBehavior.AllowGet);
        }

        [HttpGet, Session]
        public JsonResult NotDuplicateEmail(string email, string id)
        {
            if (Membership.Provider.RequiresUniqueEmail)
            {
                return Json(_memberShipFactory.CreateUserDao().CountByEmail(email, id) == 0,
                    JsonRequestBehavior.AllowGet);
            }
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        #endregion

        [ResourceAuthorize(UserOperator.Read, "User")]
        [OrnamentMvcSiteMapNode(Title = "$resources:membership.sitemap,userListTitle",
            ParentKey = "MemberShips", Key = ResourceSetting.User, Order = 1,
            Resource = ResourceSetting.User, Operator = UserOperator.Read)
        ]
        [OutputCache(Duration = 30), Session]
        public ActionResult Index()
        {
            var statisticsDao
                = _memberShipFactory.CreateStatisticsDao();

            IList<UserStatistics> data = statisticsDao.FindByDate(DateTime.Today.AddDays(-7), DateTime.Today);
            ViewData["NewRegistry"] = string.Join(",", from a in data select a.Registers);
            ViewData["TotalUser"] = String.Join(",", _memberShipFactory.CreateUserDao().Count());
            
            ViewData["7DayActive"] = String.Join(",", from a in data select a.Actives);
            ViewData["toDayActive"] = data[data.Count - 1].Actives;


            ViewData["7DayMaxActive"] = String.Join(",", from a in data select a.MaxActives);
            ViewData["todayMax"] = data[data.Count - 1].MaxActives;

            return View();
        }


        [ResourceAuthorize(UserOperator.Read, "User"), HttpGet, Session]
        public ActionResult List(int? page, string search, int? size)
        {
            if (size == null)
                size = 40;

            if (size > 100)
                size = 100;

            if (page == null)
                page = 0;

            int total;

            var userSearch = new UserSearch();
            if (!string.IsNullOrEmpty(search))
            {
                search = search + "%";
                userSearch.Name = search;
                userSearch.Email = search;
                userSearch.Login = search;
                userSearch.Phone = search;
                userSearch.Junction = JunctionType.Or;
            }
            userSearch.Org = OrnamentContext.MemberShip.CurrentUser().Org;

            IList<User> userResult = _userDao.Search(userSearch, page.Value, size.Value, out total);


            var result = new
            {
                data = new ArrayList(),
                TotalRecords = total
            };
            foreach (User user in userResult)
            {
                result.data.Add(new
                {
                    user.Id,
                    user.Name,
                    user.LoginId,
                    user.Contact.Email,
                    user.Security.IsLocked,
                    user.Contact.EmailVerified,
                    Deny = user.IsDeny,
                    LastActivityDate =
                        user.Other.LastActivityDate != null
                            ? user.Other.LastActivityDate.Value.ToString("yyyy-MM-dd HH:mm:ss")
                            : "",
                });
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }


        [ResourceAuthorize(UserOperator.Modify, "User"), Session]
        [OrnamentMvcSiteMapNode(Title = "$resources:membership.sitemap,userEditTitle", ParentKey = ResourceSetting.User,
            Resource = ResourceSetting.User, Operator = UserOperator.Modify, PreservedRouteParameters = "loginId")]
        public ActionResult Edit(string loginId)
        {
            User user = _memberShipFactory.CreateUserDao().GetByLoginId(loginId);
            if (user == null)
                throw new MemberShipException("Not found user.");
            return View(new EditUserModel(user));
        }

        [HttpPost, ResourceAuthorize(UserOperator.Modify, "User"), ValidateAjax, Session(Transaction = true)]
        public ActionResult Save(EditUserModel userBasicInfo)
        {
            if (userBasicInfo == null)
                return null;

            if (ModelState.IsValid)
            {
                userBasicInfo.Save(_memberShipFactory);
                return Json(new
                {
                    success = true
                });
            }
            return Json(userBasicInfo);
        }

        //[HttpPost, ResourceAuthorize(UserOperator.Modify, "User"), ValidateAjax]
        //public ActionResult SavePermission(PermissionInfo permissionInfo)
        //{
        //    if (permissionInfo == null)
        //        throw new HttpException(404, "permission can't be null");
        //    if (this.ModelState.IsValid)
        //    {
        //        return Json(new {success = true});
        //    }
        //    return View();
        //}


        //public ActionResult Assign(string loginId)
        //{
        //    User user = _memberShipFactory.CreateUserDao().GetByLoginId(loginId);
        //    if (user == null)
        //    {
        //        throw new HttpException(404, "Cant' find the user with loginid is " + loginId);
        //    }
        //    var userGroupRoleMap = new Dictionary<string, List<string>>();
        //    var rolePermissionsMap = new Dictionary<string, List<string>>();
        //    foreach (UserGroup ug in _memberShipFactory.CreateUserGroupDao().GetAll())
        //    {
        //        userGroupRoleMap.Add(ug.Id, new List<string>());
        //        foreach (Role role in ug.GetAllRoles())
        //        {
        //            userGroupRoleMap[ug.Id].Add(role.Id);
        //        }
        //    }
        //    foreach (Role role in _memberShipFactory.CreateRoleDao().GetAll())
        //    {
        //        rolePermissionsMap.Add(role.Id, new List<string>());
        //        foreach (Permission permission in role.Permissions)
        //        {
        //            rolePermissionsMap[role.Id].Add(permission.Id);
        //        }
        //    }
        //    ViewData["userGroupRoleMap"] = userGroupRoleMap;
        //    ViewData["rolePermissionMap"] = rolePermissionsMap;


        //    return View(user);
        //}

        //[AcceptVerbs(HttpVerbs.Post)]
        //public ActionResult Assign(string[] roles, string[] userGroups, string loginId)
        //{
        //    IRoleDao roleDao = _memberShipFactory.CreateRoleDao();
        //    IUserGroupDao userGroupDao =
        //        _memberShipFactory.CreateUserGroupDao();
        //    User user = _memberShipFactory.CreateUserDao().GetByLoginId(loginId);
        //    user.Roles.Clear();
        //    foreach (Role role in roleDao.GetRolesByIds(roles))
        //    {
        //        user.Roles.Add(role);
        //    }
        //    user.UserGroups.Clear();
        //    foreach (UserGroup ug in userGroupDao.GetUserGroups(userGroups))
        //    {
        //        user.UserGroups.Add(ug);
        //    }
        //    _memberShipFactory.CreateUserDao().SaveOrUpdate(user);
        //    _memberShipFactory.CreateUserDao().Flush();

        //    return RedirectToAction("Index");
        //}

        [OrnamentMvcSiteMapNode(Title = "$resources:membership.sitemap,userCreateTitle",
            ParentKey = "User",
            Resource = "User", Operator = UserOperator.Modify)
        ]
        [ResourceAuthorize(UserOperator.Modify, "User")]
        public ActionResult Create()
        {
            return View();
        }

        [Session(true, Transaction = true)]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Create(CreateUserModel createUser)
        {
            if (ModelState.IsValid || true)
            {
                string errormessage;
                if (createUser.Create(_memberShipFactory, out errormessage))
                {
                    return RedirectToAction("Index");
                }
                ModelState.AddModelError("BasicInfo.LoginId", errormessage);
            }
            return View(createUser);
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

            user.Security.ChangePassword(privoder.EncodeString(newpassword, privoder.PasswordFormat));

            _memberShipFactory.CreateUserDao().SaveOrUpdate(user);
            return Json(newpassword);
        }

        public ActionResult Search(int? pageIndex, string loginIdOrEmail)
        {
            IQueryable<EditUserModel> result = from u in _userDao.Users.Take(30).Skip((pageIndex ?? 0) * 30)
                                               where
                                                   u.LoginId.Contains(loginIdOrEmail) ||
                                                   u.Contact.Email.Contains(loginIdOrEmail)
                                               select new EditUserModel(u);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}