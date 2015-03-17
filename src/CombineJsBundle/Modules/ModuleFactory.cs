using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.Optimization;
using CombineJs.Readers;

namespace CombineJs.Modules
{
    public class ModuleFactory
    {
        private static readonly IList<ICombineModuleReader> List = new List<ICombineModuleReader>();
        private readonly ModuleRepository _moduleRepository;
        private ModuleCollection _referenceModules;

        static ModuleFactory()
        {
            List.Add(new FileCombineModuleReader());
        }

        public ModuleFactory(BundleContext context, bool combine)
        {
            Context = context;
            Combine = combine;
            _moduleRepository = new ModuleRepository();
        }

        internal ModuleRepository Repository
        {
            get { return _moduleRepository; }
        }

        public BundleContext Context { get; set; }
        public bool Combine { get; set; }

        /// <summary>
        ///     必须为 reference module 的 module,保存在这里的module会自动跳过过
        /// </summary>
        public ModuleCollection ReferenceModules
        {
            get { return _referenceModules ?? (_referenceModules = new ModuleCollection()); }
        }

        /// <summary>
        /// </summary>
        /// <param name="context"></param>
        /// <param name="combine"></param>
        /// <returns></returns>
        public static ModuleFactory Create(BundleContext context, bool combine)
        {
            if (context == null) throw new ArgumentNullException("context");
            return new ModuleFactory(context, combine);
        }

        /// <summary>
        /// </summary>
        /// <param name="facotry"></param>
        /// <param name="index">0 is the best</param>
        public static void Add(ICombineModuleReader facotry, int index)
        {
            if (facotry == null)
                throw new ArgumentNullException("facotry");
            List.Insert(index, facotry);
        }

        public string Build(string path, string content)
        {
            if (Combine)
            {
                var script = new ScriptModule(path) { AbsolutePath = path, OutputId = path };

                string main = CreateContent(this, content, script);
                //main = Regex.Replace(main, @"[^.]\s*define\s*\(\s*",
                //    delegate(Match s)
                //    {
                //        return string.Format("{0}'{1}',", s.Value, "_main_");
                //    });
                var result = new StringBuilder(main);
                Repository.Mergn(result);
                return result.ToString();
            }
            return content;
        }

        /// <summary>
        /// </summary>
        /// <param name="refereId"></param>
        /// <param name="parentModule"></param>
        /// <returns></returns>
        internal ScriptModule Create(string refereId, ScriptModule parentModule)
        {
            if (refereId.Contains("/") || refereId.EndsWith(".js"))
            {
                //string abstrVirtualPath = ToAbstrVirtualPath(refereId, parentModule.AbsolutePath);

                foreach (ICombineModuleReader item in List)
                {
                    CombineModule mouModule;
                    if (item.Build(refereId, this, parentModule, out mouModule))
                    {
                        return mouModule;
                    }
                }
            }
            return null;
        }

        /// <summary>
        /// </summary>
        /// <param name="factory"></param>
        /// <param name="content"></param>
        /// <param name="script"></param>
        /// <returns>sub r</returns>
        public static string CreateContent(ModuleFactory factory, string content, ScriptModule script)
        {
            //收集所有的Requier，如果属于_combinePath的那么就自动合并。并且重新设置引用

            //var result = new List<CombineModule>();
            //source (?<=[^.]\s*(require|define)\s*\()\s*(['"]|(?'a'\[))[A-z0-9./ \"',]+?(?(a)\]|["'])
            return Regex.Replace(content,
                @"(?<=[^.]\s*(require|define)\s*\()\s*(['""]|(?'a'\[))[A-z0-9./ \""',]+?(?(a)\]|[""'])", match =>
                {
                    string[] replcements = match.Groups[0].Value
                        .TrimStart('\"', '\'', '[')
                        .TrimEnd('\"', '\'', ']').Trim().Split(',');
                    var output = new List<string>();
                    foreach (string replacement in replcements)
                    {
                        string srcRequireModualId = replacement.Trim('\"', '\'', ' '); //.ToLower();
                        ScriptModule modual = factory.Create(srcRequireModualId, script);
                        if (modual == null)
                        {
                            output.Add("'" + srcRequireModualId + "'");
                            continue;
                        }
                        if (!factory.Repository.Contains(modual))
                        {
                            factory.Repository.Add(modual);
                        }
                        output.Add("'" + modual.OutputId + "'");
                    }
                    string outputString = String.Join(",", output.ToArray());
                    string reformat = string.Format("[{0}]", outputString);
                    return match.ToString().Replace(match.Groups[0].Value, reformat);
                });
        }
    }
}