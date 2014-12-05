using System.Collections.Generic;
using Ornament.MemberShip;
using Ornament.MemberShip.Dao;

namespace Ornament.Messages.Notification
{
    public interface ISender 
    {
        string Name { get; set; }
        string Remarks { get; set; }
        void Send(NotifyMessageTemplate template, IMemberShipFactory memberShipFactory, IDictionary<string, string> variable, IPerformer[] performers);
        void Send(NotifyMessageTemplate template, IDictionary<string, string> variable, User[] performers);
    }
}