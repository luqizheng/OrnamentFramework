using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Ornament.Web.Plugins.Datables
{
    [System.Serializable]
    public class DataTableResult
    {
        [DataMember]
        public int PageIndex { get; set; }
    }
}
