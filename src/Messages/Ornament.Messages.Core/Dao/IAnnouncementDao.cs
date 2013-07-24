using System.Collections.Generic;
using Ornament.Messages.Notification;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface IAnnouncementDao : IDao<string, Announcement>
    {
        IList<Announcement> GetAll(int pageIndex, int pageSize, out int total);
    }
}