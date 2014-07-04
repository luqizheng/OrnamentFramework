using System;

namespace Ornament.Messages
{
    [Flags]
    public enum MessageOperator
    {
        None = 0,
        Read = 1,
        Add = 3,
        Edit = 4 | 1,
        Delete = 8 | 1 | 4,
    }

   
}