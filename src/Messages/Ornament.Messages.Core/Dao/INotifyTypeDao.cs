using System.Linq;
using Ornament.Messages.Newses;
using Ornament.Messages.Notification;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface INotifyTypeDao:IDao<string,NotifyType>
    {
        /// <summary>
        /// </summary>
        IQueryable<NotifyType> Types { get; }
        NotifyType GetByName(string name);
    }
}