namespace Ornament.Messages.Notification
{
    public enum NotifyTemplateOperator
    {
        None,
        Read = 1,
        Modify = 2 | Read,
        Delete = 4 | Modify,
    }
}