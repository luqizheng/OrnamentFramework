using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ornament.AppStart
{
    public interface IInitialization
    {
        void OnStart(Context context);
    }
}
