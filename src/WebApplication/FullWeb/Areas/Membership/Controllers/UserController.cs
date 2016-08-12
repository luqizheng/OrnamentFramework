using FullWeb.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Linq.Expressions;
using FullWeb.Areas.Membership.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace FullWeb.Areas.Membership.Controllers
{
    [Area("Membership")]

    public class UserController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        // GET: /<controller>/
        public IActionResult Index(int? pageIndex, int? pageSize)
        {

            pageIndex = pageIndex ?? 0;
            pageSize = pageSize ?? 20;

            var result =
                from user in _userManager.Users.Skip(pageIndex.Value * pageSize.Value).Take(pageSize.Value)
                select UserListItem.CreateFrom<ApplicationUser, string, ApplicationRole>(user);
            this.ViewBag.PageIndex = pageIndex;
            this.ViewBag.PageSize = pageSize;
                
                
            return View(result);
        }

        public IActionResult Edit(string id)
        {
            ApplicationUser editUser = (from user in _userManager.Users where user.Id == id select user).FirstOrDefault();
            return View(new UserInfo(editUser));
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userEdit"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Edit(UserInfo userEdit)
        {
            if (this.ModelState.IsValid)
            {

            }
            return View(userEdit);
        }
    }


}