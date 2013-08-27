using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using Badminton.Consumableses;
using Badminton.Dao;
using Castle.MicroKernel.Handlers;
using Ornament.Web;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Badminton.Controllers
{
    [Session, Authorize(Roles = "admin")]
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
            IList<Model> list = _daoFactory.ModelDao().GetAll();
            page.TotalRows = list.Count;
            ViewData["nav"] = page;
            return View(list);
        }

        public ActionResult Create()
        {
            return View();
        }

        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                throw new HttpException(404, "Not found Model ");
            }

            return View(_daoFactory.ModelDao().Get(id.Value));
        }
        [HttpPost]
        public ActionResult Save(Model model)
        {
            if (ModelState.IsValid)
            {
                _daoFactory.ModelDao().SaveOrUpdate(model);
                return Redirect("index");
            }
            return View(model.Id == 0 ? "Create" : "Edit", model);
        }


        public ActionResult Delete(int? id)
        {
            if (id == null)
                throw new HttpException(404, "Not found Model ");
            var model = _daoFactory.ModelDao().Get(id.Value);
            _daoFactory.ModelDao().Delete(model);
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}