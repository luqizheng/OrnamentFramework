using System;
using Ornament.MemberShip.Permissions;

namespace Ornament.Web
{
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