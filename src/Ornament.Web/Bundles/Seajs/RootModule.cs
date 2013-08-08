namespace Ornament.Web.Bundles.Seajs
{
    /// <summary>
    ///     Moudle
    /// </summary>
    public class RootModule : CombineModule
    {
        private readonly string _virtualPath;

        public RootModule(string filename, string virtualPath)
            : base(filename)
        {
            _virtualPath = virtualPath;
        }
        
        public string BuildContent(string content)
        {
            var modelets = new ModualIdSets();
            modelets.Add(new ReferenceModule(_virtualPath.TrimStart('~')));
            return base.BuildContent(content, modelets, new ModuleCollection());
        }
    }
}