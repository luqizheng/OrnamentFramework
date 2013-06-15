using System;
using Qi.Domain;

namespace Ornament.Messages
{
    [Serializable]
    public class MessageType : DomainObject<MessageType, string>
    {
    
        protected MessageType()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="name"></param>
        public MessageType(string name)
        {
            Name = name;
        }


        /// <summary>
        ///     信息分类
        /// </summary>
        public virtual string Name { get; set; }

        /// <summary>
        ///     Gets or sets comment
        /// </summary>
        public virtual string Remark { get; set; }


        /// <summary>
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return Name;
        }
    }
}