using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication.Areas.Membership.Controllers
{
    [Area("Membership")]
    public class OrgController: Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        
    }
}
