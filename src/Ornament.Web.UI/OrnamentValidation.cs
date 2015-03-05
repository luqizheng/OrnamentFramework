using System;
using System.Collections.Generic;
using System.Text;
using System.Web.Mvc;

namespace Ornament.Web.UI
{
    public static class OrnamentValidation
    {
        /// <summary>
        ///     验证Summary，如果有generalMessage
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="generalMessage"></param>
        /// <returns></returns>
        public static MvcHtmlString OrnamentValidationSummary(this HtmlHelper helper, string generalMessage)
        {
            return OrnamentValidationSummary(helper, generalMessage, true);
        }

        /// <summary>
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="generalMenssage"></param>
        /// <param name="excludeProperty">是否排除property 的错误</param>
        /// <returns></returns>
        public static MvcHtmlString OrnamentValidationSummary(this HtmlHelper helper, string generalMenssage,
            bool excludeProperty)
        {
            if (excludeProperty && String.IsNullOrEmpty(generalMenssage))
            {
                return new MvcHtmlString("");
            }

            var buff = new StringBuilder();

            var div = new TagBuilder("div");
            div.AddCssClass("validation-summary-valid  alert alert-warning fade in");
            div.MergeAttribute("data-valmsg-summary", "true");
            div.MergeAttribute("style", "display:none");

            buff.Append(div.ToString(TagRenderMode.StartTag));

            var closeBtn = new TagBuilder("a");

            closeBtn.MergeAttributes(new Dictionary<string, string>
            {
                {"href", "#"},
                {"data-dismiss", "alert"},
                {"class", "close"}
            });
            closeBtn.SetInnerText("×");

            buff.Append(closeBtn);

            if (!string.IsNullOrEmpty(generalMenssage))
            {
                var genIcon = new TagBuilder("i");
                genIcon.AddCssClass("fa-fw fa fa-warning");
                buff.Append(genIcon);

                var messTag = new TagBuilder("strong");
                messTag.SetInnerText(generalMenssage);
                buff.Append(messTag);
            }


            if (!excludeProperty)
            {
                var propertyList = new TagBuilder("ol");
                buff.Append(propertyList);
            }

            buff.Append(div.ToString(TagRenderMode.EndTag));

            return new MvcHtmlString(buff.ToString());
        }
    }
}