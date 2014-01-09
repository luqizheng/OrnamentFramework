﻿using System.Collections.Generic;
using MvcSiteMapProvider;
using MvcSiteMapProvider.Web;
using MvcSiteMapProvider.Web.Mvc;
using MvcSiteMapProvider.Web.UrlResolver;

namespace Ornament.Web
{
    public class SiteMapResolveUrl : SiteMapNodeUrlResolver
    {
        public SiteMapResolveUrl(IMvcContextFactory mvcContextFactory, IUrlPath urlPath)
            : base(mvcContextFactory, urlPath)
        {
        }

        public override string ResolveUrl(ISiteMapNode mvcSiteMapNode, string area, string controller, string action,
            IDictionary<string, object> routeValues)
        {
            var list = new List<string>();
            foreach (string key in mvcSiteMapNode.RouteValues.Keys)
            {
                if (key.ToLower().EndsWith("operator"))
                {
                    list.Add(key);
                }
            }
            foreach (string key in list)
            {
                mvcSiteMapNode.RouteValues.Remove(key);
                mvcSiteMapNode.MetaRobotsValues.Remove(key);
            }
            return base.ResolveUrl(mvcSiteMapNode, area, controller, action, routeValues);
        }
    }
}