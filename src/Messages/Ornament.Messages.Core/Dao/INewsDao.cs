using System.Collections.Generic;
using Ornament.Messages.Newses;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface INewsDao : IDao<string, News>
    {
        IList<News> GetNews(int pageIndex, int pageSize, NewsType type, out int total);
    }
}