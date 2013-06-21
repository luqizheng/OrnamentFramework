using System.Web.Mvc;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Models.Memberships;
using Qi.Web.Mvc;

//using Ornament.Web.Mvc.JQuery.JQGrid;

namespace Ornament.MVCWebFrame.Areas.MemberShips.Controllers
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

        public ActionResult Index(int? pageIndex)
        {
            int page = pageIndex ?? 0;
            IUserGroupDao dao = _factory.CreateUserGroupDao();
            return View(dao.FindAll(page, 30));
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

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Create([ModelBinder(typeof (NHModelBinder))] UserGroup userGroup)
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
        public ActionResult Edit([ModelBinder(typeof (NHModelBinder))] UserGroup userGroup)
        {
            if (ModelState.IsValid)
            {
                _factory.CreateUserGroupDao().SaveOrUpdate(userGroup);
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
            user.ClearRole();
            foreach (Role role in roleDao.GetRolesByName(roles))
            {
                user.AddRole(role);
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
                user.AddToUserGroup(ug);
            }

            return RedirectToAction("index");
        }
    }
}