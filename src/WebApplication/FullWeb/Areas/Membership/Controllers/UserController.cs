﻿using FullWeb.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Linq.Expressions;
using FullWeb.Areas.Membership.Models;
using Microsoft.AspNetCore.Authorization;
using Ornament.Web.Uow;
using Ornament.Web;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace FullWeb.Areas.Membership.Controllers
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
                select UserListItem.CreateFrom<ApplicationUser, string, ApplicationRole>(user);
            this.ViewBag.PageIndex = pageIndex;
            this.ViewBag.PageSize = pageSize;


            return View(result);
        }

        public IActionResult Edit(string id)
        {
            ApplicationUser editUser = (from user in _userManager.Users where user.Id == id select user).FirstOrDefault();
            return View(editUser);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userEdit"></param>
        /// <returns></returns>
        [HttpPost, UnitOfWork]
        public IActionResult Edit(ApplicationUser userEdit)
        {
            var isAjax = this.Request.IsAjaxRequest();
            var isSuccess = false;
            if (this.ModelState.IsValid)
            {
                ApplicationUser userEntity = (from user in _userManager.Users where user.Id.Equals(userEdit.Id) select user).FirstOrDefault();


                userEntity.LoginId = userEdit.LoginId;
                userEntity.Name = userEdit.Name;
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
            else
            {

                return Json(this.ModelState.ToJsonResult(isSuccess));
            }
        }
    }


}