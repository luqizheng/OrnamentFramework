using System;

namespace Ornament
{
    [Serializable]
    public class OrnamentException : ApplicationException
    {
        public OrnamentException()
        {
        }

        public OrnamentException(string message)
            : base(message)
        {
        }

        public OrnamentException(string message, Exception ex)
            : base(message, ex)
        {
        }
    }
}