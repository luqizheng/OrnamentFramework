using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ornament.DataSetting.Core
{
    public class FixLength:ImportColumnSetting
    {
        public virtual int Start { get; set; }
        public virtual int End { get; set; }
    }
}
