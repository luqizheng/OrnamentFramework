namespace Ornament.Web.PortableAreas.InputBuilder.ViewEngine
{
    using Ornament.Web.PortableAreas;
    using System;
    using System.Diagnostics;
    using System.IO;
    using System.Web;
    using System.Web.Hosting;

    public class AssemblyResourceVirtualFile : VirtualFile
    {
        private readonly string path;
        private readonly AssemblyResourceStore resourceStore;

        public AssemblyResourceVirtualFile(string virtualPath, AssemblyResourceStore resourceStore)
            : base(virtualPath)
        {
            this.resourceStore = resourceStore;
            this.path = VirtualPathUtility.ToAppRelative(virtualPath);
        }

        public AssemblyResourceVirtualFile(string virtualPath, AssemblyResourceStore resourceStore, string embedVirtualPath)
            : base(virtualPath)
        {
            this.resourceStore = resourceStore;
            this.path = embedVirtualPath;
        }

        public override Stream Open()
        {
            Trace.WriteLine("Opening " + this.path);
            return this.resourceStore.GetResourceStream(this.path);
        }
    }
}

