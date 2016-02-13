
using System;

namespace Ornament.Identity
{
    public interface IPermission<TRole, TID> where TRole : IdentityRole<TID>
    {
        string Name { get; set; }
        TRole Role { get; set; }
        object Resource { get; set; }
        int Operator { get; set; }
    }

    public class Permission<TRole, TRoleID, TResource, TOperator> : IPermission<TRole, TRoleID>
        where TRole : IdentityRole<TRoleID>
    {
        public TResource Resource { get; set; }
        public TOperator Operator { get; set; }
        public string Name { get; set; }


        public TRole Role { get; set; }

        object IPermission<TRole, TRoleID>.Resource
        {
            get { return Resource; }
            set { Resource = (TResource) value; }
        }

        int IPermission<TRole, TRoleID>.Operator
        {
            get { return  Convert.ToInt32(Operator); }
            set { Operator = (TOperator) Enum.ToObject(typeof (TOperator), value); }
        }
    }

    public class PermissionStore
    {
    }
}