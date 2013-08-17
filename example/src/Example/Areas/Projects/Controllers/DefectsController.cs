using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Ornament.Web;
using Qi.Web.Mvc;
using QiProject;
using QiProject.Dao;
using QiProject.Defects;
using QiProject.Operators;

namespace Ornament.MVCWebFrame.Areas.Projects.Controllers
{
    [Session]
    public class DefectsController : Controller
    {
        private readonly IProjectDaoFactory _projectDaoFactory;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="projectDaoFactory"></param>
        public DefectsController(IProjectDaoFactory projectDaoFactory)
        {
            if (projectDaoFactory == null)
                throw new ArgumentNullException("projectDaoFactory");
            _projectDaoFactory = projectDaoFactory;
        }

        //
        // GET: /Projects/Defects/

        public ActionResult Index(int? projectId, DefectStatus[] defectStatuses)
        {
            if (projectId == null)
            {
                return View(new List<Defect>());
            }
            Project project = _projectDaoFactory.ProjectDao.Get(projectId.Value);
            IList<Defect> defect = _projectDaoFactory.DefectDao.GetDefects(project,
                                                                           Enum.GetValues(typeof(DefectStatus)).Cast
                                                                               <DefectStatus>().ToArray());
            return View(defect);
        }

        public ActionResult Create(int? projectId)
        {
            var projectDao = _projectDaoFactory.ProjectDao;
            Project project = null;
            if (projectId != null)
                project = projectDao.Get(projectId.Value);
            ViewData["Project"] = project;
            ViewData["Projects"] = from p in projectDao.List(OrnamentContext.Current.CurrentUser, DefectOperator.CreateDefect)
                                   select p;

            return View(new Defect());
        }
    }
}