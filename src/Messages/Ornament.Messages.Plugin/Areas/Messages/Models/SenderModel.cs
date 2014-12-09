using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Ornament.Messages.Notification.Senders;

namespace Ornament.Messages.Plugin.Areas.Messages.Models
{
    public class SenderModel
    {
        public SenderModel(Sender sender)
            : this()
        {
            this.Name = sender.Name;
            this.Remarks = sender.Remarks;
            var email = sender as EmailSender;
            if (email != null)
            {
                this.SenderType = "email";
                this.EmailSender = new EmailSenderModel(email);
            }
            else
            {
                this.SenderType = "client";
                this.ClientSender = new ClientSenderModel((ClientSender)sender);
            }

        }
        public virtual string SenderType { get; set; }
        public SenderModel()
        {
            this.EmailSender = new EmailSenderModel();
            this.ClientSender = new ClientSenderModel();
        }
        /// <summary>
        /// </summary>
        public virtual string Name { get; set; }

        /// <summary>
        /// </summary>
        public virtual string Remarks { get; set; }

        public EmailSenderModel EmailSender { get; set; }
        public ClientSenderModel ClientSender { get; set; }
    }
}