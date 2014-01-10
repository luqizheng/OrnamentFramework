﻿using Ornament.MemberShip.Plugin.Areas.MemberShips.Models;
using Ornament.MemberShip.Plugin.Models;
using Ornament.Messages.Newses;
using Ornament.Web;

namespace Ornament.MVCWebFrame
{
    /// <summary>
    /// Permission setting 
    /// </summary>
    public class PermissionConfig
    {
        public static void Regist()
        {
            

            OrnamentContext.ResourceManager
                           .Add(typeof (NewsType), typeof (NewsOperator));

            RegistrySettingPage();
        }

        private static void RegistrySettingPage()
        {
            OrnamentContext.ResourceManager.Configuration().ResourceSettings.Add(new ResourceDescription
                {
                    ValueType = typeof (string),
                    Name = "类型资源",
                    Path = "~/Areas/MemberShips/Views/Permissions/_defaultResourceSelector.cshtml"
                });

            OrnamentContext.ResourceManager.Configuration().ResourceSettings.Add(new ResourceDescription
                {
                    Name = "新闻资源",
                    Path = "~/Areas/Messages/Views/Shared/resNewsType.cshtml",
                    ValueType = typeof (NewsType)
                });
        }
    }
}