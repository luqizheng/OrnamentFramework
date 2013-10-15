using System.Web.Mvc;
using Ornament.Web.Plugins.Datables;
using Qi.CRM.Dao;

namespace Ornament.MVCWebFrame.Areas.CRM.Controllers
{
    [Authorize]
    public class CompanyController : Controller
    {
        private readonly ICrmDaoFactory _crmDaoFactory;

        public CompanyController(ICrmDaoFactory crmDaoFactory)
        {
            _crmDaoFactory = crmDaoFactory;
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Companies()
        {
            var d = new DataTableResult();
            foreach (var data in _crmDaoFactory.CompanyDao().GetAll())

                d.Datas.Add(data);
            return Json(d);
        }
    }
}