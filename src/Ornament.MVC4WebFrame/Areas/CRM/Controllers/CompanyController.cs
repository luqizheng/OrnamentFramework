using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ornament.Web;
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

        //
        // GET: /CRM/Company/
        public ActionResult Index(Pagination pagination,string text)
        {
            return View();
        }

        
    }
}
