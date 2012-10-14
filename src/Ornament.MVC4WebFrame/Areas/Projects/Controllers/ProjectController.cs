using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.MVCWebFrame.Areas.Projects.Models;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Web;
using Qi.Web.Mvc;
using QiProject.Dao;
using QiProject.Operators;

namespace Ornament.MVCWebFrame.Areas.Projects.Controllers
{
    public class ProjectController : Controller
    {
        //
        // GET: /Projects/Project/
        private readonly IProjectDaoFactory _dao;
        private readonly IMemberShipFactory _memberShipFactory;

        public ProjectController(IProjectDaoFactory factory, IMemberShipFactory memberShipFactory)
        {
            _dao = factory;
            _memberShipFactory = memberShipFactory;
        }
        [Session]
        public ActionResult Index()
        {
            var result = _dao.ProjectDao.List(OrnamentContext.Current.CurrentUser, DefectOperator.Read);
            return View(result);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id">Product's Id</param>
        /// <returns></returns>
        public ActionResult Create(int id)
        {
            var performers = new List<IPerformer>();

            performers.AddRange(_memberShipFactory.CreateUserDao().GetAll());
            performers.AddRange(_memberShipFactory.CreateUserGroupDao().GetAll());

            ViewData["performers"] = performers;

            var v = new ProjectModel
                {
                    Product = _dao.ProductDao.Get(id)
                };

            return View(v);
        }

        [HttpPost, Session(Transaction = true)]
        public ActionResult Create([ModelBinder(typeof(NHModelBinder))] ProjectModel project)
        {
            if (ModelState.IsValid)
            {
                project.Create(_dao.ProjectDao);
                return RedirectToAction("Index");
            }
            var performers = new List<IPerformer>();

            performers.AddRange(_memberShipFactory.CreateUserDao().GetAll());
            performers.AddRange(_memberShipFactory.CreateUserGroupDao().GetAll());

            ViewData["performers"] = performers;
            return View(project);
        }
    }
}