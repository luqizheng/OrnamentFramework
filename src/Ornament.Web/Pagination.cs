using System;

namespace Ornament.Web
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
            TotalNumber = totalNumber;
        }

        /// <summary>
        ///     /
        /// </summary>
        public int TotalPage
        {
            get
            {
                int remarider;
                _totalPage = Math.DivRem(TotalNumber, PageSize, out remarider);
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
        public int TotalNumber { get; set; }

    }
}