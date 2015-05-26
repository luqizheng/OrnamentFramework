using System.Web.Optimization;

namespace Ornament.Web
{
    public static class Amd
    {
        public static string Url(string virtualUrl)
        {
            return Scripts.Url(virtualUrl).ToString();
        }

        public static string Url(string virtualUrl, string baseDir,bool cutExtentName)
        {
            virtualUrl = virtualUrl.ToLower();
            if (virtualUrl.StartsWith(baseDir.TrimStart('~')) ||
                virtualUrl.StartsWith(baseDir.StartsWith("~") ? baseDir : "~" + baseDir))
                return Scripts.Url(virtualUrl).ToString().Replace("/scripts/", "");

            return ".." + Scripts.Url(virtualUrl);
        }
    }
}