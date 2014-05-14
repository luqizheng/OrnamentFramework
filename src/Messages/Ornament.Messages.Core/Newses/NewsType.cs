using System;
using Qi.Domain;

namespace Ornament.Messages.Newses
{
    [Serializable]
    public class NewsType : DomainObject<NewsType, string>
    {

        protected NewsType()
        {
        }

        /// <summary>
        /// </summary>
        /// <param name="name"></param>
        public NewsType(string name)
        {
            if (name == null) throw new ArgumentNullException("name");
            Name = name.Trim();
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