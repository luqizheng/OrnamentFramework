using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ornament.DataSetting.Core
{
    public class ImportColumnAttribute : Attribute
    {
        public string Name { get; set; }
        public string ResourceName { get; set; }
        public Type ResourceType { get; set; }


        public ImportColumnAttribute(string name)
        {
            this.Name = name;
        }
    }



}
