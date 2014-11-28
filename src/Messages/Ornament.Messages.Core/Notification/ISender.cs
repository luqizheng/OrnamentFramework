using Ornament.MemberShip;
using Ornament.MemberShip.Dao;
using Ornament.Messages.Dao;

namespace Ornament.Messages.Notification
{
    public interface ISender
    {
        string Name { get; set; }
        string Remarks { get; set; }
        IMemberShipFactory MemberShipFactory { get; set; }
        IMessageDaoFactory MessageDaoFactory { get; set; }


        void Send(NotifyMessageTemplate template, IPerformer[] performers);
    }
}