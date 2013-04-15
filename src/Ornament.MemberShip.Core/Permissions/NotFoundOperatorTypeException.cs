using System;

namespace Ornament.MemberShip.Permissions
{
    public class NotFoundOperatorTypeException : MemberShipPermissionException
    {
        public NotFoundOperatorTypeException(Type resourceType)
            : base("Can't find operator type which belong to " +
                   resourceType.FullName +
                   ", it may be setting in WebCfg.config and resolve by IoC framework.")
        {
        }

        public NotFoundOperatorTypeException(string resource) :
            base(string.Format("Cant' find the operator type which link to resource {0}", resource))
        {

        }
    }
}