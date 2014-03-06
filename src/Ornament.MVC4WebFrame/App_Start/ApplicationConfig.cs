﻿using Ornament.Contexts;
using Ornament.Models;

namespace Ornament.MVCWebFrame
{
    public static class ApplicationConfig
    {
        public static void Register(OrnamentConfiguration context)
        {
            context.Languages.Add(new Language("English", "en") { IsDefault = true });
            context.Languages.Add(new Language("中文(繁體)", "zh-Hant")
            {
                MatchKey = new[] { "zh-TW", "zh-MO", "zh-HK", "zh" }
            });
            context.Languages.Add(new Language("中文(简体)", "zh-Hans")
            {
                MatchKey = new[] { "zh-CN", "zh" }
            });
        }
    }
}