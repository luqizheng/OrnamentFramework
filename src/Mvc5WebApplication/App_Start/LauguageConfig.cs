using System.Web.ModelBinding;
using Ornament.Contexts;
using Ornament.MemberShip.Plugin.Models;
using Ornament.MemberShip.Validations;
using Ornament.Models;

namespace WebApplication
{
    public static class LauguageConfig
    {
        public static void Register(OrnamentConfiguration context)
        {
            if (!context.Languages.Contains("en"))
            {
                context.Languages.Add(new Language("English", "en") { IsDefault = true });
            }
            if (!context.Languages.Contains("zh-Hant"))
            {
                context.Languages.Add(new Language("中文(繁)", "zh-Hant"));

            }
            if (!context.Languages.Contains("zh-Hans"))
            {
                context.Languages.Add(new Language("中文(简)", "zh-Hans"));
            }
          
        }
    }

    
}