using System;
using Qi.Domain;

namespace Ornament.Messages
{
    [Serializable]
    public class MessageType : DomainObject<MessageType, string>
    {
        private string _orderId;
        private string _tempOrderId;
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
        /// </summary>
        /// <param name="name"></param>
        /// <param name="parent"></param>
        public MessageType(string name, MessageType parent)
            : this(name)
        {
            if (parent == null)
                throw new ArgumentNullException("parent");
            Parent = parent;
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
        public virtual string OrderId
        {
            get
            {
                if (IsTransient())
                {
                    if (Parent != null)
                    {
                        _tempOrderId = Parent.OrderId + "." + Guid.NewGuid().ToString("N");
                    }
                    else
                    {
                        _tempOrderId = Guid.NewGuid().ToString("N");
                    }
                    return _tempOrderId;
                }
                if (Parent != null)
                {
                    _orderId = Parent.OrderId + "." + Id;
                }
                else
                {
                    _orderId = Id;
                }
                return _orderId;
            }
            protected set { _orderId = value; }
        }

        /// <summary>
        /// </summary>
        public virtual MessageType Parent { get; protected set; }

        /// <summary>
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return Name;
        }
    }
}