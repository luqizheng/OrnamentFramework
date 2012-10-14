// --------------------------------------------------------------------------------------------------------------------- 
// <copyright file="UserOperator.cs" company="">
//   
// </copyright>
// <summary>
//   Defines the UserOperator type.
// </summary>
// ---------------------------------------------------------------------------------------------------------------------

using System;

namespace Ornament.MVCWebFrame.Models.Membership
{
    [Flags]
    public enum UserGroupOperator
    {
        None = 0,

        /// <summary>
        /// </summary>
        Read = 1,

        Assign = 2 | Read,

        Modify = 4 | Assign,

        Delete = 8 | Modify
    }
    /// <summary>
    /// </summary>
    [Flags]
    public enum UserOperator
    {
        None = 0,

        /// <summary>
        /// </summary>
        Read = 1,

        

        /// <summary>
        /// </summary>
        Lock = 2 | UserOperator.Read,

        /// <summary>
        /// 
        /// </summary>
        Approve = 4 | UserOperator.Read,

        /// <summary>
        /// 
        /// </summary>
        SetPassword = 8 | UserOperator.Lock | UserOperator.Approve,

        /// <summary>
        /// 
        /// </summary>
        ReadPrivat = 16 | UserOperator.Read,

        /// <summary>
        /// </summary>
        Modify = 32 | UserOperator.SetPassword,

        /// <summary>
        /// 
        /// </summary>
        Delete = 64 | UserOperator.Modify

    }
}