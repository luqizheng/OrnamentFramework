using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ornament.Web
{
    public static class WebExtenstation
    {
        public static bool IsAjaxRequest(this HttpRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException("request");
            }
           
         
           
            return  (request.Query["X-Requested-With"] == "XMLHttpRequest") || (request.Headers["X-Requested-With"] == "XMLHttpRequest");
        }
    }
}
