//using System;
//using System.Collections.Generic;
//using Microsoft.AspNetCore.Mvc;
//using Ornament.Identity;
//using Ornament.Identity.Stores;
//using Ornament.Web.Uow;
//using WebApplication.Areas.Membership.Models;

//// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

//namespace WebApplication.Areas.Membership.Controllers
//{
//    [Route("api/[controller]")]
//    public class OrgsController : Controller
//    {
//        private readonly IOrgStore _store;

//        public OrgsController(IOrgStore store)
//        {
//            _store = store;
//        }

//        // GET: api/values
//        [HttpGet]
//        public IEnumerable<Org> Get(int? parentId)
//        {
//            //var parentorg = parentId != null ? _store.Get(parentId.Value) : null;
//            //return _store.GetOrgs(parentorg);
//            return null;
//        }

//        // GET api/values/5
//        [HttpGet("{id}")]
//        public Org Get(int id)
//        {
//            //return _store.Get(id);
//            return null;

//        }

//        // POST api/values
//        [HttpPost, UnitOfWork]
//        public Org Post([FromBody] OrgDto value)
//        {
//            if (value == null)
//                throw new ArgumentNullException(nameof(value));

//            //var org = value.Id != null
//            //    ? _store.Get(value.Id.Value)
//            //    : new Org();

//            //org.Name = value.Name;
//            //org.Remark = value.Remark;

//            //if (value.Parent != null)
//            //    org.Parent = _store.Load(value.Parent.Value);

//            //_store.SaveOrUpdate(org);
//            return null;
//        }

//        // DELETE api/values/5
//        [HttpDelete("{id}")]
//        public void Delete(int id)
//        {
//            //_store.Delete(_store.Get(id));
//        }
//    }
//}