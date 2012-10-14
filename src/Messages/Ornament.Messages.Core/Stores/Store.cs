using Ornament.Messages.Contents;

namespace Ornament.Messages.Stores
{
    public abstract class Store
    {
        /// <summary>
        /// 
        /// </summary>
        public virtual string Name { get; internal protected set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="message"></param>
        public abstract void Write(Content content, Message message);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="message"></param>
        public abstract object ReadIn(Content content, Message message);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="message"></param>
        public abstract void Delete(Content content, Message message);
    }
}