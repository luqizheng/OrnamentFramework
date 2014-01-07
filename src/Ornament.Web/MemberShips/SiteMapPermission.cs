using System;
using MvcSiteMapProvider;
using Ornament.Contexts;
using Ornament.MemberShip.Permissions;

namespace Ornament.Web.MemberShips
{
    public class SiteMapPermission
    {
        private readonly MemberShipContext _memberShipContext;

        ///
        public SiteMapPermission(MemberShipContext memberShipContext, ResourceManager manager)
        {
            if (memberShipContext == null)
                throw new ArgumentNullException("memberShipContext");
            if (manager == null) throw new ArgumentNullException("manager");
            _memberShipContext = memberShipContext;
        }

        /// <summary>
        /// </summary>
        /// <param name="node"></param>
        /// <returns></returns>
        public bool IsAccessibleToUser(ISiteMapNode node)
        {
            string operatorExpress = node.Attributes.ContainsKey("permission")
                ? (string) node.Attributes["permission"]
                : null;
            if (operatorExpress == null)
            {
                return node.IsAccessibleToUser();
            }
            var permission = new MenuPermission(operatorExpress, _memberShipContext);

            return permission.HasRight(OrnamentContext.MemberShip.CurrentUser());
        }
    }
}