using Ornament.Configurations;

namespace Ornament.Web.PortableAreas.Messages
{
    public class NHConfigurationHandler : MessageHandler<NHRegisterEventMessage>
    {
        public override void Handle(NHRegisterEventMessage message)
        {
            NHConfig.Instance.RegistDaoFactory(message.DaoFactoryInterface, message.ImpleDaoFactory);
        }
    }
}