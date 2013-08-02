using System.Collections.Generic;
using Ornament.MemberShip.Relatives;
using Qi.Domain;

namespace Ornament.MemberShip.Dao
{
    public interface IFriendDao:IDao<string,Friend>
    {
        IList<Friend> GetFriends(User owner);
    }
}