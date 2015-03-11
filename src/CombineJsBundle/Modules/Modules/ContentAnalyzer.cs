using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CombineJs.Modules.Modules
{
    internal class ContentAnalyzer
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="factory"></param>
        /// <param name="content"></param>
        /// <param name="script"></param>
        /// <returns>sub r</returns>
        public static string CreateContent(ModuleFactory factory, string content,ScriptModule script)
        {
            //收集所有的Requier，如果属于_combinePath的那么就自动合并。并且重新设置引用


            var result = new List<CombineModule>();

            content = Regex.Replace(content, @"require\(\[*([\'\""\\.\/A-z0-9]+?)\]*[\),]", match =>
            {
                string[] replcements = match.Groups[1].Value
                    .TrimStart('\"', '\'', '[')
                    .TrimEnd('\"', '\'', ']').Split(',');
                var output = new List<string>();
                foreach (string replacement in replcements)
                {
                    string srcRequireModualId = replacement; //.ToLower();
                    ScriptModule modual =factory.Create(srcRequireModualId,);
                    if (!SubModules.Contains(modual))
                    {
                        SubModules.Add(modual);
                    }
                    var combineModule = modual as CombineModule;
                    if (combineModule != null)
                    {
                        result.Add(combineModule);
                    }
                    output.Add("'" + modual.OutputId + "'");
                }
                string outputString = String.Join(",", output.ToArray());
                string reformat = string.Format("{0}", outputString);
                return match.ToString().Replace(match.Groups[1].Value, reformat);
            });


            return result;
        }
    }
}
