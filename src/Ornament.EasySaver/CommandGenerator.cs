using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Ornament.EasySqlExecuter
{

    #region

    #endregion

    /// <summary>
    /// sql command.
    /// </summary>
    public abstract class CommandGenerator<T> where T : ExecuteItem
    {
        private readonly SqlExecuter _execute;

        protected CommandGenerator(SqlExecuter execute)
        {
            _execute = execute;
        }


        protected IDataParameter CreateParameter(string parameterName)
        {
            return _execute.CreateParameter(parameterName);
        }

        /// <summary>
        /// generate.
        /// </summary>
        /// <param name="executeItem">
        /// </param>
        /// <param name="dataParameters">
        /// </param>
        /// <returns>
        /// </returns>
        protected abstract StringBuilder Generate(T executeItem, out List<IDataParameter> dataParameters);

        /// <summary>
        /// check.
        /// </summary>
        /// <param name="executeItem">
        /// </param>
        public abstract void Check(ExecuteItem executeItem);

        /// <summary>
        /// execute.
        /// </summary>
        /// <param name="item">
        /// </param>
        public void Execute(T item)
        {
            List<IDataParameter> paramList;
            StringBuilder sql = Generate(item, out paramList);
            Execute(_execute, item, sql.ToString(), paramList);
        }

        /// <summary>
        /// execute.
        /// </summary>
        /// <param name="executeItem">
        /// </param>
        /// <param name="sql">
        /// </param>
        /// <param name="dataParameters">
        /// </param>
        /// <param name="valuesList">
        /// </param>
        protected abstract void Execute(SqlExecuter execute,
                                        T executeItem,
                                        string sql,
                                        List<IDataParameter> dataParameters
            );
    }
}