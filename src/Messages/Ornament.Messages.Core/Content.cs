using System;

namespace Ornament.Messages
{
    public class Content
    {
        protected Content()
        {
            
        }

        public Content(string language)
        {
            if (language == null) throw new ArgumentNullException("language");
            this.Language = language;
        }

        public virtual string Subject { get; set; }

        /// <summary>
        /// </summary>
        public virtual string Language { get; set; }
      
        public virtual string Value { get; set; }

        public override int GetHashCode()
        {
            return (Value).GetHashCode();
        }
    }
}