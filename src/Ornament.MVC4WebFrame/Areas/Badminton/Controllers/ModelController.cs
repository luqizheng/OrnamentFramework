using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Badminton.Dao;
using Badminton.Dao.NhImpl;
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

        public ActionResult Index()
        {
            var list = _daoFactory.ModelDao().GetAll();
            return View(list);
        }

    }
}
