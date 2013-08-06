using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using FluentNHibernate.Mapping;
using Ornament.MemberShip.Dao;
using Ornament.Web;
using Qi.Web.Http;

namespace Ornament.MVCWebFrame.Api.Core
{
    [ApiSession]
    public class FriendsController : ApiController
    {
        private readonly IMemberShipFactory _dao;

        public FriendsController(IMemberShipFactory dao)
        {
            _dao = dao;
        }

        // GET api/friends
        public IEnumerable<object> Get()
        {


            return from friend in
                       _dao.CreateFriendDao().GetFriends(OrnamentContext.MemberShip.CurrentUser())
                   select new
                       {
                           Id = friend.Relative.Id,
                           Name = friend.Relative.Name,
                           Memo = friend.Memo,
                           Group = friend.Group
                       };
        }

        // GET api/friends/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/friends
        public void Post([FromBody] string value)
        {
        }

        // PUT api/friends/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/friends/5
        public void Delete(int id)
        {
        }
    }
}