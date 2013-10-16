using System.Collections.Generic;

namespace Ornament.Web.Plugins.DataTables
{
    public class DataTablesPostData
    {
        private IList<Column> _columns;

        /// <summary>
        ///     没页显示多少个
        /// </summary>
        public int DisplayLength { get; set; }

        /// <summary>
        ///     开始page
        /// </summary>
        public int DisplayStart { get; set; }

        public string SearchContent { get; set; }

        /// <summary>
        ///     wtf?
        /// </summary>
        public bool Regex { get; set; }

        public IList<Column> Columns
        {
            get { return _columns ?? (_columns = new List<Column>()); }
        }
    }
}