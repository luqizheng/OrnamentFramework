using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Iesi.Collections.Generic;
using Ornament.Messages.Dao;
using Qi.Domain;

namespace Ornament.Messages
{
    [Serializable]
    public class MessageType : DomainObject<MessageType, string>
    {
        private Iesi.Collections.Generic.ISet<MessageType> _childs;
        //private IDictionary<string, Template> _templates;

        protected MessageType()
        {
        }

        public MessageType(string name)
        {
            Name = name;
        }

        /// <summary>
        /// 
        /// </summary>
        public virtual IInfoDao Info { get; set; }


        /// <summary>
        /// 信息分类
        /// </summary>
        public virtual string Name { get; set; }

        /// <summary>
        /// Gets or sets comment
        /// </summary>
        public virtual string Remark { get; set; }


        //private IDictionary<string, Template> Templates
        //{
        //    get { return _templates ?? (_templates = new Dictionary<string, Template>()); }
        //}

        /// <summary>
        /// 获取InfoType下面的信息
        /// </summary>
        protected Iesi.Collections.Generic.ISet<MessageType> Childs
        {
            get { return _childs ?? (_childs = new HashedSet<MessageType>()); }
        }

        public virtual string OrderId { get; protected set; }

        public virtual int Count
        {
            get { return Childs.Count; }
        }

        public virtual MessageType Parent { get; protected set; }

        public virtual ReadOnlyCollection<MessageType> GetChildTypes()
        {
            return new ReadOnlyCollection<MessageType>(new List<MessageType>(Childs));
        }

        //public virtual Template CreateTemplate(string name)
        //{
        //    return new Template(this) { Name = name };
        //}

        //public virtual Template CreateTemplate(string name, string templatePath)
        //{
        //    return new Template(this) { Name = name, Path = templatePath };
        //}

        public override string ToString()
        {
            return Name;
        }

        public override int GetHashCode()
        {
            return Name.GetHashCode();
        }

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="template"></param>
        ///// <exception cref="ArgumentNullException">tempalte is null</exception>
        //public virtual void AddTemplate(Template template)
        //{
        //    if (template == null) throw new ArgumentNullException("template");
        //    if (template.MessageType != this)
        //        throw new ArgumentNullException("template need to belong to this MessageType");
        //    Templates.Add(template.Name, template);
        //}

        /// <summary>
        /// 
        /// </summary>
        /// <param name="childMessageType"></param>
        public virtual void Add(MessageType childMessageType)
        {
            if (childMessageType == null)
                throw new ArgumentNullException("childMessageType");

            if (childMessageType.Parent != null)
            {
                throw new MessageTypeException("child messageType is belong to anohter messageType");
            }

            if (!String.IsNullOrEmpty(OrderId))
            {
                childMessageType.OrderId = OrderId + "." + Id;
            }
            else
            {
                childMessageType.OrderId = Id;
            }
            UpdateChildOrderId(childMessageType);
            Childs.Add(childMessageType);
        }

        public virtual void Remove(MessageType messageType)
        {
            if (messageType == null)
                throw new ArgumentNullException("messageType");
            messageType.Remove();
        }

        public virtual void Remove()
        {
            Parent.Childs.Remove(this);
            Parent = null;
        }

        private static void UpdateChildOrderId(MessageType parent)
        {
            foreach (MessageType info in parent.Childs)
            {
                if (!String.IsNullOrEmpty(parent.OrderId))
                {
                    info.OrderId = parent.OrderId + "." + parent.Id;
                }
                else
                {
                    info.OrderId = parent.Id;
                }
                if (info.Childs.Count > 0)
                {
                    UpdateChildOrderId(info);
                }
            }
        }

        //public virtual Template GetTemplate(string templateName)
        //{
        //    if (Templates.Count == 0)
        //        return new Template(this)
        //    {
        //        Name = "default"
        //    };
        //    return Templates[templateName];
        //}
    }
}