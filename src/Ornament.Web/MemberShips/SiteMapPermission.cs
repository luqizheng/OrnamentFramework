using System;
using System.Web;
using Ornament.MemberShip.Permissions;

namespace Ornament.Web.MemberShips
{
    public class SiteMapPermission
    {
        private readonly Context _context;


        public SiteMapPermission(Context memberContext, OperatorResourceMapping mapping)
        {
            if (memberContext == null)
                throw new ArgumentNullException("memberContext");
            if (mapping == null) throw new ArgumentNullException("mapping");
            _context = memberContext;
        }

        public bool IsAccessibleToUser(SiteMapNode node)
        {
            string operatorExpress = node["permission"];
            if (operatorExpress == null)
            {
                return node.IsAccessibleToUser(HttpContext.Current);
            }
            var permission = new MenuPermission(operatorExpress, _context);

            return permission.HasRight(OrnamentContext.Current.CurrentUser);
        }
    }
}