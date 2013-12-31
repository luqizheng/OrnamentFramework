using System.Diagnostics;
using System.IO;
using System.Web;
using System.Web.Hosting;
using MvcContrib.UI.InputBuilder.ViewEngine;

namespace Ornament.Web.PortableAreas.InputBuilder.ViewEngine
{
    public class AssemblyResourceVirtualFile : VirtualFile
    {
        private readonly string path;
        private readonly AssemblyResourceStore resourceStore;

        public AssemblyResourceVirtualFile(string virtualPath, AssemblyResourceStore resourceStore,
            string embedVirtualPath)
            : base(virtualPath)
        {
            this.resourceStore = resourceStore;
            path = embedVirtualPath;
        }

        public AssemblyResourceVirtualFile(string virtualPath, AssemblyResourceStore resourceStore)
            : base(virtualPath)
        {
            this.resourceStore = resourceStore;
            path = VirtualPathUtility.ToAppRelative(virtualPath);
        }

        public override Stream Open()
        {
            Trace.WriteLine("Opening " + path);
            return resourceStore.GetResourceStream(path);
        }
    }
}