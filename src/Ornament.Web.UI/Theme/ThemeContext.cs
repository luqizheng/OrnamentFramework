using System.Collections.Generic;
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
            if (options.HtmlAttributes == null)
                options.HtmlAttributes = new Dictionary<string, object>()
                {
                    {"class", string.Join(" ", classNames)}
                };
            else
            {
                if (!options.HtmlAttributes.ContainsKey("class"))
                {
                    options.HtmlAttributes.Add("class", string.Join(" ", classNames));
                }
                else
                {
                    options.HtmlAttributes["class"] = string.Join(" ", classNames);
                }
            }
            return new Panel(htmlHelper,options);
        }

   
    }
}