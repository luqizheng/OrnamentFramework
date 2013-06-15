using Ornament.Contexts;
using Ornament.Models;
using Ornament.Web;

namespace Ornament.MVCWebFrame.App_Start
{
    public static class ApplicationConfig
    {
        public static void Register(OrnamentConfiguration context)
        {
            context.Languages.Add(new Language("en", "English"));
            context.Languages.Add(new Language("zh", "中文繁體"));
            context.Languages.Add(new Language("zh-CN", "中文简体"));

        }
    }
}