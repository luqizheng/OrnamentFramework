using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Optimization;
using System.Windows.Forms;

namespace Ornament.Web.Bundles.Seajs
{
    /// <summary>
    /// 所有Module根据Id 保存在这个模块中
    /// </summary>
    public class ModualIdSets
    {
        private readonly Dictionary<string, string> _moduleIdUniquireId = new Dictionary<string, string>();
        private readonly Dictionary<string, string> _uniquireIdModuleId = new Dictionary<string, string>();
        private readonly ModuleCollection _modules = new ModuleCollection();
        /// <summary>
        /// 根据Module获取Module的路径(物理路径或者引用路径)
        /// </summary>
        /// <param name="module"></param>
        /// <returns></returns>
        public string GetModualId(ISeajsModule module)
        {
            if (module == null) 
                throw new ArgumentNullException("module");
            return _uniquireIdModuleId[module.UniqueId];
        }

        public void Add(ISeajsModule module)
        {
            if (module == null) throw new ArgumentNullException("module");
            /*
             */

            _modules.Add(module);
            var combineModual = module as CombineModule;
            if (combineModual == null)
            {
                _moduleIdUniquireId.Add(module.UniqueId, module.UniqueId); //rreference module so set it directly.
                _uniquireIdModuleId.Add(module.UniqueId, module.UniqueId);
            }
            else
            {
                string moduleId = combineModual.Combine ? (new FileInfo(module.UniqueId)).Name : combineModual.VirtualPath;
                int index
                    = 1;
                while (_moduleIdUniquireId.ContainsKey(moduleId))
                {
                    moduleId += index;
                    index++;
                }
                _uniquireIdModuleId.Add(module.UniqueId, moduleId);
                _moduleIdUniquireId.Add(moduleId, module.UniqueId);
            }
        }

        public bool Contains(string uniquireId)
        {
            return _modules.Contains(uniquireId);
        }

        public ISeajsModule this[string uniquireId]
        {
            get
            {
                return _modules[uniquireId];
            }
        }
    }
}