using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Web.MessageHandlers;
using Ornament.Web.PortableAreas;
using Ornament.Web.ProtableAreas.Messages;

namespace Friends.Areas.Friends
{
    public class FriendsAreaRegistration : PortableAreaRegistration
    {
        public override string AreaName
        {
            get { return "Friends"; }
        }

        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            base.RegisterArea(context, bus);
            context.MapRoute(
                "Friends_default",
                "Friends/{controller}/{action}/{id}",
                new {action = "Index", id = UrlParameter.Optional}
                );
        }

        protected override IEnumerable<NHRegisterEventMessage> RegistDaos()
        {
            return null;
        }

        protected override void GetInjectControllers(out IEnumerable<Type> controller, out IEnumerable<Type> apiController)
        {
            controller = null;
            apiController = null;
        }
    }
}