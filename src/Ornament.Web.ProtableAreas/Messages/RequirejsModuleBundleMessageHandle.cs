using System.Collections.Generic;
using System.Web.Optimization;
using Ornament.Web.PortableAreas;

namespace Ornament.Web.Messages
{
    public class RequirejsModuleBundleMessageHandle : MessageHandler<RequireJsModuleBundleEventMessage>
    {
        private static readonly Queue<RequireJsModuleBundleEventMessage> BundleHandlers = new Queue<RequireJsModuleBundleEventMessage>();

        public override void Handle(RequireJsModuleBundleEventMessage message)
        {
            BundleHandlers.Enqueue(message);
        }

        public static void HandlAllBundle()
        {
            while (BundleHandlers.Count != 0)
            {
                var bundle = BundleHandlers.Dequeue();
                BundleTable.Bundles.Add(bundle.Bundle);
            }
        }
    }

    
}