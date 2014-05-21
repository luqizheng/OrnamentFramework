using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MvcSiteMapProvider;

namespace Ornament.MemberShip.Plugin.Models.SiteMapNodes
{
    
    public class OrgNodeProvider : DynamicNodeProviderBase
    {
        public override IEnumerable<DynamicNode> GetDynamicNodeCollection(ISiteMapNode node)
        {
            var result = new List<DynamicNode>();
            result.Add(new DynamicNode()
            {
                ParentKey = "Org",
                Title = node.Title
            });
            return result;
        }
    }
}