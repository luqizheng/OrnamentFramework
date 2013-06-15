using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ornament.MemberShip;
using Qi.Domain;

namespace Ornament.Messages.Newses
{
    public class News : DomainObject<News, string>
    {
        public News()
        {

        }
        /// <summary>
        ///     Gets or sets the Message State.
        /// </summary>
        public virtual EditState State { get; set; }

        private IDictionary<string, Content> _contents;
        /// <summary>
        /// </summary>
        public virtual DateTime CreateTime { get; protected set; }
        public virtual string Subject { get; set; }
        /// <summary>
        ///     发布人
        /// </summary>
        public virtual User Publisher { get; protected set; }

        /// <summary>
        /// </summary>
        public virtual IDictionary<string, Content> Contents
        {
            get { return _contents ?? (_contents = new Dictionary<string, Content>()); }
        }

    }
}
