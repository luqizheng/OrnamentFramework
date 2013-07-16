using System;
using System.Globalization;
using System.Web.Mvc;
using Qi;

namespace Ornament.Web.ModelBinder
{
    public class TimeModelBinder : IModelBinder
    {
        public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            ValueProviderResult value = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
            string attemptedValue = value.AttemptedValue;

            string format = !String.IsNullOrEmpty(bindingContext.ModelMetadata.DisplayFormatString)
                                ? bindingContext.ModelMetadata.DisplayFormatString
                                : "HH:mm:ss tt";



            DateTime datetime = ToDateTime(attemptedValue, format);
            var time = new Time(datetime.Hour, datetime.Minute, datetime.Second);
            var type = bindingContext.ModelType;
            if (!type.IsGenericType)
            {
                return time;
            }
            Time? t = time;
            return t;
        }

        public static DateTime ToDateTime(string inputString, string formatString)
        {
            var format = new[]
                {
                    formatString,
                    CultureInfo.CurrentCulture.DateTimeFormat.ShortTimePattern,
                    CultureInfo.CurrentCulture.DateTimeFormat.LongTimePattern,
                    CultureInfo.CurrentUICulture.DateTimeFormat.ShortTimePattern,
                    CultureInfo.CurrentUICulture.DateTimeFormat.LongTimePattern,
                    "HH:mm",
                    "HH:mm:ss",
                    "hh:mm:ss tt",
                    "hh:mm tt"
                };
            DateTime dateTime;
            if (DateTime.TryParseExact(inputString, format, CultureInfo.CurrentCulture.DateTimeFormat,
                                       DateTimeStyles.AdjustToUniversal, out dateTime))
                return dateTime;

            throw new FormatException(inputString + " is not in correct format.");
        }
    }
}