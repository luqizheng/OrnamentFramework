using Ornament.MemberShip;
using Ornament.Messages.Dao;
using Ornament.Messages.PersonalMessages;

namespace Ornament.Models.Messages
{
    public class PersonalMessageModel
    {
        public string Content { get; set; }

        public void Create(IPersonalMessageDao dao, User publisher, User receiver)
        {
            var message = new PersonalMessage(publisher)
                {
                    Content = Content,
                    Receiver = receiver
                };
            dao.SaveOrUpdate(message);
        }
    }
}