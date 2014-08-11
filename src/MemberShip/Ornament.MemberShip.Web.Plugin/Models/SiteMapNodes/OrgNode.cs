using System.Collections.Generic;
using MvcSiteMapProvider;

namespace Ornament.MemberShip.Web.Plugin.Models.SiteMapNodes
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