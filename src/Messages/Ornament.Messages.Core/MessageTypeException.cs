using System;

namespace Ornament.Messages
{
    public class MessageTypeException : ApplicationException
    {
        public MessageTypeException(string message)
            : base(message)
        {
        }
    }
}