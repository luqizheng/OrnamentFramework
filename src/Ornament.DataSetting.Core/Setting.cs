using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ornament.DataSetting.Core
{
    public class Setting
    {
        public virtual string Name { get; set; }
        public virtual int Skip { get; set; }
        public virtual string Split { get; set; }
        public virtual string Type { get; set; }
        public virtual IList<ImportColumnSetting> ColumnSettings { get; set; }
    }
}
