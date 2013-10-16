using System;
using System.Collections.Generic;

namespace Ornament.Web.Plugins.DataTables
{
    [Serializable]
    public class DataTableResult
    {
        private List<object> _data;


        // ReSharper disable InconsistentNaming
        public int iTotalRecords { get; set; }

        // ReSharper restore InconsistentNaming


        // ReSharper disable InconsistentNaming
        public int iTotalDisplayRecords { get; set; }

        // ReSharper restore InconsistentNaming


        // ReSharper disable InconsistentNaming
        public List<object> aaData
            // ReSharper restore InconsistentNaming
        {
            get { return _data ?? (_data = new List<object>()); }
        }
    }

    public enum SortTag
    {
        asc,
        desc
    }
}