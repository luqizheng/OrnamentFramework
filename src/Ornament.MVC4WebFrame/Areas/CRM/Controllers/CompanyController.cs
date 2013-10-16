using System.Web.Mvc;
using Ornament.Web.Plugins.DataTables;
using Qi.CRM;
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

        public ActionResult Companies([ModelBinder(typeof(PostDataModelBinder))]DataTablesPostData postData)
        {
            var d = new DataTableResult();
            foreach (Company data in _crmDaoFactory.CompanyDao().GetAll())
            {
                d.aaData.Add(data);
            }
            return Json(d, JsonRequestBehavior.AllowGet);
        }
    }
}