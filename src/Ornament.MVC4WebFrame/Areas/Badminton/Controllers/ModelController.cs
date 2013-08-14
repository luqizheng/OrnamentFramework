using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Badminton.Consumableses;
using Badminton.Dao;
using Badminton.Dao.NhImpl;
using Ornament.Web;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Badminton.Controllers
{
    [Session]
    public class ModelController : Controller
    {
        private readonly IBadmintonDaoFactory _daoFactory;

        public ModelController(IBadmintonDaoFactory daoFactory)
        {
            _daoFactory = daoFactory;
        }

        //
        // GET: /Badminton/Model/

        public ActionResult Index(Pagination page)
        {
            var list = _daoFactory.ModelDao().GetAll();
            page.TotalRows = list.Count;
            ViewData["nav"] = page;
            return View(list);
        }

        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Save(Model model)
        {
            if (this.ModelState.IsValid)
            {
                _daoFactory.ModelDao().SaveOrUpdate(model);
                return Redirect("index");
            }
            return View(model.Id == 0 ? "Create" : "Edit", model);

        }

    }
}
