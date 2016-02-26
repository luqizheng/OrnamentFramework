
using System;

namespace Ornament.Identity
{
    public class Permission<TRole, TID>
        :Ornament.Domain.Entities.EntityWithTypedId<int>
        where TRole : IdentityRole<TID>
        
    {
        string Name { get; set; }
        TRole Role { get; set; }
        object Resource { get; set; }
        int Operator { get; set; }
    }

    public class PermissionGeneric<TRole, TRoleID, TResource, TOperator> :        
        Permission<TRole, TRoleID>
        where TRole : IdentityRole<TRoleID>
    {
        public TResource Resource { get; set; }
        public TOperator Operator { get; set; }
        public string Name { get; set; }


        public TRole Role { get; set; }

      
    }
}