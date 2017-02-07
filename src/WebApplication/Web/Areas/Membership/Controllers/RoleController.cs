using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Ornament.Identity;
using WebApplication.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication.Areas.Membership.Controllers
{
    [Area("Membership")]
    public class RoleController : Controller
    {
        private readonly RoleManager<ApplicationRole> _roleManager;

        public RoleController(RoleManager<ApplicationRole> roleManager)
        {
            _roleManager = roleManager;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Edit(int id)
        {
            var role = from
                item in _roleManager.Roles
                where item.Id == id
                select item;
            return View(role.FirstOrDefault());
        }
    }
}