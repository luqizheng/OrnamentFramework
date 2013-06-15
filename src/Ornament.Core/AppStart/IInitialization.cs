using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ornament.Contexts;

namespace Ornament.AppStart
{
    public interface IInitialization
    {
        void OnStart(OrnamentConfiguration config);
    }
}
