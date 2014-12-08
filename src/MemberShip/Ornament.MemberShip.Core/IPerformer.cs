using System;
using System.Collections.Generic;
using Ornament.MemberShip.Dao;

namespace Ornament.MemberShip
{
    /// <summary>
    ///     Performer
    /// </summary>
    public interface IPerformer
    {
        /// <summary>
        /// </summary>
        string Id { get; set; }

        /// <summary>
        ///     Get's the name of the Performer
        /// </summary>
        string Name { get; set; }

        /// <summary>
        /// </summary>
        string Remarks { get; set; }

        ISet<Role> Roles { get; set; }

        DateTime? UpdateTime { get; set; }

        /// <summary>
        /// </summary>
        string Type { get; }

        /// <summary>
        ///     Gets all users in this Perforomers.
        /// </summary>
        /// <param name="memberShipDaoFactory"></param>
        /// <returns></returns>
        IList<User> GetUsers(IMemberShipDaoFactory memberShipDaoFactory);
    }
}