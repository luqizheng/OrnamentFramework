using System.Linq;
using Ornament.Messages.Newses;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    public interface INewsTypeDao : IDao<string, NewsType>
    {
        /// <summary>
        /// </summary>
        IQueryable<NewsType> MessageTypes { get; }

        /// <summary>
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        NewsType GetByName(string name);

        System.Collections.Generic.IDictionary<NewsType, int> GetStatmemnt();
    }
}