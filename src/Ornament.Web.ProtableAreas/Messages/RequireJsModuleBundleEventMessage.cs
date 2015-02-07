using Ornament.Web.PortableAreas;
using Ornament.Web.SeajsModules;

namespace Ornament.Web.Messages
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