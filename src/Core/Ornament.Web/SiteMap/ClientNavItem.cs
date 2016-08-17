using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Ornament.Web.SiteMap
{
    public class ClientNavItem
    {
        public ClientNavItem(Nav itme, IUrlHelper helper)
        {
            Name = itme.Name;
            Url = itme.Url(helper);
        }

        public string Name { get; set; }
        public string Url { get; set; }

        public IList<ClientNavItem> ChildNavs { get; set; }

        public static IList<ClientNavItem> InitClient(Nav nav, IUrlHelper helper)
        {
            var result = new List<ClientNavItem>();
            foreach (var item in nav.ChildNavs)
            {
                var client = new ClientNavItem(item, helper);
                result.Add(client);
                if (item.ChildNavs.Any())
                    client.ChildNavs = InitClient(item, helper);
            }

            return result;
        }
    }
}