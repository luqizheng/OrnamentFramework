using System.Collections.Generic;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;

namespace Ornament.Messages.Notification
{
    public interface ISender
    {
        string Name { get; set; }
        string Remarks { get; set; }

        void Send(IMemberShipDaoFactory memberShipDaoFactory, NotifyMessageTemplate template, IDictionary<string, string> variable, params User[] performers);
        void Send(IMemberShipDaoFactory memberShipDaoFactory, NotifyMessageTemplate template, CreateVariablesHandler dynamicCreateVariablesHandler,User[] user, IPerformer[] performers);
    }
}