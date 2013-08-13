using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Badminton.Consumableses;
using Badminton.Dao;

namespace Ornament.MVCWebFrame.Areas.Badminton.Controllers
{
    [Authorize]
    public class BrandController : Controller
    {
        private readonly IBadmintonDaoFactory _daoFactory;

        public BrandController(IBadmintonDaoFactory daoFactory)
        {
            _daoFactory = daoFactory;
        }

        //
        // GET: /Badminton/Brand/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Edit(int? id)
        {
            if (id == null)
                throw new HttpException(404, "NotFind");
            var brand = _daoFactory.BrandDao().Get(id.Value);
            return View(brand);
        }

        [HttpPost]
        public ActionResult Edit(Brand brand)
        {
            if (this.ModelState.IsValid)
            {
                _daoFactory.BrandDao().SaveOrUpdate(brand);
                return Redirect("index");
            }
            return View(brand);
        }

        [HttpPost]
        public ActionResult Save(Brand brand)
        {
            if (this.ModelState.IsValid)
            {
                _daoFactory.BrandDao().SaveOrUpdate(brand);
                return Redirect("index");
            }
            return View(brand);
        }

        [HttpPost]
        public ActionResult Create()
        {
            return View();
        }
    }
}
