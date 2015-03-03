using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Optimization;

namespace Ornament.Web
{
    public static class Amd
    {
        public static string Url(string virtualUrl)
        {
            virtualUrl = virtualUrl.ToLower();
            if(virtualUrl.StartsWith("~/scripts/") || virtualUrl.StartsWith("~/scripts/"))
            return Scripts.Url(virtualUrl).ToString().Replace("/scripts/", "");

            return ".." + Scripts.Url(virtualUrl);
        }
    }
}
