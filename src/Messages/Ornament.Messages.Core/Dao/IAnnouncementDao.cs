using System.Collections.Generic;
using Ornament.MemberShip;
using Ornament.Messages.Notification;
using Ornament.Messages.Notification.Contents;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface IAnnouncementDao : IDao<string, Announcement>
    {
        IList<Announcement> GetAll(int pageIndex, int pageSize, out int total);

        IList<AnnouncementMessage> GetByUser(User user, int pageIndex, int pageSize);
    }
}