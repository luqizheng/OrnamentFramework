using System;
using System.Collections.Generic;
using Qi;

namespace Ornament.MemberShip
{
    /// <summary>
    /// IMember interfae
    /// </summary>
    public interface IMember
    {
        /// <summary>
        /// Gets or sets the remark
        /// </summary>
        string Remark { get; set; }

        /// <summary>
        /// Gets the number of role belong this member.
        /// </summary>
        int RoleCount { get; }

        /// <summary>
        /// Gets or sets the Name
        /// </summary>
        string Name { get; set; }

        bool AddRole(Role role);
        void ClearRole();
        IEnumerable<Role> GetAllRoles();
        bool InRole(Role role);

        bool RemoveRole(Role role);
        /// <summary>
        /// Find the input roles is mathc one of roles of this member.
        /// </summary>
        /// <param name="roles"></param>
        /// <param name="matchRoleHandler">return true go on the search, return  false, stop search, </param>
        /// <returns></returns>
        bool OneOf(Role[] roles, Func<Role, bool> matchRoleHandler);
    }
}