using System;
using Ornament.MemberShip.Permissions;

namespace Ornament.Web
{
    /// <summary>
    /// Resource Setting for Web 
    /// </summary>
    public class ResourceDescription
    {
        /// <summary>
        /// Resource Type 
        /// </summary>
        public Type ValueType { get; set; }

        public string Path { get; set; }

        public string Name { get; set; }
    }
}