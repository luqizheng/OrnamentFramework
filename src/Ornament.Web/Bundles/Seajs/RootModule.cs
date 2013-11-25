using System;
using System.Web.Optimization;

namespace Ornament.Web.Bundles.Seajs
{
    /// <summary>
    ///     Moudle
    /// </summary>
    public class RootModule : CombineModual
    {
        public RootModule(string uniqureId, BundleContext context, bool isCombine)
            : base(uniqureId, context, isCombine)
        {

        }


        //protected override StringBuilder RebuildDefinedHeader(string content, ModualIdSets moduleIdList)
        //{
        //    //对于root module来说，并不需要重新整理过define 这个function的内容，因此直接返回。
        //    return new StringBuilder(content);
        //}

        //protected override string GetOutputModuleId(ModualIdSets moduleIdList)
        //{
        //    return VirtualPathUtility.ToAbsolute(VirtualPath);
        //}

        //protected ISeajsModule GetModual(string srcRequireModualId, ModualIdSets moduleIdSets,
        //                                             ModuleCollection globalReferenceModules, out bool combinedHere)
        //{
        //    ISeajsModule result = base.GetModual(srcRequireModualId, moduleIdSets, globalReferenceModules,
        //                                            out combinedHere);
        //    if (combinedHere)
        //        combinedHere = Combine;
        //    return result;
        //}
        public override string Content
        {
            get { throw new NotImplementedException(); }
        }

        public string BuildContent(string content)
        {
            var collection = new ModuleCollection();
            collection.Add(this);
            var modelets = new ModualIdSets();
            modelets.Add(this);
            return base.BuildContent(content, modelets, collection);
        }
    }
}