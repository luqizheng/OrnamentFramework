using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Qi.Domain;

namespace Ornament.Messages.Notification
{
    public enum CommunicationType
    {
        None,
        Client = 1,
        Email = 2,
        Sms = 4
    }

    public class NotifyType : DomainObject<NotifyType, string>
    {
        /// <summary>
        /// </summary>
        public virtual string Name { get; set; }

        /// <summary>
        /// </summary>
        public virtual string Remark { get; set; }

        /// <summary>
        /// </summary>
        public virtual CommunicationType CommunicationType { get; set; }
    }
}