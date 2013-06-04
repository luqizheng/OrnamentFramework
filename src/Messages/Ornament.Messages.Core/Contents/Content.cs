using System;
using Qi.Domain;

namespace Ornament.Messages.Contents
{
    public class Content : DomainObject<Content, Guid>
    {
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