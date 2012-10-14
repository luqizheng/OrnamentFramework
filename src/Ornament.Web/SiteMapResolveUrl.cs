using System.Collections.Generic;
using MvcSiteMapProvider;

namespace Ornament.Web
{
    public class SiteMapResolveUrl : DefaultSiteMapNodeUrlResolver
    {
        public override string ResolveUrl(MvcSiteMapNode mvcSiteMapNode, string area, string controller, string action,
                                          IDictionary<string, object> routeValues)
        {
            var list = new List<string>();
            foreach (var key in mvcSiteMapNode.RouteValues.Keys)
            {
                if (key.ToLower().EndsWith("operator"))
                {
                    list.Add(key);
                }
            }
            foreach (var key in list)
            {
                mvcSiteMapNode.RouteValues.Remove(key);
                mvcSiteMapNode.MetaAttributes.Remove(key);
            }
            return base.ResolveUrl(mvcSiteMapNode, area, controller, action, routeValues);
        }
    }
}