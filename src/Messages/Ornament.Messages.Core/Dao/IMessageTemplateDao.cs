using Ornament.Messages.Notification;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface IMessageTemplateDao : IDao<string, MessageTemplate>
    {

        MessageTemplate GetByName(string name);


    }
}