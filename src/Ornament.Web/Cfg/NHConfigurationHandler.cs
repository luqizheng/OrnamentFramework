﻿using MvcContrib.PortableAreas;
using Ornament.Configurations;

namespace Ornament.Web.Cfg
{
    public class NHConfigurationHandler : MessageHandler<DaoFactoryRegister>
    {
        public override void Handle(DaoFactoryRegister message)
        {
            NHConfig.Instance.RegistDaoFactory(message.DaoFactoryInterface, message.ImpleDaoFactory);
        }
    }
}