using Ornament.Contexts;
using Ornament.Models;
using Ornament.Web;

namespace Ornament.MVCWebFrame.App_Start
{
    public static class ApplicationConfig
    {
        public static void Register(OrnamentConfiguration context)
        {
            context.Languages.Add(new Language("English", "en") { IsDefault = true });
            context.Languages.Add(new Language("中文繁體", "zh"));
            context.Languages.Add(new Language("中文简体", "zh-CN"));

        }
    }
}