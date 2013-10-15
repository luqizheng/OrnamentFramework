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
        [DataMember(Name = "iTotalRecords")]
        public int TotalRecords { get; set; }

        [DataMember(Name = "iTotalDisplayRecords")]
        public int TotalDisplayRecords { get; set; }

        [DataMember(Name = "aaData")]
        public List<object> Datas { get; set; }
    }
}
