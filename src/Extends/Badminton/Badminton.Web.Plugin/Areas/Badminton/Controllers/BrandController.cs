using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Badminton.Consumableses;
using Badminton.Dao;
using Qi.Web.Mvc;

namespace Badminton.Web.Plugin.Areas.Badminton.Controllers
{
    [ Session]
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
            IList<Brand> result = _daoFactory.BrandDao().GetAll();
            return View(result);
        }

        public ActionResult Edit(int? id)
        {
            if (id == null)
                throw new HttpException(404, "NotFind");
            Brand brand = _daoFactory.BrandDao().Get(id.Value);
            return View(brand);
        }

        [HttpPost]
        public ActionResult Edit(Brand brand)
        {
            if (ModelState.IsValid)
            {
                _daoFactory.BrandDao().SaveOrUpdate(brand);
                return Redirect("index");
            }
            return View(brand);
        }


        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(Brand brand)
        {
            if (ModelState.IsValid)
            {
                _daoFactory.BrandDao().SaveOrUpdate(brand);
                return RedirectToAction("Index");
            }
            return View(brand);
        }

        [HttpPost]
        public ActionResult Save(Brand brand)
        {
            if (ModelState.IsValid)
            {
                _daoFactory.BrandDao().SaveOrUpdate(brand);
            }
            else
            {
                return Json(new
                    {
                        success = false,
                        message = ModelState.Values.First()
                    });
            }
            return Json(new
                {
                    success = true,
                    brand
                });
        }
    }
}