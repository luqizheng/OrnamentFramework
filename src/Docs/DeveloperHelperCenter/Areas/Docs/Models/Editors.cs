using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace DeveloperHelperCenter.Areas.Docs.Models
{
    public class Editors
    {
        public Int32 Int32 { get; set; }
        public Int64 Int64 { get; set; }
        public string String { get; set; }
        public String RichHtml { get; set; }
        public Decimal Decimal { get; set; }
        public DateTime DateTime { get; set; }
        public DateTime Date { get; set; }
    }
}