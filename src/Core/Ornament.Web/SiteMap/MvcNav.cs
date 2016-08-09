using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Ornament.Web.SiteMap
{
    public class MvcNav : Nav
    {
        public MvcNav(string name) : base(name, "#")
        {
        }

        [JsonIgnore]
        public string Area { get; set; } = "";

        [JsonIgnore]
        public string Controller { get; set; } = "";

        [JsonIgnore]
        public string Action { get; set; }

        public override string Url(IUrlHelper helper)
        {
            var url = helper.Action(Action, Controller, new
            {
                area = Area
            });
            NavUrl = url;
            return url;
        }
    }
}