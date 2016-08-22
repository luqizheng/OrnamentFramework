using System.Linq;
using FullWeb.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FullWeb.Areas.Membership.Controllers
{
    [Area("Notify")]
    public class TemplateController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Edit()
        {
            return View();
        }
    }
}