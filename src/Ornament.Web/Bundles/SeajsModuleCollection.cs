using System.Collections.ObjectModel;
using System.Linq;

namespace Ornament.Web.Bundles
{
    public class SeajsModuleCollection : KeyedCollection<string, SeajsModual>
    {
        protected override string GetKeyForItem(SeajsModual item)
        {
            while (Contains(item.Id))
            {
                int post = item.Id.LastIndexOf('.');
                item.Id += item.Id.Insert(post, "1"); //自动改名
            }
            return item.Id;
        }

        public string[] RequrestIds
        {
            get { return (from file in this select file.Id).ToArray(); }
        }
    }
}