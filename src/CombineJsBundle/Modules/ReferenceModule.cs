using SeajsBundles.Seajs;

namespace CombineJs.Modules
{
    /// <summary>
    /// 引用模块
    /// </summary>
    public class ReferenceModule : IScriptModule
    {
     

        public ReferenceModule(string moduleId)
        {
            RequireId = moduleId;
        }

        /// <summary>
        ///     引用Id，写在js文件中require('id')这一部分的
        /// </summary>
        public string RequireId { get; set; }

        /// <summary>
        ///     Id
        /// </summary>
        public string OutputId
        {
            get { return this.RequireId; }
            set { }
        }

        /// <summary>
        ///     物理上的绝对路径
        /// </summary>
        public string AbsolutePath
        {
            get { return this.RequireId.ToLower(); }

            set
            {

            }
        }

        public bool IsCombine
        {
            get { return false; }
        }
    }
}