using System;
using System.IO;
using CombineJs.Modules;

namespace SeajsBundles.Seajs
{
    /// <summary>
    ///     所有Module根据Id 保存在这个模块中
    /// </summary>
    public class ModuleRepository
    {
        private readonly ModuleCollection _modules = new ModuleCollection();
        private readonly AbsloutePathModuleCollection _pathModule = new AbsloutePathModuleCollection();

        public void Add(ScriptModule module)
        {
            if (module == null)
                throw new ArgumentNullException("module");

            var combineModule = module as CombineModule;
            if (combineModule != null)
            {
                var fileInfo = new FileInfo(combineModule.AbsolutePath);
                string name = fileInfo.Name;
                string checkName = name;
                int index = 0;
                while (_modules.Contains(checkName))
                {
                    index++;
                    checkName = name + index;
                }
                combineModule.OutputId = checkName;
            }
            ////else
            ////{
            ////    module.OutputId = module.AbsolutePath.Trim('~');
            ////}
            _modules.Add(module);
            _pathModule.Add(module);
        }

        /// <summary>
        ///     根据Module获取Module的路径(物理路径或者引用路径)
        /// </summary>
        /// <param name="module"></param>
        /// <returns></returns>
        public string GetModualId(ScriptModule module)
        {
            if (module == null)
                throw new ArgumentNullException("module");
            return module.OutputId.TrimStart('~');
        }


        public bool Contains(ScriptModule module)
        {
            if (String.IsNullOrEmpty(module.AbsolutePath))
                throw new ArgumentNullException("module.AbsolutePath.");
            return _pathModule.Contains(module.AbsolutePath);
        }

        public ScriptModule GetByAbsolutePath(string absolutePath)
        {
            return _pathModule[absolutePath];
        }
    }
}