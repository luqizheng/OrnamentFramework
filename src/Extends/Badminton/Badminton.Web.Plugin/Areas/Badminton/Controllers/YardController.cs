using System.Web.Mvc;
using Badminton.Dao;
using Badminton.Web.Plugin.Areas.Badminton.Models;
using Qi.Web.Mvc;

namespace Badminton.Web.Plugin.Areas.Badminton.Controllers
{
    public class YardController : Controller
    {
        //
        // GET: /Badminton/Yard/

        private readonly IBadmintonDaoFactory _daoFactory;

        public YardController(IBadmintonDaoFactory daoFactory)
        {
            _daoFactory = daoFactory;
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost, Session]
        public ActionResult Create(GymnasiumViewModel model)
        {
            if (ModelState.IsValid)
            {
                _daoFactory.YardDao().SaveOrUpdate(model.Yard);
            }
            return View();
        }


        public ActionResult Create(int? gymasiumId)
        {
            return View();
        }
    }
}