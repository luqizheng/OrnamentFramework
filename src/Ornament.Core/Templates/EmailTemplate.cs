using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Xml.Serialization;
using Qi.Text;

namespace Ornament.Templates
{
    [XmlRoot("EmailTemplate")]
    public class EmailTemplate
    {
        [XmlElement("Subject")]
        public string Subject { get; set; }

        [XmlElement("Content")]
        public string Content { get; set; }
        
        [XmlIgnore]
        public string FilePath { get; set; }

        /// <summary>
        /// </summary>
        /// <param name="from"></param>
        /// <param name="to"></param>
        /// <param name="templateVariable"></param>
        /// <returns></returns>
        public MailMessage CreateEmail(string from, string to, IDictionary<string, string> templateVariable)
        {
            if (string.IsNullOrEmpty(@from))
                throw new ArgumentNullException("from");
            if (to == null)
                throw new ArgumentNullException("to");
            if (templateVariable == null)
                throw new ArgumentNullException("templateVariable");
            var helper = new NamedFormatterHelper();
            string body = helper.Replace(Content, templateVariable);

            var result = new MailMessage(from, to, Subject, body);
            return result;
        }
    }
}