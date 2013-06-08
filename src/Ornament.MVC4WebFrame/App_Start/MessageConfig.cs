﻿using Ornament.Web;

namespace Ornament.MVCWebFrame.App_Start
{
    public static class MessageConfig
    {
        public static void Register(OrnamentContext context)
        {
            context.Languages().Add("en", "English");
            context.Languages().Add("zh", "中文繁體");
            context.Languages().Add("zh-CN", "中文简体");

        }
    }
}