using System.Collections.Generic;
using Ornament.MemberShip.Relatives;
using Qi.Domain;

namespace Ornament.MemberShip.Dao
{
    public interface IFriendGroupDao : IDao<string, FriendGroup>
    {
        /// <summary>
        ///     获取User 所有的朋友分组的信息。
        /// </summary>
        /// <param name="owner">用户</param>
        /// <returns>所有属于owner的分组</returns>
        /// <exception cref="System.ArgumentNullException">owner 为空</exception>
        IList<FriendGroup> GetGroups(User owner);

        FriendGroup GetByName(string groupName);
    }
}