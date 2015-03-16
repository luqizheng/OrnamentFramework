using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace CombineJs.Modules.Modules
{
    internal class ContentAnalyzer
    {
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
            content = Regex.Replace(content, @"(?<=[^.]\s*(require|define)\s*\()\s*(['""]|(?'a'\[))[A-z0-9./ \""',]+?(?(a)\]|[""'])", match =>
            {
                string[] replcements = match.Groups[0].Value
                    .TrimStart('\"', '\'', '[')
                    .TrimEnd('\"', '\'', ']').Trim().Split(',');
                var output = new List<string>();
                foreach (string replacement in replcements)
                {
                    string srcRequireModualId = replacement.Trim('\"', '\'',' '); //.ToLower();
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


            return content;
        }


    }
}