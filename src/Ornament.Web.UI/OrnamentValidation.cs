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
        public static MvcHtmlString OrnamentValidationSummary(this HtmlHelper helper)
        {  
            /*<div data-valmsg-summary="true" class="validation-summary-valid"><ul><li style="display:none"></li></ul></div>*/
            string sb = @"<div class=""validation-summary-valid"" data-valmsg-summary=""true"" style=""display:none"">
				<a href=""#"" data-dismiss=""alert"" class=""close"">×</a>
				<h4 class=""alert-heading"">" + Properties.Resources.Wanring+"</h4></div>";

            return new MvcHtmlString(sb);

        }
    }
}
