using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Threading.Tasks;
using Ornament.Notify.Senders;
using Ornament.Notify.Templates;

namespace Ornament.Notify
{
    /// <summary>
    ///     Class EmailNotify.
    /// </summary>
    public class EmailNotify
    {
        public EmailNotify(EmailSender sender)
        {
            Sender = sender;
        }

        /// <summary>
        ///     Gets or sets the sender.
        /// </summary>
        /// <value>The sender.</value>
        public EmailSender Sender { get; set; }

        /// <summary>
        ///     Sends the email.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <param name="variables">The variables.</param>
        /// <returns>Task.</returns>
        /// <exception cref="ArgumentNullException">
        /// </exception>
        public Task[] SendAsync(EmailTemplate template, IEnumerable<IDictionary<string, string>> variables)
        {
            if (template == null) throw new ArgumentNullException(nameof(template));
            if (variables == null) throw new ArgumentNullException(nameof(variables));

            var queue = new Queue<MailMessage>();
            foreach (var variable in variables)
                queue.Enqueue(template.Create(this.Sender.FromEmail, variable));

            var result = new List<Task>();
            while (queue.Count != 0)
                result.Add(Sender.Send(queue.Dequeue()));
            return result.ToArray();
        }

        public Task SendAsync(string to, string subject, string content)
        {
            var mailMessage = new MailMessage(Sender.FromEmail, to, subject, content);
            return Sender.Send(mailMessage);
        }
    }
}