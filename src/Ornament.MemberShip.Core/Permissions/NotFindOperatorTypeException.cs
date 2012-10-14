using System;

namespace Ornament.MemberShip.Permissions
{
    public class NotFindOperatorTypeException:MemberShipPermissionException
    {
        public NotFindOperatorTypeException(Type resourceType)
            : base("Can't find operator type which belong to " +
                   resourceType.FullName +
                   ", it may be setting in WebCfg.config and resolve by IoC framework.")
        {
        }
    }
}