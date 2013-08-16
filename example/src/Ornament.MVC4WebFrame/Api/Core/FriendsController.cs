using System.Linq;
using System.Collections.Generic;
using System.Web.Http;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Relatives;
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
            var result = new List<object>();
            foreach (var friendGroup in _dao.CreateFriendGroupDao().GetGroups(OrnamentContext.MemberShip.CurrentUser()))
            {
                var item = new
                    {
                        Id = friendGroup.Id,
                        Name = friendGroup.Name,
                        Friends = new List<object>()
                    };
                foreach (var friend in friendGroup.Friends)
                {
                    item.Friends.Add(new
                        {
                            Id = friend.User.Id,
                            Name = friend.Name ?? friend.User.Name,
                            Remarks = friend.Remakrs
                        });
                }

                result.Add(item);
            }
            return result;
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
        public void Put(string userId, [FromBody] string @group)
        {
            var friendGroup = _dao.CreateFriendGroupDao().GetByName(@group);
            var user = _dao.CreateUserDao().Get(userId);
            if (friendGroup == null)
                friendGroup = new FriendGroup()
                    {
                        Name = @group
                    };

            friendGroup.Friends.Add(new Friend(user));
        }

        // DELETE api/friends/5
        public void Delete(int id)
        {
        }
    }
}