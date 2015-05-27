using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Web.PortableAreas.Messages;
using Ornament.Web.PortableAreas.PortableAreas;

namespace Ornament.Web.PortableAreas
{
    public abstract class PortableAreaRegistration : BasePortableAreaRegistration
    {
        private readonly AreaRegistrationHelper _helper;
        private bool _controllerCollection;

        protected PortableAreaRegistration()
        {
            _helper = new AreaRegistrationHelper(this);
        }

        public void RegistJsModule(string path)
        {
            _helper.RegistJsModule(path);
        }

        public override void RegisterArea(AreaRegistrationContext context, IApplicationBus bus)
        {
            base.RegisterArea(context, bus);
            if (!_controllerCollection)
            {
                _controllerCollection = true;
                GetInjectControllers(bus);
            }
            _helper.SendAllMessage(context, bus);
        }

        private void GetInjectControllers(IApplicationBus bus)
        {
            //如果一个Assembly(Plugin)里面有多个Area，这样就不会重复注册Cotnroller的信息。


            IEnumerable<Type> controller;
            IEnumerable<Type> apiController;

            AssemblyHelper.FindController(GetType().Assembly, out controller, out apiController);

            var ev = new IocControllerInjectMessageEvent(controller, apiController);
            bus.Send(ev);
        }
    }
}