using System.Globalization;
using Ornament.MemberShip;
using Qi.Domain;

namespace Ornament.Messages.Notification
{
    public abstract class Message : DomainObject<Message, string>
    {
        public virtual User User { get; set; }

        public virtual ReadStatus ReadStatus { get; set; }
        public abstract Content Show(string language);

        public virtual Content Show()
        {
            string lang = CultureInfo.CurrentUICulture.Name;
            return Show(lang);
        }
    }
}