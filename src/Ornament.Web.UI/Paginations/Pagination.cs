using System;

namespace Ornament.Web.UI.Paginations
{
    public class Pagination
    {
        private int _totalPage;

        public Pagination()
            : this(10, 0)
        {
        }

        public Pagination(int pageSize, int currentPage)
        {
            PageSize = pageSize;
            CurrentPage = currentPage;
        }

        public Pagination(int totalNumber)
        {
            TotalRows = totalNumber;
        }

        /// <summary>
        ///     /
        /// </summary>
        public int TotalPage
        {
            get
            {
                int remarider;
                _totalPage = Math.DivRem(TotalRows, PageSize, out remarider);
                if (remarider != 0)
                    _totalPage++;
                return _totalPage;
            }
        }

        public int ShowsNumberStart
        {
            get { return PageSize*CurrentPage; }
        }

        public int ShowNumberEnd
        {
            get { return ShowsNumberStart + PageSize; }
        }

        /// <summary>
        ///     Gets or sets
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// </summary>
        public int CurrentPage { get; set; }

        /// <summary>
        /// </summary>
        public int TotalRows { get; set; }
    }
}