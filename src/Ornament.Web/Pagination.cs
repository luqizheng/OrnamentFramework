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
        public void SetTotalPage(int rowNumber)
        {
            int remarider;
            TotalPage = Math.DivRem(rowNumber, PageSize, out remarider);
            if (remarider != 0)
                TotalPage++;
        }
        /// <summary>
        /// /
        /// </summary>
        public int TotalPage { get; set; }
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
        public int ActualNumber { get; set; }
    }
}