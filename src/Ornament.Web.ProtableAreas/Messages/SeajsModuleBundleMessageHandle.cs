using System.Collections.Generic;
using System.Web.Optimization;
using Ornament.Web.PortableAreas;

namespace Ornament.Web.Messages
{
    public class SeajsModuleBundleMessageHandle : MessageHandler<SeajsModuleBundleEventMessage>
    {
        private static readonly Queue<SeajsModuleBundleEventMessage> BundleHandlers = new Queue<SeajsModuleBundleEventMessage>();

        public override void Handle(SeajsModuleBundleEventMessage message)
        {
            BundleHandlers.Enqueue(message);
        }

        public static void HandlAllBundle()
        {
            while (BundleHandlers.Count != 0)
            {
                var bundle = BundleHandlers.Dequeue();
                bundle.Bundle.Combine = OrnamentContext.Configuration.GetSeajsCombine();
                BundleTable.Bundles.Add(bundle.Bundle);
            }
        }
    }
}