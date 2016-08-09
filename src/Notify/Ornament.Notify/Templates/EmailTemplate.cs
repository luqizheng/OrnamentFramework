using System;
using System.Collections.Generic;
using System.Net.Mail;
using Ornament.Template;

namespace Ornament.Notify.Templates
{
    /// <summary>
    ///     Class EmailTemplate.
    /// </summary>
    public class EmailTemplate
    {
        /// <summary>
        ///     Gets or sets the subject.
        /// </summary>
        /// <value>The subject.</value>
        public TemplateContent Subject { get; set; }

        /// <summary>
        ///     Gets or sets the content.
        /// </summary>
        /// <value>The content.</value>
        public TemplateContent Content { get; set; }

        /// <summary>
        ///     Gets or sets to.
        /// </summary>
        /// <value>To.</value>
        public TemplateContent To { get; set; }

        /// <summary>
        ///     Gets or sets from.
        /// </summary>
        /// <value>From.</value>
        public string From { get; set; }

        /// <summary>
        ///     Gets or sets a value indicating whether this instance is HTML body.
        /// </summary>
        /// <value><c>true</c> if this instance is HTML body; otherwise, <c>false</c>.</value>
        public bool IsHtmlBody { get; set; }

        /// <summary>
        ///     Creates the specified from.
        /// </summary>
        /// <param name="from">From.</param>
        /// <param name="variables">The variables.</param>
        /// <returns>MailMessage.</returns>
        /// <exception cref="ArgumentNullException">
        /// </exception>
        /// <exception cref="ArgumentOutOfRangeException">
        /// </exception>
        /// <exception cref="Ornament.Notify.Templates.CannotFindVariableException">
        ///     Can't find variable in input variables to
        ///     resolve EmailTemplate.To tempalte
        /// </exception>
        public MailMessage Create(string from, IDictionary<string, string> variables)
        {
            if (from == null) throw new ArgumentNullException(nameof(from));
            if (variables == null) throw new ArgumentNullException(nameof(variables));
            MailAddress toAddress, fromAddress;
            try
            {
                fromAddress = new MailAddress(from);
            }
            catch (FormatException)
            {
                throw new ArgumentOutOfRangeException(nameof(from), from + " is not a right format for email.");
            }
            var to = To.Build(variables);


            if (to == To.Content)
                throw new CannotFindVariableException(string.Join(",",
                        To.GetContentVariable().Keys),
                    "Can't find variable in input variables to resolve EmailTemplate.To tempalte");

            try
            {
                toAddress = new MailAddress(to);
            }
            catch (FormatException)
            {
                throw new ArgumentOutOfRangeException(nameof(variables),
                    To.Content + " is not a good format for email address.");
            }


            var content = Content.Build(variables);
            var subject = Subject.Build(variables);


            var result = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = content,
                IsBodyHtml = IsHtmlBody
            };

            return result;
        }
    }

    /// <summary>
    ///     Class TemplateException.
    /// </summary>
    /// <seealso cref="System.Exception" />
    public class TemplateException : Exception
    {
        /// <summary>
        ///     Initializes a new instance of the <see cref="TemplateException" /> class.
        /// </summary>
        /// <param name="message">The message that describes the error.</param>
        public TemplateException(string message)
            : base(message)
        {
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="TemplateException" /> class.
        /// </summary>
        public TemplateException()
        {
        }
    }

    /// <summary>
    ///     Class CannotFindVariableException.
    /// </summary>
    /// <seealso cref="Ornament.Notify.Templates.TemplateException" />
    public class CannotFindVariableException : TemplateException
    {
        /// <summary>
        ///     Initializes a new instance of the <see cref="CannotFindVariableException" /> class.
        /// </summary>
        /// <param name="variableName">Name of the variable.</param>
        public CannotFindVariableException(string variableName)
            : base("Can't find " + variableName + " in input variables.")
        {
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="CannotFindVariableException" /> class.
        /// </summary>
        /// <param name="variableName">Name of the variable.</param>
        /// <param name="message">The message.</param>
        public CannotFindVariableException(string variableName, string message)
            : base(message + ". Can't find " + variableName + " in input variables.")
        {
        }
    }
}