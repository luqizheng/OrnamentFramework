using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ornament.Messages.Notification;
using Ornament;
namespace Ornament.Retrives
{
    internal class NotifyTypeRetrive : Retrive<NotifyType, string>
    {
        public NotifyTypeRetrive(string name)
            : base(name)
        {

        }

        protected override NotifyType GetById(string id)
        {
            return OrnamentContext.DaoFactory.MessageDaoFactory.NotifyTypeDao.Get(id);

        }

        protected override NotifyType CreateInstance(string name)
        {
            return new NotifyType()
                {
                    CommunicationType = CommunicationType.Email,
                    Name = name
                };
        }

        protected override void SaveOrUpdate(NotifyType t)
        {
            OrnamentContext.DaoFactory.MessageDaoFactory.NotifyTypeDao.SaveOrUpdate(t);
        }
    }
}
