using System.Web.Mvc;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Plugin.Models.Memberships;
using Ornament.Web;
using Qi.Web.Mvc;

namespace Ornament.MemberShip.Plugin.Areas.MemberShips.Controllers
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

        public ActionResult Index(Pagination pagination)
        {
            IUserGroupDao dao = _factory.CreateUserGroupDao();
            int total;
            var result = dao.FindAll(pagination.CurrentPage, pagination.PageSize, out total);
            pagination.TotalRows = total;
            ViewData["Nav"] = pagination;
            return View(result);
        }



        //
        // GET: /Usergroups/Details/5
        public ActionResult Details(string id)
        {
            UserGroup ug = _factory.CreateUserGroupDao().Get(id);
            return Json(ug);
        }

        //
        // GET: /Usergroups/Create
        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Usergroups/Create

        [HttpPost]
        public ActionResult Create(UserGroup userGroup)
        {
            if (ModelState.IsValid)
            {
                _factory.CreateUserGroupDao().SaveOrUpdate(userGroup);
                return RedirectToAction("Index");
            }
            return View(userGroup);
        }

        public ActionResult Edit(string id)
        {
            UserGroup ug;
            if (id == null)
                return Redirect("index");
            ug = _factory.CreateUserGroupDao().Get(id);
            return View(new UserGroupModel(ug));
        }


        //
        // POST: /Usergroups/Edit/5

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Edit(UserGroupModel userGroup)
        {
            if (ModelState.IsValid)
            {
                userGroup.Save(_factory.CreateUserGroupDao());
                return RedirectToAction("Index");
            }
            return View(userGroup);
        }


        public ActionResult AssignRole(string id)
        {
            if (id == null)
                return Redirect("index");
            UserGroup ug = _factory.CreateUserGroupDao().Get(id);
            return View(ug);
        }

        [AcceptVerbs(HttpVerbs.Post)]
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

        public ActionResult AssignUser(string id)
        {
            if (id == null)
                return RedirectToAction("index");
            UserGroup ug = _factory.CreateUserGroupDao().Get(id);
            ViewData["Users"] = _factory.CreateUserDao().GetUsers(ug);
            return View(ug);
        }

        [AcceptVerbs(HttpVerbs.Post)]
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