using System.Collections.Generic;
using System.Web.Mvc;
using MvcSiteMapProvider;
using MvcSiteMapProvider.Web.Html;
using Ornament.Web.MemberShips;

namespace Ornament.Web
{
    public static class MvcSiteMapHelper
    {
        /// <summary>
        ///     Find the Match Second Level Menun by currentNode.
        /// </summary>
        /// <param name="helper"></param>
        /// <returns></returns>
        public static ISiteMapNode GetFirstLevelMenuByCurrentNode(this HtmlHelper helper)
        {
            ISiteMapNode currentNode = helper.MvcSiteMap().SiteMap.CurrentNode;
            if (currentNode == null)
                return null;
            ISiteMapNode rootNode = helper.MvcSiteMap().SiteMap.RootNode;
            if (rootNode == null)
                return null;
            if (rootNode.Equals(currentNode))
                return null;

            while (!rootNode.Equals(currentNode))
            {
                for (int i = 0; i < rootNode.ChildNodes.Count; i++)
                {
                    if (rootNode.ChildNodes[i].Equals(currentNode))
                        return currentNode;
                }
                currentNode = currentNode.ParentNode;
            }
            return null;
        }

        /// <summary>
        ///     获取当前用户访问的Node信息
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="siteMapPermission"></param>
        /// <param name="maxLevel"></param>
        /// <returns></returns>
        public static IList<MainMenu> GetUserMenus(this HtmlHelper helper,
            SiteMapPermission siteMapPermission, int maxLevel)
        {
            ISiteMapNode node = helper.MvcSiteMap().SiteMap.RootNode;
            var result = new List<MainMenu>();

            for (int i = 0; i < node.ChildNodes.Count; i++)
            {
                ISiteMapNode childNode = node.ChildNodes[i];
                if (Match(siteMapPermission, childNode) || true) //如果包含disabled 
                {
                    var mainMenu = new MainMenu
                    {
                        Current = childNode,
                    };
                    SubMenuMatch(helper, siteMapPermission, mainMenu, maxLevel, 0);
                    result.Add(mainMenu);
                }
            }
            return result;
        }

        /// <summary>
        /// </summary>
        /// <param name="siteMapPermission"></param>
        /// <param name="mainMenu"></param>
        /// <param name="maxLevel"></param>
        /// <param name="currentLevel"></param>
        /// <returns>return true main this menu is active.</returns>
        private static void SubMenuMatch(HtmlHelper helper, SiteMapPermission siteMapPermission,
            MainMenu mainMenu, int maxLevel, int currentLevel)
        {
            for (int i = 0; i < mainMenu.Current.ChildNodes.Count; i++)
            {
                ISiteMapNode childNode = mainMenu.Current.ChildNodes[i];
                string a = childNode.Title;
                if (Match(siteMapPermission, childNode) || true) //如果包含disabled 
                {
                    var childMainMenu = new MainMenu
                    {
                        Current = childNode,
                    };
                    mainMenu.SubMenus.Add(childMainMenu);
                    if (currentLevel + 1 <= maxLevel)
                    {
                        SubMenuMatch(helper, siteMapPermission, childMainMenu, maxLevel, currentLevel + 1);
                        if (childMainMenu.Current.Equals(helper.MvcSiteMap().SiteMap.CurrentNode))
                        {
                            childMainMenu.Actived = true;
                            mainMenu.Actived = true;
                        }
                    }
                }
            }
        }

        private static bool Match(SiteMapPermission siteMapPermission, ISiteMapNode childNode)
        {
            return siteMapPermission.IsAccessibleToUser(childNode)
                   && !childNode.MetaRobotsValues.Contains("disabled");
            //如果包含disabled 
        }

        //public static bool CurrentNodeMatchParent(this HtmlHelper helper, SiteMapNodeCollection nodes,
        //                                          out SiteMapNode matchParentNode)
        //{
        //    matchParentNode = helper.MvcSiteMap().Provider.CurrentNode;
        //    if (matchParentNode == null)
        //        return false;
        //    while (matchParentNode != helper.MvcSiteMap().Provider.RootNode)
        //    {
        //        for (int i = 0; i < nodes.Count; i++)
        //        {
        //            if (nodes[i].Equals(matchParentNode))
        //            {
        //                return true;
        //            }
        //        }
        //        matchParentNode = matchParentNode.ParentNode;
        //    }
        //    return false;
        //}

        //public static SiteMapNodeCollection GetChildMenus(this HtmlHelper helper, SiteMapPermission siteMapPermission)
        //{
        //    SiteMapNode currentNode = helper.MvcSiteMap().Provider.RootNode;
        //    if (currentNode == null)
        //        return null;

        //    SiteMapNodeCollection col = GetChildMenus(helper, currentNode, siteMapPermission);
        //    while (col.Count == 0)
        //    {
        //        currentNode = currentNode.ParentNode;
        //        col = GetChildMenus(helper, currentNode, siteMapPermission);
        //    }
        //    return col;
        //}

        //private static SiteMapNodeCollection GetChildMenus(HtmlHelper helper, SiteMapNode currentNode,
        //                                                   SiteMapPermission siteMapPermission)
        //{
        //    var col = new SiteMapNodeCollection();
        //    if (currentNode == null || currentNode.Equals(helper.MvcSiteMap().Provider.RootNode))
        //    {
        //        return helper.MvcSiteMap().Provider.RootNode.ChildNodes;
        //    }
        //    if (currentNode.HasChildNodes)
        //    {
        //        for (int i = 0; i < currentNode.ChildNodes.Count; i++)
        //        {
        //            var node = (MvcSiteMapNode)currentNode.ChildNodes[i];
        //            if (node.Clickable && siteMapPermission.IsAccessibleToUser(node))
        //            {
        //                col.Add(node);
        //            }
        //        }
        //    }
        //    return col;
        //}
    }
}