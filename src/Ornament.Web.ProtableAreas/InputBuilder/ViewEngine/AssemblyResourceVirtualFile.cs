using System.Diagnostics;
using System.IO;
using System.Web;
using System.Web.Hosting;
using Ornament.Web.PortableAreas;

namespace Ornament.Web.InputBuilder.ViewEngine
{
    public class AssemblyResourceVirtualFile : VirtualFile
    {
        private readonly string path;
        private readonly AssemblyResourceStore resourceStore;


        public AssemblyResourceVirtualFile(string virtualPath, string embedPath, AssemblyResourceStore resourceStore)
            : base(virtualPath)
        {
            this.resourceStore = resourceStore;
            path = embedPath;
        }

        public override Stream Open()
        {
            Trace.WriteLine("Opening " + path);
            return resourceStore.GetResourceStream(path);
        }
    }
}