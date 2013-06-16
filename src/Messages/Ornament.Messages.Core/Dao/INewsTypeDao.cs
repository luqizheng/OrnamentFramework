using System.Collections.Generic;
using System.Linq;
using Ornament.Messages.Newses;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface INewsTypeDao : IDao<string, NewsType>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        NewsType GetByName(string name);
        /// <summary>
        /// 
        /// </summary>
        IQueryable<NewsType> MessageTypes { get; }
    }
}