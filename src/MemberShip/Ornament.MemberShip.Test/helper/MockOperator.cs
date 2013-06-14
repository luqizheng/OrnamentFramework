using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MemberShip.Test.helper
{
    [Flags]
    public enum MockOperator
    {
        None = 0,
        A = 1,
        B = 2,
        C = 4,
        D = 8,
        E = 16,
        F = 32,
        AB = 3,
        ABC = 7,
        All = 69
    }
}
