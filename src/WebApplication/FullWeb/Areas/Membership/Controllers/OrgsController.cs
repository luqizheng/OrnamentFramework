using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ornament.Identity.Enterprise.Stores;
using Ornament.Identity.Enterprise;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace FullWeb.Areas.Membership.Controllers
{
    [Route("api/[controller]")]
    public class OrgsController : Controller
    {
        IOrgStore _store;
        public OrgsController(IOrgStore store)
        {
            _store = store;
        }
        // GET: api/values
        [HttpGet]
        public IEnumerable<Org> Get(int? parentId)
        {
            var parentorg = parentId != null ? _store.Get(parentId.Value) : null;
            return _store.GetOrgs(parentorg);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Org Get(int id)
        {
            return _store.Get(id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Ornament.Identity.Enterprise.Org value)
        {
            _store.Merge(value);

        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _store.Delete(_store.Get(id));
        }
    }
}
