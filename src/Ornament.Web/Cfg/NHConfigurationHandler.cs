using System;
using MvcContrib.PortableAreas;
using Ornament.Configurations;

namespace Ornament.Web.Cfg
{
    public class NHConfigurationHandler : MessageHandler<DaoFactoryRegister>
    {
        public NHConfigurationHandler()
        {
            var a = 0;
        }
        public static readonly NHConfig NHConfig = new NHConfig();

        public override void Handle(DaoFactoryRegister message)
        {
            NHConfig.AddFactoryDao(message.DaoFactoryInterface, message.ImpleDaoFactory);
        }
    }

    public class DaoFactoryRegister : IEventMessage
    {
        public DaoFactoryRegister(Type daoFactoryInterface, Type impleDaoFactory)
        {
            DaoFactoryInterface = daoFactoryInterface;
            ImpleDaoFactory = impleDaoFactory;
        }

        public Type DaoFactoryInterface { get; set; }
        public Type ImpleDaoFactory { get; set; }
    }
}