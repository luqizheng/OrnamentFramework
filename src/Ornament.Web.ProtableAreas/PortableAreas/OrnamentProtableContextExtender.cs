using Ornament.Contexts;

// ReSharper disable once CheckNamespace

namespace Ornament.Web
{
    public static class OrnamentProtableContextExtender
    {
        private static bool _combineSeajs;

        /// <summary>
        ///     是否启动Seajs压缩
        /// </summary>
        /// <param name="config"></param>
        /// <param name="combine"></param>
        public static void SetSeajsCombine(this OrnamentConfiguration config, bool combine)
        {
            _combineSeajs = combine;
        }

        /// <summary>
        ///     是否启动Seajs压缩
        /// </summary>
        /// <param name="config"></param>
        /// <returns></returns>
        public static bool GetSeajsCombine(this OrnamentConfiguration config)
        {
            return _combineSeajs;
        }
    }
}