using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Ornament.Web.SiteMap
{
    public class Nav
    {
        private List<Nav> _childNavs;

        public Nav(string name, string url)
        {
            Name = name;
            NavUrl = url;
        }
        public IEnumerable<string> Roles { get; set; }
        public string IconClasses { get; set; }

        public string Name { get; set; }

        [JsonIgnore]
        public Type ResourceType { get; set; }

        public virtual string NavUrl { get; protected set; }

        [JsonIgnore]
        public Nav Parent { get; private set; }

        public IEnumerable<Nav> ChildNavs => _childNavs ?? (_childNavs = new List<Nav>());

        public virtual string Url(IUrlHelper helper)
        {
            return NavUrl;
        }

        public void Add(Nav nav)
        {
            nav.Parent = this;
            if (_childNavs == null)
                _childNavs = new List<Nav>();
            _childNavs.Add(nav);
        }
    }
}