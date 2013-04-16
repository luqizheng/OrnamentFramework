using System.Text.RegularExpressions;

namespace Ornament.Web
{
    /// <summary>
    /// Only for bootstrap
    /// </summary>
    public static class HtmlExtender
    {

        internal static string ToInputMask(string dateTimeformat)
        {
            string result = dateTimeformat.ToLower();
            return Regex.Replace(result, "\\w+", s =>
                {
                    string f = s.Value.Substring(0, 1);
                    if (f == "m")
                        return "s";
                    return f;
                });
        }

        
    }
}