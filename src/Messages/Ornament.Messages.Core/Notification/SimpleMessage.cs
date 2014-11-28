using System;
using Ornament.MemberShip;
using Qi.Domain;

namespace Ornament.Messages.Notification
{
    public class SimpleMessage : DomainObject<SimpleMessage, string>
    {
        protected SimpleMessage()
        {
        }

        public SimpleMessage(User user)
        {
            User = user;
            CreateTime = DateTime.Now;
        }

        /// <summary>
        /// </summary>
        public virtual Content Content { get; set; }

        /// <summary>
        /// </summary>
        public virtual User User { get; protected set; }

        /// <summary>
        /// </summary>
        public virtual ReadStatus ReadStatus { get; set; }


        /// <summary>
        ///     Gets message create time;
        /// </summary>
        public virtual DateTime CreateTime { get; protected set; }
    }
}