using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ornament.Template.Emails
{
    /// <summary>
    /// Class EmailTemplate.
    /// </summary>
    public class EmailTemplate
    {
        /// <summary>
        /// Gets or sets the subject.
        /// </summary>
        /// <value>The subject.</value>
        public TemplateContent Subject { get; set; }

        /// <summary>
        /// Gets or sets the content.
        /// </summary>
        /// <value>The content.</value>
        public TemplateContent Content { get; set; }


    }

    public class SmsTemplate
    {
        public TemplateContent Content { get; set; }
    }
}
