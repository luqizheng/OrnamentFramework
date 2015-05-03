using Ornament.Web.PortableAreas.SeajsModules;

namespace Ornament.Web.PortableAreas.Messages
{
    public class RequireJsModuleBundleEventMessage : IEventMessage
    {
        public RequireJsModuleBundleEventMessage(EmbedBundle bundle)
        {
            Bundle = bundle;
        }

        public EmbedBundle Bundle { get; set; }
    }
}