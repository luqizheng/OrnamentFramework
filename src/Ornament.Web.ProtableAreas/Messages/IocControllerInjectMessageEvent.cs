﻿using System;
using System.Collections.Generic;
using Ornament.Web.PortableAreas;

namespace Ornament.Web.Messages
{
    public class IocControllerInjectMessageEvent : IEventMessage
    {
        public IocControllerInjectMessageEvent(IEnumerable<Type> controllers, IEnumerable<Type> apiControllers)
        {
            Controllers = controllers;
            ApiControllers = apiControllers;
        }

        public IEnumerable<Type> Controllers { get; set; }
        public IEnumerable<Type> ApiControllers { get; set; }
    }
}