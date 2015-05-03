using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Ornament.Web.PortableAreas.Messages;

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


        public void RegistryImages(AreaRegistrationContext context, string imageFolder)
        {
            _helper.RegistryImages(context, imageFolder);
        }


        public void RegistScripts(string scriptPath)
        {
            _helper.RegistScripts(scriptPath);
        }

        public void RegistJsModule(string path)
        {
            _helper.RegistJsModule(path);
        }

        public void RegistyEmbedResouce(string path)
        {
            _helper.RegistyEmbedResouce(path);
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