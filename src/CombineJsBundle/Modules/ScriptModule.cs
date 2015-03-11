namespace CombineJs.Modules
{
    public class ScriptModule
    {
        /// <summary>
        ///     引用Id，写在js文件中require('id')这一部分的
        /// </summary>
        public virtual string RequireId { get; set; }

        /// <summary>
        ///     SeajsBunlde自己生成的唯一Id
        /// </summary>
        public virtual string OutputId { get; set; }

        /// <summary>
        ///     绝对路径
        /// </summary>
        public virtual string AbsolutePath { get; set; }
    }
}