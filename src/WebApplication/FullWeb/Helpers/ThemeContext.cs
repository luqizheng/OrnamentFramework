#region Using

using System;
using System.IO;
using System.Reflection;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

#endregion

namespace FullWeb.Helpers
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