using System;
using System.Web;
using System.Web.Mvc;
using Ornament.Web.HttpModel;

namespace Ornament.Web
{
    [Obsolete]
    public static class TimeZoneHtmlExtender
    {
        [Obsolete]
        public static IHtmlString CorrectTimeZone(this HtmlHelper helper, bool refresh)
        {
            const string ssss =
                "<script type=\"text/javascript\">seajs.use([\"/Scripts/Utils.js\"],function (){correctTimeZone(";
            const string a = ");});</script>";
            if (OrnamentModule.GetOffSetHour() == null)
            {
                string edit = refresh ? "true" : "false";
                return helper.Raw(ssss + edit + a);
            }
            return helper.Raw("");
        }
    }
}