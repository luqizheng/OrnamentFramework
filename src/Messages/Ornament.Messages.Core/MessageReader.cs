using System;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Qi.Domain;

namespace Ornament.Messages
{
    /// <summary>
    /// 
    /// </summary>
    public class MessageReader : DomainObject<MessageReader,string>
    {
        protected MessageReader()
        {
        }

        public MessageReader(IPerformer reader)
        {
            if (reader == null)
            {
                throw new ArgumentNullException("reader");
            }
            Reader = reader;
        }

        /// <summary>
        /// 
        /// </summary>
        public virtual Message Message { get; set; }

        /// <summary>
        /// Gets or sets MessageReader
        /// </summary>
        public virtual IPerformer Reader { get; protected set; }


        public override int GetHashCode()
        {
            return (Message.GetHashCode() + Reader.GetHashCode());
        }
    }
}