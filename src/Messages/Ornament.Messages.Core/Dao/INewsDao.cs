using System.Collections.Generic;
using System.Linq;
using Ornament.Messages.Newses;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface INewsDao : IDao<string, News>
    {
        IQueryable<News> Newses { get; }

        /// <summary>
        /// </summary>
        /// <param name="pageIndex">page index, start from 0</param>
        /// <param name="pageSize"></param>
        /// <param name="type"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        /// <exception cref="System.ArgumentOutOfRangeException">pageIndex or pageSize less than zero</exception>
        IList<News> GetNews(int pageIndex, int pageSize, NewsType type, out int total);

        /// <summary>
        ///     Count Message
        /// </summary>
        /// <param name="type"></param>
        int CountMessage(NewsType type);
    }
}