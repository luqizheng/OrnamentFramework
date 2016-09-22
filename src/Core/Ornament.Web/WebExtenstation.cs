﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Linq;

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



            return (request.Query["X-Requested-With"] == "XMLHttpRequest") || (request.Headers["X-Requested-With"] == "XMLHttpRequest");
        }

        public static object ToJsonResult(this ModelStateDictionary model, bool isSuccess, string message = "")
        {
            return new
            {
                success = isSuccess,
                message = message,
                errors = from item in model.Values where item.Errors.Any() select item
            };
        }
    }


}
