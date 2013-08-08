using System.IO;

namespace Ornament.Web.Bundles.Seajs
{
    public class BaseModule
    {
        public BaseModule(string moduleId)
        {
            UniqueId = moduleId;

        }

        /// <summary>
        ///     最终Id
        /// </summary>
        public string UniqueId { get; set; }

    }
}