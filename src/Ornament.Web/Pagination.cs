using System;

namespace Ornament.Web
{
    public class Pagination
    {
        public Pagination()
            : this(10, 0)
        {

        }
        public Pagination(int pageSize, int currentPage)
        {
            PageSize = pageSize;
            CurrentPage = currentPage;
        }
        public void SetTotalPage(int totalNumber)
        {
            this.TotalNumber = totalNumber;

        }

        private int _totalPage;
        /// <summary>
        /// /
        /// </summary>
        public int TotalPage
        {
            get
            {
                int remarider;
                _totalPage = Math.DivRem(this.TotalNumber, PageSize, out remarider);
                if (remarider != 0)
                    _totalPage++;
                return _totalPage;
            }
        }
        /// <summary>
        /// Gets or sets
        /// </summary>
        public int PageSize { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int CurrentPage { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int TotalNumber { get; set; }
    }
}