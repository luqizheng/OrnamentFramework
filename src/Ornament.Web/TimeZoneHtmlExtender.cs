using System.Web;
using System.Web.Mvc;
using Ornament.Web.HttpModel;

namespace Ornament.Web
{
    public static class TimeZoneHtmlExtender
    {
        public static IHtmlString CorrectTimeZone(this HtmlHelper helper, bool refresh)
        {
            const string ssss =
                "<script type=\"text/javascript\">seajs.use([\"/Scripts/Utils.js\"],function (){correctTimeZone(";
            const string a = ");});</script>";
            if (OrnamentModule.GetOffSetHour() == null)
            {
                var edit = refresh ? "true" : "false";
                return helper.Raw(ssss + edit + a);
            }
            return helper.Raw("");

        }
    }
}