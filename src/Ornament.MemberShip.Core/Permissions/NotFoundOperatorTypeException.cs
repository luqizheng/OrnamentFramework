using System;

namespace Ornament.MemberShip.Permissions
{
    [Serializable]
    public class NotFoundOperatorTypeException : MemberShipPermissionException
    {
        public NotFoundOperatorTypeException(Type resourceType)
            : base(string.Format("Can't find operator type which belong to {0}, it may be setting in WebCfg.config and resolve by IoC framework.", resourceType.FullName))
        {
        }

        public NotFoundOperatorTypeException(string resource) :
            base(string.Format("Cant' find the operator type which link to resource {0}", resource))
        {

        }

        public NotFoundOperatorTypeException(Type resourceType, Exception innerException)
            : base(
            string.Format("Can't find operator type which belong to {0}, it may be setting in WebCfg.config and resolve by IoC framework.", resourceType.FullName),
            innerException)
        {

        }
    }
}