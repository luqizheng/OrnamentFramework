namespace Ornament.Messages.Notification
{
    public interface ISender
    {
        CommunicationType CommunicationType { get; }
        void Send(SimpleMessage notifyMessage);
    }
}