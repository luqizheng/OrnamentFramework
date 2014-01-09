namespace Ornament.Web.Plugins.DataTables
{
    public class Column
    {
        /// <summary>
        ///     bRegex_x
        /// </summary>
        public bool Regex { get; set; }

        /// <summary>
        ///     Mapping for bSearchable_X
        /// </summary>
        public bool Searchable { get; set; }

        /// <summary>
        ///     Mapping for bSortTable_x;
        /// </summary>
        public bool Sortable { get; set; }

        /// <summary>
        /// </summary>
        public bool Sorted { get; set; }

        /// <summary>
        ///     Mapping for sSortDir_X
        /// </summary>
        public SortTag SortTag { get; set; }

        /// <summary>
        ///     Mapping for sSearch_X
        /// </summary>
        public string SearchContent { get; set; }
    }
}