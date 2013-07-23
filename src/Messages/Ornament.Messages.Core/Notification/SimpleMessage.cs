namespace Ornament.Messages.Notification
{
    public class SimpleMessage : Message
    {
        public virtual Content Content { get; set; }

        public override Content Show(string language)
        {
            return Content;
        }
    }
}