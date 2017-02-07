using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication.Areas.Membership.Controllers
{
    [Route("api/[controller]")]
    public class RolesController : Controller
    {
        private readonly RoleManager<ApplicationRole> _roleManager;


        public RolesController(RoleManager<ApplicationRole> roleManager)
        {
            _roleManager = roleManager;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<ApplicationRole> List(int? pageIndex, int? pageSize)
        {
            pageSize = pageSize ?? 30;
            if (pageSize < 0 || pageSize > 300)
                pageSize = 30;
            var roles = (from role in _roleManager.Roles select role)
                .Take(pageSize.Value).Skip((pageIndex ?? 0) * pageSize.Value);
            return roles;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ApplicationRole Get(int id)
        {
            var role = from
                item in _roleManager.Roles
                where item.Id == id
                select item;
            return role.FirstOrDefault();
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] ApplicationRole value)
        {
            var dbRole = value.Id != 0 ? Get(value.Id) : new ApplicationRole();
            dbRole.Name = value.Name;
            //dbRole.Remark = value.Remark;
            if (value.Id == 0)
                _roleManager.CreateAsync(dbRole).Wait();
            else
                _roleManager.UpdateAsync(dbRole).Wait();
        }

        //// PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var dbRole = Get(id);
            _roleManager.DeleteAsync(dbRole).Wait();
        }
    }
}