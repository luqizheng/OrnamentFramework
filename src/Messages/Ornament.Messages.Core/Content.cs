namespace Ornament.Messages
{
    public class Content
    {
        public virtual string Subject { get; set; }

        /// <summary>
        /// </summary>
        public virtual string Language { get; set; }

        public virtual string Value { get; set; }

        public override int GetHashCode()
        {
            return (Value).GetHashCode();
        }
    }
}