using System.Web.Mvc;

namespace Qi.CRM.Plugin.Areas.CRM.Controllers
{
    [Authorize]
    public class CompanyController : Controller
    {
        //private readonly ICrmDaoFactory _crmDaoFactory;

        /*public CompanyController(ICrmDaoFactory crmDaoFactory)
        {
            _crmDaoFactory = crmDaoFactory;
        }*/

        public ActionResult Index()
        {
            //return Content("Hello world.");
            return View();
        }
    }
}