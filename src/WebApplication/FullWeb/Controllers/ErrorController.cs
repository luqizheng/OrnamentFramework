using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace FullWeb.Controllers
{
    public class ErrorController : Controller
    {
        // GET: /<controller>/
        public IActionResult Status(int? id)
        {
            switch (id)
            {
                case 404:
                case 400:
                    return View("40X", id);
                case 500:
                    return View("500", id);
                default:
                    return View("500", 500);
            }
        }

        public IActionResult Unhandle()
        {
            return View("500");
        }
    }
}
