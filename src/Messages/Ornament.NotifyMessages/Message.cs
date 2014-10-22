using System;

namespace Ornament.NotifyMessages
{
    public class Message
    {
        public string To { get; set; }
        public string From { get; set; }
        public string Content { get; set; }
        public DateTime CreateTime { get; set; }
        public bool Read { get; set; }
        public DateTime ReadTime { get; set; }
        public string Id { get; set; }
        public Header Header { get; set; }
    }
}
