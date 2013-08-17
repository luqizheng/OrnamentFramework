using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using Badminton;
using Badminton.Dao;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Badminton.Controllers
{
    [Session, Authorize, HandleError]
    public class MeasurementUnitController : Controller
    {
        private readonly IBadmintonDaoFactory _daoFactory;

        public MeasurementUnitController(IBadmintonDaoFactory daoFactory)
        {
            _daoFactory = daoFactory;
        }

        //
        // GET: /Badminton/MeasurementUnit/

        public ActionResult Index()
        {
            IList<MeasurementUnit> result = _daoFactory.MeasurementUnit().GetAll();
            return View(result);
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Save(MeasurementUnit unit)
        {
            if (this.ModelState.IsValid)
            {
                _daoFactory.MeasurementUnit().SaveOrUpdate(unit);
                return RedirectToAction("Index");
            }
            return View(unit.Id == 0 ? "Create" : "Edit", unit);
        }

        public ActionResult Edit(int? id)
        {
            if (id == null)
                throw new HttpException(404, "Can't find the MeasurementUnit");
            var result = _daoFactory.MeasurementUnit().Get(id.Value);
            return View(result);
        }
    }
}