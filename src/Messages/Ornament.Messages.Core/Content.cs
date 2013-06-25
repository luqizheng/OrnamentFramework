using System;
using System.Web.Mvc;

namespace Ornament.Messages
{
    public class Content
    {
        public Content()
        {
        }

        public Content(string language)
        {
            if (language == null) throw new ArgumentNullException("language");
            Language = language;
        }

        public virtual string Subject { get; set; }

        /// <summary>
        /// </summary>
        public virtual string Language { get; set; }

        [AllowHtml]
        public virtual string Value { get; set; }

        public override int GetHashCode()
        {
            return (Value).GetHashCode();
        }
    }
}