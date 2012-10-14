using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;

namespace Ornament.EasySqlExecuter
{
    public class ParamterList : KeyedCollection<string, IDataParameter>
    {
        public ParamterList(IEnumerable<IDataParameter> parameters)
        {
            foreach (IDataParameter pa in parameters)
                Add(pa);
        }


        protected override string GetKeyForItem(IDataParameter item)
        {
            return item.ParameterName.ToLower();
        }
    }
}