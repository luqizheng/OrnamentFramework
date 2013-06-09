using System.Collections.Generic;
using Ornament.MemberShip.Dao;

namespace Ornament.MemberShip
{
    /// <summary>
    /// Performer
    /// </summary>
    public interface IPerformer
    {
        string Id { get; set; }

        /// <summary>
        /// Get's the name of the Performer
        /// </summary>
        string Name { get; set; }

        /// <summary>
        /// Gets all users in this Perforomers.
        /// </summary>
        /// <param name="memberShipFactory"></param>
        /// <returns></returns>
        IList<User> GetUsers(IMemberShipFactory memberShipFactory);

        PerformerType Type { get; }
    }

    public enum PerformerType
    {
        User,Role,UserGroup,Org
    }
}