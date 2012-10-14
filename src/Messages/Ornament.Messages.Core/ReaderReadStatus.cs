using System;
using Ornament.MemberShip;
using Qi.Domain;

namespace Ornament.Messages
{
    public class ReaderReadStatus:DomainObject<ReaderReadStatus,object[]>
    {
        protected ReaderReadStatus()
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="reader"></param>
        /// <param name="message"></param>
        public ReaderReadStatus(User reader, Message message)
        {
            if (reader == null)
                throw new ArgumentNullException("reader");
            if (message == null)
                throw new ArgumentNullException("message");

            // ReSharper disable DoNotCallOverridableMethodsInConstructor
            Reader = reader;
            // ReSharper restore DoNotCallOverridableMethodsInConstructor
            // ReSharper disable DoNotCallOverridableMethodsInConstructor
            Message = message;
            // ReSharper restore DoNotCallOverridableMethodsInConstructor
        }

        public virtual User Reader { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public virtual Message Message { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public virtual ReadStatus Status { get; set; }

        public override bool Equals(object obj)
        {
            return obj.GetHashCode() == GetHashCode();
        }

        public override int GetHashCode()
        {
            return (Message.Id + Reader.LoginId + Reader.Id).GetHashCode();
        }
    }
}