using Ornament.Web.PortableAreas;
using Ornament.Web.SeajsModules;

namespace Ornament.Web.Messages
{
    public class RequireJsModuleBundleEventMessage : IEventMessage
    {
        public RequireJsModuleBundleEventMessage(SeajsEmbedBundle bundle)
        {
            Bundle = bundle;
        }

        public SeajsEmbedBundle Bundle { get; set; }
    }
}