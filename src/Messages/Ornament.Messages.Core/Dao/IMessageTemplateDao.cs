using System.Collections.Generic;
using Ornament.Messages.Notification;
using Qi.Domain;

namespace Ornament.Messages.Dao
{
    /// <summary>
    /// Message Tempalte Data Access Object.
    /// </summary>
    public interface IMessageTemplateDao : IDao<string, NotifyMessageTemplate>
    {
        /// <summary>
        ///     Get Mesage Template from name
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        NotifyMessageTemplate GetByName(string name);

        /// <summary>
        ///     Get MessageTemplate.
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        IList<NotifyMessageTemplate> GetAll(int pageIndex, int pageSize, out int total);
    }
}