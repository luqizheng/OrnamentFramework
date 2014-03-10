﻿using System;
using Ornament.Web.DataInitializers;
using Ornament.Web.PortableAreas;

namespace Ornament.Web.MessageHandlers
{
    public class DataInitialateMessageHandler : MessageHandler<IDataInitializer>
    {
        public override void Handle(IDataInitializer message)
        {
            GlobalInitializer.DataInitializers.Add(message);
        }

        public override bool CanHandle(Type type)
        {
            bool r = base.CanHandle(type);
            if (r)
                return r;
            foreach (Type a in type.GetInterfaces())
            {
                if (a == typeof (IDataInitializer))
                    return true;
            }
            return type.BaseType == type;
        }
    }
}