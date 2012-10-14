using System.Collections.Generic;
using System.Data;

namespace Ornament.EasySqlExecuter
{
    public class ParameterCache
    {
        private readonly Dictionary<string, ParamterList> datas = new Dictionary<string, ParamterList>();

        public ParamterList this[string tableName]
        {
            get
            {
                tableName = tableName.ToUpper();
                if (datas.ContainsKey(tableName))
                    return datas[tableName];
                return null;
            }
        }

        public void Add(string tableName, IList<IDataParameter> parameters)
        {
            var list = new ParamterList(parameters);
            datas.Add(tableName, list);
        }
    }
}