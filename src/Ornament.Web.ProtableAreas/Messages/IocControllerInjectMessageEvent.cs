using System;
using System.Collections.Generic;
using Castle.MicroKernel.Registration;
using Castle.Windsor;
using Ornament.Web.PortableAreas;

namespace Ornament.Web.ProtableAreas.Messages
{
    public class IocControllerInjectMessageHandler : MessageHandler<IocControllerInjectMessageEvent>
    {
        public override void Handle(IocControllerInjectMessageEvent message)
        {
            var _container = (WindsorContainer) OrnamentContext.IocContainer;
            if (message.Controllers != null)
            {
                foreach (Type controller in message.Controllers)
                {
                    _container.Register(Component.For(controller).LifestyleTransient());
                }
            }
            if (message.ApiControllers != null)
            {
                foreach (Type apiController in message.ApiControllers)
                {
                    _container.Register(Component.For(apiController).LifestyleTransient());
                }
            }
        }
    }

    public class IocControllerInjectMessageEvent : IEventMessage
    {
        public IocControllerInjectMessageEvent(IEnumerable<Type> controllers, IEnumerable<Type> apiControllers)
        {
            Controllers = controllers;
            ApiControllers = apiControllers;
        }

        public IEnumerable<Type> Controllers { get; set; }
        public IEnumerable<Type> ApiControllers { get; set; }
    }
}