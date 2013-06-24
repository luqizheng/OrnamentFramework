using Ornament.Messages.Notification;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface INotifyTypeDao:IDao<string,NotifyType>
    {
        NotifyType GetByName(string name);
    }
}