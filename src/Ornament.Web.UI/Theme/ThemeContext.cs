using System.Web.Mvc;

namespace Ornament.Web.UI.Theme
{
    public static class ThemeContext
    {
        public static Panel Panel(this HtmlHelper htmlHelper, params string[] classNames)
        {
            var tagBuilder = new TagBuilder("div");
            if (classNames != null)
            {
                foreach (string className in classNames)
                {
                    tagBuilder.AddCssClass(className);
                }
            }
            htmlHelper.ViewContext.Writer.Write(tagBuilder.ToString(TagRenderMode.StartTag));
            return new Panel(htmlHelper, OrnamentContext.Configuration.TemplateName());
        }
    }
}