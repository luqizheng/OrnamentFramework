using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Routing;
using Newtonsoft.Json;

namespace Ornament.Web.SiteMap
{
    public static class NavManager
    {
        private static readonly IDictionary<string, IDictionary<string, IDictionary<string, Nav>>>
            areas = new Dictionary<string, IDictionary<string, IDictionary<string, Nav>>>
            {
                {"", new ConcurrentDictionary<string, IDictionary<string, Nav>>()}
            };

        public static Nav Root { get; private set; }

        public static void Init(Nav root)
        {
            Root = root;
            var mvcNav = root as MvcNav;
            if (mvcNav != null)
                InitArea(areas, mvcNav);
            else
                foreach (var item in root.ChildNavs)
                {
                    mvcNav = item as MvcNav;
                    if (mvcNav != null)
                        InitArea(areas, mvcNav);
                }
        }

        private static void InitArea(IDictionary<string, IDictionary<string, IDictionary<string, Nav>>> area, MvcNav nav)
        {
            var areaKey = nav.Area.ToUpper();
            if (!area.ContainsKey(areaKey))
            {
                var item = new Dictionary<string, IDictionary<string, Nav>>();
                area.Add(areaKey, item);
            }
            InitController(area[areaKey], nav);
        }

        private static void InitController(IDictionary<string, IDictionary<string, Nav>> controllers, MvcNav nav)
        {
            var ctrlKey = nav.Controller.ToUpper();
            if (!controllers.ContainsKey(ctrlKey))
            {
                var item = new Dictionary<string, Nav>();
                controllers.Add(ctrlKey, item);
            }
            InitActions(controllers[ctrlKey], nav);
        }

        private static void InitActions(IDictionary<string, Nav> actions, MvcNav nav)
        {
            var actionKey = nav.Action.ToUpper();
            if (!actions.ContainsKey(actionKey))
                actions.Add(actionKey, nav);
            foreach (var childNav in nav.ChildNavs)
                Init(childNav);
        }

        public static Nav CurrentPage(this ControllerBase request)
        {
            return CurrentPage(request.RouteData);
        }

        public static Nav CurrentPage(this IHtmlHelper helper)
        {
            return CurrentPage(helper.ViewContext.RouteData);
        }

        public static Nav CurrentPage(this RouteData routeData)
        {
            var area = (routeData.Values["area"] ?? string.Empty).ToString().ToUpper();
            var controller = (routeData.Values["controller"] ?? string.Empty).ToString().ToUpper();
            var action = (routeData.Values["action"] ?? string.Empty).ToString().ToUpper();

            if (areas.ContainsKey(area))
            {
                var controllers = areas[area];
                if (controllers.ContainsKey(controller))
                {
                    var actouns = controllers[controller];
                    if (actouns.ContainsKey(action))
                        return actouns[action];
                }
            }
            return null;
        }

        public static IEnumerable<Nav> GetBreadcrumb(this ControllerBase request, int deep = int.MaxValue)
        {
            return GetBreadcrumb(request.RouteData);
        }

        public static IEnumerable<Nav> GetBreadcrumb(this IHtmlHelper helper, int deep = int.MaxValue)
        {
            return GetBreadcrumb(helper.ViewContext.RouteData);
        }
        /// <summary>
        /// json化导航
        /// </summary>
        /// <param name="helper"></param>
        /// <returns></returns>
        public static string ToJson(IUrlHelper helper)
        {
            var clients = ClientNavItem.InitClient(Root, helper);
            return JsonConvert.SerializeObject(clients);
        }

        public static IEnumerable<Nav> GetBreadcrumb(this RouteData route, int deep = int.MaxValue)
        {
            var result = new Stack<Nav>();
            var current = CurrentPage(route);
            if (current == null)
                return new[] {Root};
            var i = 0;
            result.Push(current);
            while (current.Parent != null)
            {
                result.Push(current.Parent);
                current = current.Parent;
                i++;
                if (i == deep)
                    break;
            }
            var aryResult = new Nav[result.Count - 1];

            result.Pop();
            i = 0;
            while (result.Count != 0)
            {
                aryResult[i] = result.Pop();
                i++;
            }
            return aryResult;
        }
    }


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