using Ornament.Web.PortableAreas;
using Ornament.Web.SeajsModules;

namespace Ornament.Web.Messages
{
    public class SeajsModuleBundleEventMessage : IEventMessage
    {
        public SeajsModuleBundleEventMessage(SeajsEmbedBundle bundle)
        {
            Bundle = bundle;
        }

        public SeajsEmbedBundle Bundle { get; set; }
    }
}