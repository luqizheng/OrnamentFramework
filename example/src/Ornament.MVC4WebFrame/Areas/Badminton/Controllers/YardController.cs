using System.Web.Mvc;
using Badminton.Dao;
using Ornament.MVCWebFrame.Areas.Badminton.Models;
using Qi.Web.Mvc;

namespace Ornament.MVCWebFrame.Areas.Badminton.Controllers
{
    public class YardController : Controller
    {
        //
        // GET: /Badminton/Yard/

        private readonly IBadmintonDaoFactory _daoFactory;

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