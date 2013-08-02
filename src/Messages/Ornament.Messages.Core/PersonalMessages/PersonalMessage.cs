using System;
using Ornament.MemberShip;
using Qi.Domain;

namespace Ornament.Messages.PersonalMessages
{
    public class PersonalMessage : DomainObject<PersonalMessage, int>
    {
        protected PersonalMessage()
        {
        }

        public PersonalMessage(User publisher)
        {
            CreateTime = DateTime.Now;
            Publisher = publisher;
        }

        public virtual ReadStatus ReadStatus { get; set; }

        /// <summary>
        /// </summary>
        public virtual string Content { get; set; }

        /// <summary>
        /// </summary>
        public virtual DateTime CreateTime { get; set; }

        /// <summary>
        ///     接收人
        /// </summary>
        public virtual User Receiver { get; set; }

        /// <summary>
        ///     发布人
        /// </summary>
        public virtual User Publisher { get; protected set; }
        /// <summary>
        /// 删除标记。
        /// </summary>
        public virtual DeleteStatus DeleteStatus { get; set; }

    }
    public enum DeleteStatus
    {
        Publisher = 1, Receiver = 2
    }
}