using Ornament.Messages.Dao;
using Ornament.Messages.Notification.Senders;

namespace Ornament.Messages.Plugin.Areas.Messages.Models
{
    public class SenderModel
    {
        public SenderModel(Sender sender)
            : this()
        {
            Name = sender.Name;
            Remarks = sender.Remarks;
            var email = sender as EmailSender;
            if (email != null)
            {
                SenderType = "email";
                EmailSender = new EmailSenderModel(email);
            }
            else
            {
                SenderType = "client";
                ClientSender = new ClientSenderModel((ClientSender) sender);
            }
            Id = sender.Id;
        }

        public SenderModel()
        {
            EmailSender = new EmailSenderModel();
            ClientSender = new ClientSenderModel();
        }

        /// <summary>
        /// </summary>
        public int? Id { get; set; }

        /// <summary>
        /// </summary>
        public virtual string SenderType { get; set; }

        /// <summary>
        /// </summary>
        public virtual string Name { get; set; }

        /// <summary>
        /// </summary>
        public virtual string Remarks { get; set; }

        /// <summary>
        /// </summary>
        public EmailSenderModel EmailSender { get; set; }

        /// <summary>
        /// </summary>
        public ClientSenderModel ClientSender { get; set; }

        public Sender Save(IMessageDaoFactory daoFactory)
        {
            Sender sender;
            if (Id == null) //新增模式
            {
                switch (SenderType)
                {
                    case "email":
                        sender = EmailSender.CreateSender(Id, daoFactory);
                        break;
                    case "client":
                        sender = ClientSender.CreateSender(Id, daoFactory);
                        break;
                    default:
                        throw new NotifySenderException(SenderType + " is not defined");
                }
            }
            else
            {
                sender = EmailSender.Modify(Id, daoFactory) ?? ClientSender.Modify(Id, daoFactory);
            }

            sender.Name = Name;
            sender.Remarks = Remarks;

            daoFactory.NotifySenderDao.SaveOrUpdate(sender);

            return sender;
        }
    }
}