using System;
using System.Collections.Generic;

namespace Ornament.MemberShip.Web.Plugin.Models
{
    /// <summary>
    ///     for zTree only
    /// </summary>
    public class OrgTreeItem
    {
        public OrgTreeItem(Org org)
        {
            name = org.Name;
            parentId = org.Parent != null ? org.Id : "";

            foreach (Org item in org.Childs)
            {
                children = new List<object>();
                children.Add(new OrgTreeItem(item));
            }
            id = org.Id;
        }

        public string id { get; set; }
        public string name { get; set; }

        public string parentId { get; set; }

        public List<Object> children { get; set; }
    }
}