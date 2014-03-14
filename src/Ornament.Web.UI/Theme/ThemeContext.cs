using System.Web.Mvc;

namespace Ornament.Web.UI.Theme
{
    public static class ThemeContext
    {
        public static Panel Panel(this HtmlHelper htmlHelper, params string[] classNames)
        {
            return new Panel(htmlHelper, OrnamentContext.Configuration.TemplateName(),classNames);
        }
    }
}