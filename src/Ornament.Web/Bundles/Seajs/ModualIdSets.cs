using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows.Forms;

namespace Ornament.Web.Bundles.Seajs
{
    public class ModualIdSets
    {
        private readonly Dictionary<string, string> _moduleIdUniquireId = new Dictionary<string, string>();
        private readonly Dictionary<string,string> _uniquireIdModuleId=new Dictionary<string, string>();
        private readonly ModuleCollection _modules = new ModuleCollection();

        public string GetModualId(ReferenceModule module)
        {
            return _uniquireIdModuleId[module.UniqueId];
        }
        public void Add(ReferenceModule module)
        {
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
                string moduleId = (new FileInfo(module.UniqueId)).Name;
                int index
                    = 1;
                while (_moduleIdUniquireId.ContainsKey(moduleId))
                {
                    moduleId += index;
                    index++;
                }
                _uniquireIdModuleId.Add(module.UniqueId,moduleId);
                _moduleIdUniquireId.Add(moduleId, module.UniqueId);
            }
        }

        public bool Contains(string uniquireId)
        {
            return _modules.Contains(uniquireId);
        }

        public ReferenceModule this[string uniquireId]
        {
            get
            {
                return _modules[uniquireId];
            }
        }
    }
}