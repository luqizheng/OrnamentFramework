﻿using System.Collections.Generic;
using System.Web.Http;
using Ornament.MemberShip.Dao;
using Ornament.MemberShip.Relatives;
using Qi.Web.Http;

namespace Ornament.MemberShip.Web.Plugin.Api
{
    [ApiSession]
    public class FriendsController : ApiController
    {
        private readonly IMemberShipDaoFactory _dao;

        public FriendsController(IMemberShipDaoFactory dao)
        {
            _dao = dao;
        }

        // GET api/friends
        public IEnumerable<object> Get()
        {
            var result = new List<object>();
            foreach (
                FriendGroup friendGroup in
                    _dao.CreateFriendGroupDao().GetGroups(OrnamentContext.MemberShip.CurrentUser()))
            {
                var item = new
                {
                    friendGroup.Id,
                    friendGroup.Name,
                    Friends = new List<object>()
                };
                foreach (Friend friend in friendGroup.Friends)
                {
                    item.Friends.Add(new
                    {
                        friend.User.Id,
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
            FriendGroup friendGroup = _dao.CreateFriendGroupDao().GetByName(@group);
            User user = _dao.CreateUserDao().Get(userId);
            if (friendGroup == null)
                friendGroup = new FriendGroup
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