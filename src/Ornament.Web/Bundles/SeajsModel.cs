namespace Ornament.Web.Bundles
{
    public class SeajsModel
    {
        private readonly string _virtualPath;

        public SeajsModel(string virtualPath)
        {
            _virtualPath = virtualPath;
        }

        /// <summary>
        ///     物理路径
        /// </summary>
        public string PhyPath { get; set; }

        /// <summary>
        /// 是否合并。
        /// </summary>
        public bool IsCombine { get; set; }
    }
}