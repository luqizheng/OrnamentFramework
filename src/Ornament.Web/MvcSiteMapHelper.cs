using System.Web;
using System.Web.Mvc;
using MvcSiteMapProvider;
using MvcSiteMapProvider.Web.Html;
using Ornament.Web.MemberShips;

namespace Ornament.Web
{
    public static class MvcSiteMapHelper
    {
        public static bool CurrentNodeMatchParent(this HtmlHelper helper, SiteMapNodeCollection nodes, out SiteMapNode matchParentNode)
        {
            matchParentNode = helper.MvcSiteMap().Provider.CurrentNode;
            if (matchParentNode == null)
                return false;
            while (matchParentNode != helper.MvcSiteMap().Provider.RootNode)
            {
                for (int i = 0; i < nodes.Count; i++)
                {
                    if (nodes[i].Equals(matchParentNode))
                    {
                        return true;
                    }
                }
                matchParentNode = matchParentNode.ParentNode;
            }
            return false;
        }

        public static SiteMapNodeCollection GetChildMenus(this HtmlHelper helper, SiteMapPermission siteMapPermission)
        {
            var currentNode = helper.MvcSiteMap().Provider.CurrentNode;
            if (currentNode == null)
                return null;

            var col = GetChildMenus(helper, currentNode, siteMapPermission);
            while (col.Count == 0)
            {
                currentNode = currentNode.ParentNode;
                col = GetChildMenus(helper, currentNode, siteMapPermission);
            }
            return col;
        }

        private static SiteMapNodeCollection GetChildMenus(HtmlHelper helper, SiteMapNode currentNode, SiteMapPermission siteMapPermission)
        {

            var col = new SiteMapNodeCollection();
            if (currentNode == null || currentNode.Equals(helper.MvcSiteMap().Provider.RootNode))
            {
                return helper.MvcSiteMap().Provider.RootNode.ChildNodes;
            }
            if (currentNode.HasChildNodes)
            {

                for (int i = 0; i < currentNode.ChildNodes.Count; i++)
                {
                    var node = (MvcSiteMapNode)currentNode.ChildNodes[i];
                    if (node.Clickable && siteMapPermission.IsAccessibleToUser(node))
                    {
                        col.Add(node);
                    }
                }
            }
            return col;
        }

    }
}