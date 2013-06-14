using System;

namespace Ornament.MemberShip.Permissions
{
    public class NotFindResourceDefinedException : MemberShipPermissionException
    {
        public NotFindResourceDefinedException(Type operaotrType)
            : base("Can not find the resource with opeartor " + operaotrType.Name)
        {
        }
    }
}