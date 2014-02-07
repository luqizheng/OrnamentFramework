using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Profile;
using System.Web.Security;
using Ornament.Contexts;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.MemberShipProviders;
using Ornament.MemberShip.Permissions;
using Ornament.MemberShip.Plugin.Areas.MemberShips.Models;
using Ornament.MemberShip.Plugin.Models;
using Ornament.MemberShip.Plugin.Models.Memberships;
using Ornament.Web;
using Ornament.Web.MemberShips;
using Ornament.Web.UI.Paginations;
using Qi.Web.Mvc;

namespace Ornament.MemberShip.Plugin.Areas.MemberShips.Controllers
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

        [HttpGet]
        public JsonResult NotDuplicate(string loginId, string id)
        {
            loginId = Request.QueryString[0];
            return Json(_memberShipFactory.CreateUserDao().Count(loginId, id) == 0, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
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
        public ActionResult Index()
        {
            

            var pagination = new Pagination();
            IList<User> result = _userDao.FindAll(pagination.CurrentPage, pagination.PageSize);
            pagination.TotalRows = _userDao.Count();
            ViewData["Nav"] = pagination;
            ViewData["UserStatus"] = new UsersStatusModel(_memberShipFactory);
            return View(result);
        }

        [ResourceAuthorize(UserOperator.Read, "User"), HttpGet]
        public ActionResult List(int? page, string search, int? size)
        {
            if (size == null)
                size = 40;
            if (size != null && size > 100)
                size = 100;
            if (page == null)
                page = 0;

            int total;
            IList<User> userResult;
            if (!string.IsNullOrEmpty(search))
            {
                search = search + "%";
                userResult = _userDao.QuickSearchOffset(search, search, search, search, page.Value * size.Value,
                    size.Value, out total);
            }
            else
            {
                userResult = _userDao.FindAllOffset(page.Value * size.Value, size.Value, out total);
            }
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
                    user.IsLockout,
                    user.IsApproved,
                    LastActivityDate =
                        user.Other.LastActivityDate != null
                            ? user.Other.LastActivityDate.Value.ToString("yyyy-MM-dd HH:mm:ss")
                            : "",
                });
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        /*[ResourceAuthorize(UserOperator.Read, "User"), HttpGet]

        public ActionResult Users([ModelBinder(typeof(PostDataModelBinder))] DataTablesPostData postData)
        {
            var result = new DataTableResult { iTotalDisplayRecords = postData.DisplayLength };

            string search = postData.SearchContent;
            int total;
            IList<User> userResult;
            if (!string.IsNullOrEmpty(search))
            {
                search = search + "%";
                userResult = _userDao.QuickSearchOffset(search, search, search, search, postData.DisplayStart,
                    postData.DisplayLength, out total);
            }
            else
            {
                userResult = _userDao.FindAllOffset(postData.DisplayStart, postData.DisplayLength, out total);
            }

            foreach (User user in userResult)
            {
                result.aaData.Add(new
                {
                    user.Id,
                    user.Name,
                    user.LoginId,
                    user.Contact.Email,
                    user.IsLockout,
                    user.IsApproved,
                    LastActivityDate =
                        user.Other.LastActivityDate != null
                            ? user.Other.LastActivityDate.Value.ToString("yyyy-MM-dd HH:mm:ss")
                            : "",
                });
            }


            result.iTotalRecords = total;

            return Json(result, JsonRequestBehavior.AllowGet);
        }*/


        [ResourceAuthorize(UserOperator.Modify, "User")]
        [OrnamentMvcSiteMapNode(Title = "$resources:membership.sitemap,userEditTitle", ParentKey = ResourceSetting.User,
            Resource = ResourceSetting.User, Operator = UserOperator.Modify)]
        public ActionResult Edit(string loginId)
        {
            User user = _memberShipFactory.CreateUserDao().GetByLoginId(loginId);
            if (user == null)
                throw new MemberShipException("Not found user.");
            return View(new EditUserModel(user));
        }

        [AcceptVerbs(HttpVerbs.Post), ResourceAuthorize(UserOperator.Modify, "User")]
        public ActionResult Edit(EditUserModel user, FormCollection collection)
        {
            if (ModelState.IsValid)
            {
                User actualUser = user.Save(_memberShipFactory);
                if (ProfileManager.Enabled)
                {
                    ProfileBase profile = ProfileBase.Create(actualUser.LoginId, true);

                    IEnumerator properites = ProfileBase.Properties.GetEnumerator();
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
                }
                return RedirectToAction("Index");
            }
            return View(user);
        }


        public ActionResult Assign(string loginId)
        {
            User user = _memberShipFactory.CreateUserDao().GetByLoginId(loginId);
            if (user == null)
            {
                throw new HttpException(404, "Cant' find the user with loginid is " + loginId);
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
            user.Roles.Clear();
            foreach (Role role in roleDao.GetRolesByIds(roles))
            {
                user.Roles.Add(role);
            }
            user.UserGroups.Clear();
            foreach (UserGroup ug in userGroupDao.GetUserGroups(userGroups))
            {
                user.UserGroups.Add(ug);
            }
            _memberShipFactory.CreateUserDao().SaveOrUpdate(user);
            _memberShipFactory.CreateUserDao().Flush();

            return RedirectToAction("Index");
        }

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
            if (ModelState.IsValid)
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

        [ResourceAuthorize(UserOperator.Lock, "MessageReader")]
        public ActionResult Lock(string[] ids)
        {
            IUserDao dao = _memberShipFactory.CreateUserDao();
            foreach (string loginid in ids)
            {
                User user = dao.Get(loginid);
                user.IsLockout = true;
            }
            return Json(new { success = true });
        }

        [ResourceAuthorize(UserOperator.Lock, "MessageReader")]
        public ActionResult UnLock(string[] ids)
        {
            IUserDao dao = _memberShipFactory.CreateUserDao();
            foreach (string loginid in ids)
            {
                User user = dao.Get(loginid);
                user.IsLockout = false;
            }
            return Json(new { success = true });
        }

        [ResourceAuthorize(UserOperator.Approve, "MessageReader")]
        public ActionResult Approve(string[] ids)
        {
            IUserDao dao = _memberShipFactory.CreateUserDao();
            foreach (string id in ids)
            {
                User user = dao.Get(id);
                user.IsApproved = true;
            }
            return Json(new { success = true });
        }

        [ResourceAuthorize(UserOperator.Approve, "MessageReader")]
        public ActionResult Reject(string[] ids)
        {
            IUserDao dao = _memberShipFactory.CreateUserDao();
            foreach (string id in ids)
            {
                User user = dao.Get(id);
                user.IsApproved = false;
            }
            return Json(new { success = true });
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