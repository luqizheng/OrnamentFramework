using System;
using System.Web;
using Ornament.Contexts;
using Ornament.MemberShip.Permissions;

namespace Ornament.Web.MemberShips
{
    public class SiteMapPermission
    {
        private readonly UserContext _userContext;

        ///
        public SiteMapPermission(UserContext userContext, ResourceManager manager)
        {
            if (userContext == null)
                throw new ArgumentNullException("userContext");
            if (manager == null) throw new ArgumentNullException("manager");
            _userContext = userContext;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="node"></param>
        /// <returns></returns>
        public bool IsAccessibleToUser(SiteMapNode node)
        {
            string operatorExpress = node["permission"];
            if (operatorExpress == null)
            {
                return node.IsAccessibleToUser(HttpContext.Current);
            }
            var permission = new MenuPermission(operatorExpress, _userContext);

            return permission.HasRight(OrnamentContext.Current.CurrentUser());
        }
    }
}