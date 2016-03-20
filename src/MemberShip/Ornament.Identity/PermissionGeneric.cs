using System;

namespace Ornament.Identity
{
    public class PermissionGeneric<TRole, TRoleId, TResource, TOperator> :
        Permission<TRole, TRoleId>
        where TRole : IdentityRole<TRoleId>
    {
        /// <summary>
        /// </summary>
        public new TResource Resource
        {
            get { return (TResource) base.Resource; }
            set { base.Resource = value; }
        }

        /// <summary>
        /// </summary>
        public new TOperator Operator
        {
            get
            {
                var result = Enum.ToObject(typeof (TOperator), base.Operator);
                return (TOperator) result;
            }
            set { base.Operator = Convert.ToInt32(value); }
        }

     
    }
}