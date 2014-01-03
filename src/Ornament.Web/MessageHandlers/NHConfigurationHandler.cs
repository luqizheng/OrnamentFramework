using Ornament.Configurations;
using Ornament.Web.PortableAreas;

namespace Ornament.Web.MessageHandlers
{
    public class NHConfigurationHandler : MessageHandler<NHRegisterEventMessage>
    {
        public override void Handle(NHRegisterEventMessage message)
        {
            NHConfig.Instance.RegistDaoFactory(message.DaoFactoryInterface, message.ImpleDaoFactory);
        }
    }
}