using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Ornament.AccountWebApi
{
    [Route("api/[controller]")]
    public class RolesController : Controller
    {
        private readonly RoleManager<IdentityRole> _roleManager;


        public RolesController(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<IdentityRole> List(int? pageIndex, int? pageSize)
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
        public IdentityRole Get(string id)
        {
            var role = from
                item in _roleManager.Roles
                where item.Id == id
                select item;
            return role.FirstOrDefault();
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] IdentityRole value)
        {
            _roleManager.UpdateAsync(value).Wait();
        }

        [HttpPost("{id}")]
        public void Post([FromBody] IdentityRole value, [FromQuery] string id)
        {
            var dbRole = Get(value.Id);
            dbRole.Name = value.Name;
            _roleManager.UpdateAsync(dbRole).Wait();
        }

        //// PUT api/values/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            var dbRole = Get(id);
            _roleManager.DeleteAsync(dbRole).Wait();
        }
    }
}