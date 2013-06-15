using System;
using Ornament.MemberShip;
using Qi.Domain;

namespace Ornament.Messages.Notification
{
    public class Reader : DomainObject<Reader, object[]>
    {
        protected Reader()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="reader"></param>
        /// <param name="notifyMessage"></param>
        public Reader(User reader, NotifyMessage notifyMessage)
        {
            if (reader == null)
                throw new ArgumentNullException("reader");
            if (notifyMessage == null)
                throw new ArgumentNullException("notifyMessage");

            // ReSharper disable DoNotCallOverridableMethodsInConstructor
            Member = reader;
            // ReSharper restore DoNotCallOverridableMethodsInConstructor
            // ReSharper disable DoNotCallOverridableMethodsInConstructor
            NotifyMessage = notifyMessage;
            // ReSharper restore DoNotCallOverridableMethodsInConstructor
        }

        /// <summary>
        /// </summary>
        public virtual User Member { get; set; }

        /// <summary>
        /// </summary>
        public virtual NotifyMessage NotifyMessage { get; set; }

        /// <summary>
        /// </summary>
        public virtual ReadStatus Status { get; set; }
     
     
    }
}