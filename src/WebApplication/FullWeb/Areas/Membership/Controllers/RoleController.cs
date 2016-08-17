﻿using FullWeb.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Linq.Expressions;
// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace FullWeb.Areas.Membership.Controllers
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

            var roles = from role in _roleManager.Roles select role;
            return View(roles);

        }

        public IActionResult Edit(int id)
        {
            var role = from
                item in _roleManager.Roles
                       where item.Id == id
                       select item;
            return View(role.FirstOrDefault());
        }

        public IActionResult Edit(ApplicationRole role)
        {
            return View()
            ;
        }
    }
}