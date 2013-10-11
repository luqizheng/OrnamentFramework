using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Optimization;

namespace Ornament.Web.Bundles
{
    public static class ScriptsSeajs
    {
        public static IHtmlString RenderUrl(string path)
        {
            return new HtmlString(Scripts.RenderFormat("{0}", path).ToHtmlString().Replace("\r\n", ""));
        }
    }
}
