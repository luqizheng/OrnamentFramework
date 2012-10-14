using Ornament.Messages.Contents;

namespace Ornament.Messages.Stores
{
    public class MemoryStore:Store
    {
        public MemoryStore()
        {
            this.Name = "Memory";
        }

    
        public override void Write(Content content, Message message)
        {
            
        }

        public override object ReadIn(Content content, Message message)
        {
            return content.Value;
        }

        public override void Delete(Content content, Message message)
        {
            
        }
    }
}
