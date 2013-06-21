using Qi.Domain;

namespace Ornament.Messages.Notification
{
    public enum CommunicationType
    {
        Client = 0,
        Email = 2,
        Sms = 4
    }

    public class NotifyType : DomainObject<NotifyType, string>
    {
        public virtual string Name { get; set; }
        public virtual string Remark { get; set; }
        public virtual CommunicationType CommunicationType { get; set; }
    }
}