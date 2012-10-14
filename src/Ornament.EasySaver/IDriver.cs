// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IDriver.cs" company="">
//   
// </copyright>
// <summary>
//   i drivers.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Data;

namespace Ornament.EasySqlExecuter
{
    #region

    

    #endregion

    /// <summary>
    /// i drivers.
    /// </summary>
    public interface IDriver
    {
        /// <summary>
        /// Gets Transcation.
        /// </summary>
        IDbTransaction Transcation { get; }

        IDbConnection Connection { get; }
        DatabaseType DataBaseType { get; }

        /// <summary>
        /// open.
        /// </summary>
        /// <returns>
        /// The open.
        /// </returns>
        bool Open();

        /// <summary>
        /// close.
        /// </summary>
        /// <returns>
        /// The close.
        /// </returns>
        bool Close(bool hasError);

        /// <summary>
        /// create command.
        /// </summary>
        /// <param name="sql">
        /// The sql.
        /// </param>
        /// <returns>
        /// </returns>
        IDbCommand CreateCommand(string sql);

        /// <summary>
        /// create parameter.
        /// </summary>
        /// <param name="name">
        /// The name.
        /// </param>
        /// <returns>
        /// </returns>
        IDbDataParameter CreateParameter(string name);
    }
}