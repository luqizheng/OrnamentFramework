using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Ornament.EasySqlExecuter.ExecuteItems
{
    /// <summary>
    /// End
    /// </summary>
    public interface IExecuteItem
    {
        IExecuteItem Parent { get; }

        void Add(IExecuteItem childItem);

        int Count { get; }

        ReadOnlyCollection<IExecuteItem> GetAllChilds();

        int ExecuteOrder { get; set; }

        /// <summary>
        /// End this ExecuteItem setting.
        /// </summary>
        /// <returns>
        /// </returns>
        IExecuteItem End();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        IExecuteItem Execute();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        ExecuteBuilder Begin();
    }
}