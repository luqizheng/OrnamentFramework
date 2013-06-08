using System;
using Qi.Domain;

namespace Ornament.Messages.Contents
{
    public class Content
    {
        public string Subject { get; set; }

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