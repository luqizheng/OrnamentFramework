using System.Diagnostics;
using System.IO;
using System.Web;
using System.Web.Hosting;
using Ornament.Web.PortableAreas;

namespace Ornament.Web.InputBuilder.ViewEngine
{
    public class AssemblyResourceVirtualFile : VirtualFile
    {
        private readonly string _path;
        private readonly AssemblyResourceStore _resourceStore;

        public AssemblyResourceVirtualFile(string virtualPath, AssemblyResourceStore resourceStore)
            : base(virtualPath)
        {
            this._resourceStore = resourceStore;
            _path = VirtualPathUtility.ToAppRelative(virtualPath);
        }

        public AssemblyResourceVirtualFile(string virtualPath, AssemblyResourceStore resourceStore,
            string embedVirtualPath)
            : base(virtualPath)
        {
            this._resourceStore = resourceStore;
            _path = embedVirtualPath;
        }

        public override Stream Open()
        {
            Trace.WriteLine("Opening " + _path);
            return _resourceStore.GetResourceStream(_path);
        }
    }
}