namespace CombineJs.Modules
{
    public class ScriptModule
    {
        public ScriptModule(string requireId)
        {
            this.RequireId = requireId;
        }
        /// <summary>
        ///     引用Id，写在js文件中require('id')这一部分的
        /// </summary>
        public string RequireId { get; private set; }

        /// <summary>
        ///     SeajsBunlde自己生成的唯一Id
        /// </summary>
        public virtual string OutputId { get; internal set; }

        /// <summary>
        ///     绝对路径
        /// </summary>
        public virtual string AbsolutePath { get; set; }
    }
}