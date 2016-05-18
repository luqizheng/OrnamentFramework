using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ornament.Domain.Uow
{
    public class UowExcepton : Exception
    {
        public UowExcepton(string message) : base(message)
        {
        }
    }
}