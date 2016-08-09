using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace FullWeb.Areas.Membership.Controllers
{
    [Area("Membership")]
    public class RoleController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            throw new System.Exception("");
            return View();
            
        }
    }
}