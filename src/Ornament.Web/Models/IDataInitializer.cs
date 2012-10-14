namespace Ornament.Web.Models
{
    /// <summary>
    /// Initializer data of the database.
    /// </summary>
    public interface IDataInitializer
    {
        /// <summary>
        /// the name of this
        /// </summary>
        string Name { get; }

        /// <summary>
        /// Indeciate the 
        /// </summary>
        bool IsFirstApplicationStart { get; }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        void CreateData();
    }
}