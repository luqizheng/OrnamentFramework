﻿//using Ornament.Messages.Newses;
using Ornament;
using Ornament.MemberShip;
using Ornament.MemberShip.Plugin.Models;
using Ornament.Web;

namespace WebApplication
{
    /// <summary>
    ///     Permission setting
    /// </summary>
    public class PermissionConfig
    {
        public static void Register()
        {
            RegistrySettingPage();
        }

        private static void RegistrySettingPage()
        {
           

            OrnamentContext.ResourceManager.Configuration().AddResourceSetting(new ResourceDescription
            {
                ValueType = typeof (string),
                Name = "类型资源",
                Path = "~/Areas/MemberShips/Views/Permissions/_defaultResourceSelector.cshtml"
            });

            //OrnamentContext.ResourceManager.Configuration().AddResourceSetting(new ResourceDescription
            //{
            //    Name = "新闻资源",
            //    Path = "~/Areas/Messages/Views/Shared/resNewsType.cshtml",
            //    ValueType = typeof (NewsType)
            //});

       
        }
    }
}