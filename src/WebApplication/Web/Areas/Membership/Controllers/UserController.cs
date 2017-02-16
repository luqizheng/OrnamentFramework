using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Ornament.Web;
using Ornament.Web.Uow;
using WebApplication.Areas.Membership.Models;
using WebApplication.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication.Areas.Membership.Controllers
{
    [Area("Membership")]
    [Authorize]
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
                select UserListItem.CreateFrom<ApplicationUser, string, IdentityRole>(user);
            ViewBag.PageIndex = pageIndex;
            ViewBag.PageSize = pageSize;


            return View(result);
        }

        public IActionResult Edit(string id)
        {
            var editUser = (from user in _userManager.Users where user.Id == id select user).FirstOrDefault();
            return View(editUser);
        }

        /// <summary>
        /// </summary>
        /// <param name="userEdit"></param>
        /// <returns></returns>
        [HttpPost]
        [UnitOfWork]
        public IActionResult Edit(ApplicationUser userEdit)
        {
            var isAjax = Request.IsAjaxRequest();
            var isSuccess = false;
            if (ModelState.IsValid)
            {
                var userEntity =
                    (from user in _userManager.Users where user.Id.Equals(userEdit.Id) select user).FirstOrDefault();


                userEntity.UserName = userEdit.UserName;
                userEntity.NormalizedUserName = userEdit.NormalizedUserName;
                userEntity.LockoutEnabled = userEdit.LockoutEnabled;
                userEntity.PhoneNumber = userEdit.PhoneNumber;

                userEntity.Email = userEdit.Email;

                userEntity.PhoneNumberConfirmed = userEdit.PhoneNumberConfirmed;
                userEntity.EmailConfirmed = userEdit.EmailConfirmed;

                //userEdit.AccessFailedCount = userEdit.AccessFailedCount;
                //userEdit.LockoutEnd = userEdit.LockoutEnd;

                isSuccess = true;
            }
            if (!isAjax)
            {
                if (isSuccess)
                    return View("index");
                return View(userEdit);
            }
            return Json(ModelState.ToJsonResult(isSuccess));
        }
    }
}