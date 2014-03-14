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
                Title = node.Title
            });
            return result;
        }
    }

    /*public class DepartmentNodeProvider
        : DynamicNodeProviderBase
    {
        public override IEnumerable<DynamicNode> GetDynamicNodeCollection(ISiteMapNode node)
        {
            var Departments = DepartmentGetter.GetDepartments();

            foreach (Department dep in Departments)
            {
                DynamicNode dynamicNode = new DynamicNode { Title = dep.Name };
                dynamicNode.RouteValues.Add("acronym", dep.Acronym);
                yield return dynamicNode;
            }
        }
    }*/

}