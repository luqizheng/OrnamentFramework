using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Routing;

namespace Ornament.Web.SiteMap
{
    public class MvcNav : Nav
    {
        private string _action;
        private string _area = "";
        private string _controller = "";


        public string Area
        {
            get { return _area; }
            set { _area = value.ToUpper(); }
        }

        public string Controller
        {
            get { return _controller; }
            set { _controller = value.ToUpper(); }
        }

        public string Action
        {
            get { return _action; }
            set { _action = value.ToUpper(); }
        }

        public override string Url(IUrlHelper helper)
        {
            return helper.Action(this.Action, this.Controller, new
            {
                area = this.Area
            });
        }

        public MvcNav(string name) : base(name, "#")
        {
        }
    }
    public class Nav
    {
        private string _url;
        public Nav(string name,string url)
        {
            this.Name = name;
            _url = url;
        }
        public string IconClasses { get; set; }
        private List<Nav> _childNavs;

        public string Name { get; set; }
        public Type ResourceType { get; set; }

        public virtual string Url(IUrlHelper helper)
        {
            return _url;
        }
        public Nav Parent { get; private set; }

        public IEnumerable<Nav> ChildNavs => _childNavs ?? (_childNavs = new List<Nav>());

        public void Add(Nav nav)
        {
            nav.Parent = this;
            if (_childNavs == null)
                _childNavs = new List<Nav>();
            _childNavs.Add(nav);
        }

    }

    public static class NavManager
    {
        private static readonly IDictionary<string, IDictionary<string, IDictionary<string, Nav>>>
            map = new Dictionary<string, IDictionary<string, IDictionary<string, Nav>>>
            {
                {"", new ConcurrentDictionary<string, IDictionary<string, Nav>>()}
            };

        public static void Init(Nav root)
        {
            Root = root;
            var mvcNav = root as MvcNav;
            if (mvcNav != null)
                InitArea(map, mvcNav);
            else
            {
                foreach (var item in root.ChildNavs)
                {
                    mvcNav = item as MvcNav;
                    if (mvcNav != null)
                        InitArea(map, mvcNav);
                }
            }
        }

        private static void InitArea(IDictionary<string, IDictionary<string, IDictionary<string, Nav>>> area, MvcNav nav)
        {

            if (!area.ContainsKey(nav.Area))
            {
                var item = new Dictionary<string, IDictionary<string, Nav>>();
                area.Add(nav.Area, item);
            }
            InitController(area[nav.Area], nav);
        }

        private static void InitController(IDictionary<string, IDictionary<string, Nav>> controllers, MvcNav nav)
        {
            if (!controllers.ContainsKey(nav.Area))
            {
                var item = new Dictionary<string, Nav>();
                controllers.Add(nav.Controller, item);
            }
            InitActions(controllers[nav.Controller], nav);
        }

        private static void InitActions(IDictionary<string, Nav> actions, MvcNav nav)
        {
            if (!actions.ContainsKey(nav.Area))
                actions.Add(nav.Action, nav);
            foreach (var childNav in nav.ChildNavs)
            {
                Init(childNav);
            }
        }

        public static Nav Current(this ControllerBase request)
        {
            return Current(request.RouteData);
        }

        public static Nav Current(this IHtmlHelper helper)
        {
            return Current(helper.ViewContext.RouteData);
        }

        public static Nav Current(this RouteData routeData)
        {
            var currentArea = (routeData.Values["area"] ?? string.Empty).ToString().ToUpper();
            var currentController = (routeData.Values["controller"] ?? string.Empty).ToString().ToUpper();
            var currentAction = (routeData.Values["action"] ?? string.Empty).ToString().ToUpper();

            if (map.ContainsKey(currentArea))
                if (map[currentAction].ContainsKey(currentController))
                    if (map[currentAction][currentController].ContainsKey(currentAction))
                        return map[currentArea][currentController][currentAction];
            return null;
        }

        public static Nav Root { get; private set; }
    }
}