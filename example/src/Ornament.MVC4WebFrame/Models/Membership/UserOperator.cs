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
        Lock = 2 | Read,

        /// <summary>
        /// </summary>
        Approve = 4 | Read,

        /// <summary>
        /// </summary>
        SetPassword = 8 | Lock | Approve,

        /// <summary>
        /// </summary>
        ReadPrivat = 16 | Read,

        /// <summary>
        /// </summary>
        Modify = 32 | SetPassword,

        /// <summary>
        /// </summary>
        Delete = 64 | Modify
    }
}