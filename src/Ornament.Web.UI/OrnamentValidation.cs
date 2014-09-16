using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Ornament.Web.UI
{
    public static class OrnamentValidation
    {
        public static MvcHtmlString OrnamentValidationSummary(this HtmlHelper helper,string generalMessage)
        {
            return OrnamentValidationSummary(helper, generalMessage,true);
        }

        
        public static MvcHtmlString OrnamentValidationSummary(this HtmlHelper helper, string generalMenssage,
            bool excludeProperty)
        {
            if (excludeProperty && String.IsNullOrEmpty(generalMenssage))
            {
                return new MvcHtmlString("");
            }

            var buff = new StringBuilder();

            TagBuilder div=new TagBuilder("div");
            div.AddCssClass("validation-summary-valid  alert alert-warning fade in");
            div.MergeAttribute("data-valmsg-summary","true");
            div.MergeAttribute("style","display:none");

            buff.Append(div.ToString(TagRenderMode.StartTag));

            var closeBtn = new TagBuilder("a");

            closeBtn.MergeAttributes(new Dictionary<string,string>()
            {
                {"href","#"},
                {"data-dismiss","alert"},
                {"class","close"}
            });
            closeBtn.SetInnerText("×");

            buff.Append(closeBtn.ToString());
            
            if (!string.IsNullOrEmpty(generalMenssage))
            {
                var genIcon = new TagBuilder("i");
                genIcon.AddCssClass("fa-fw fa fa-warning");
                buff.Append(genIcon.ToString());

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
