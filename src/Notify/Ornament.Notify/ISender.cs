namespace Ornament.Notify
{
    public interface ISender
    {
        void Send(string content,params object[] sendingParameters);
    }
}
