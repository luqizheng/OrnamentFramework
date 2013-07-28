using System.Collections.Generic;
using System.Web.Mvc;
using Badminton;
using Badminton.Dao;
using Ornament.Web;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Badminton.Controllers
{
    [Session]
    public class GymnasiumController : Controller
    {
        private readonly IBadmintonDaoFactory _daoFactory;

        public GymnasiumController(IBadmintonDaoFactory daoFactory)
        {
            _daoFactory = daoFactory;
        }

        //
        // GET: /Badminton/Gymnasium/

        public ActionResult Index(Pagination pagination)
        {
            if (pagination == null && pagination.PageSize != 1)
                pagination = new Pagination(1, 0);
            int total;
            IList<Gymnasium> result = _daoFactory.GymasiumDao()
                                                 .GetGymnasiums(pagination.PageSize, pagination.CurrentPage, out total);
            pagination.TotalRows = total;
            ViewData["nav"] = pagination;

            return View(result);
        }


        public ActionResult Create()
        {
            return View();
        }

        [HttpPost, Session]
        public ActionResult Create(Gymnasium model)
        {
            if (ModelState.IsValid)
            {
                _daoFactory.GymasiumDao().SaveOrUpdate(model);
                return RedirectToAction("Index");
            }
            return View(model);
        }
    }
}