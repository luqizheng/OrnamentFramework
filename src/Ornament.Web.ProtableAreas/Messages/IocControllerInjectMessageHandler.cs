using System;
using Castle.MicroKernel.Registration;
using Castle.Windsor;
using Ornament.Web.PortableAreas;

namespace Ornament.Web.Messages
{
    public class IocControllerInjectMessageHandler : MessageHandler<IocControllerInjectMessageEvent>,IMessageHandler
    {
        public override void Handle(IocControllerInjectMessageEvent message)
        {
            var container = (WindsorContainer) OrnamentContext.IocContainer;
            if (message.Controllers != null)
            {
                foreach (Type controller in message.Controllers)
                {
                    container.Register(Component.For(controller).LifestyleTransient());
                }
            }
            if (message.ApiControllers != null)
            {
                foreach (Type apiController in message.ApiControllers)
                {
                    container.Register(Component.For(apiController).LifestyleTransient());
                }
            }
        }
    }
}