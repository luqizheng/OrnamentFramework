using System.Web.Mvc;

namespace Ornament.Web.UI.Theme
{
    public static class ThemeContext
    {
        public static Panel Panel(this HtmlHelper htmlHelper, params string[] classNames)
        {
            return new Panel(htmlHelper,classNames);
        }

        public static Panel Panel(this HtmlHelper htmlHelper, PanelOption options, params string[] classNames)
        {
            return new Panel(htmlHelper,options);
        }
    }
}