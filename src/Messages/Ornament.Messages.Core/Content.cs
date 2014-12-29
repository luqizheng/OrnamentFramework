using System;
using System.Collections.Generic;
using Qi.Text;

namespace Ornament.Messages
{
    public class Content
    {
        public Content()
        {
        }

        public Content(string language)
        {
            if (language == null)
                throw new ArgumentNullException("language");
            Language = language;
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

        public string GetSubject(IDictionary<string, string> variables)
        {
            var helper = new NamedFormatterHelper();
            return helper.Replace(Subject, variables);
        }

        public String GetContent(IDictionary<string, string> dictionary)
        {
            var helper = new NamedFormatterHelper();
            return helper.Replace(Value, dictionary);
        }
    }
}