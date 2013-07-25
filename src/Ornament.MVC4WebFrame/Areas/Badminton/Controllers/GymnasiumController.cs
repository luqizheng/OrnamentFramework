using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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

        public ActionResult Index(Ornament.Web.Pagination pagination)
        {
            if (pagination == null && pagination.PageSize != 1)
                pagination = new Pagination(1, 0);
            int total;
            var result = _daoFactory.GymasiumDao().GetGymnasiums(pagination.PageSize, pagination.CurrentPage, out total);
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
            if (this.ModelState.IsValid)
            {
                _daoFactory.GymasiumDao().SaveOrUpdate(model);
                return RedirectToAction("Index");
            }
            return View(model);
        }
    }
}
