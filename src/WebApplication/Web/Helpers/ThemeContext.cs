#region Using

using Microsoft.AspNetCore.Mvc.Rendering;

#endregion

namespace WebApplication.Helpers
{
    public static class ThemeContext
    {
        public static Panel Panel(this IHtmlHelper htmlHelper, params string[] classNames)
        {
            return new Panel(htmlHelper, classNames);
        }

        public static Panel Panel(this IHtmlHelper htmlHelper, PanelOption options, params string[] classNames)
        {
            
            return new Panel(htmlHelper, options);
        }

   
    }
}