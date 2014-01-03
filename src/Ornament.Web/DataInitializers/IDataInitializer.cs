using Ornament.Web.PortableAreas;

namespace Ornament.Web.DataInitializers
{
    /// <summary>
    /// Initializer data of the database.
    /// </summary>
    public interface IDataInitializer : IEventMessage
    {
        /// <summary>
        /// the name of this
        /// </summary>
        string Name { get; }

        /// <summary>
        /// Indeciate the 
        /// </summary>
        bool IsNeedInitialize { get; }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        void CreateData();
    }
}