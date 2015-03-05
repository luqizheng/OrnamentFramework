namespace CombineJs.Modules
{
    public class ScriptModule
    {
        /// <summary>
        ///     引用Id，写在js文件中require('id')这一部分的
        /// </summary>
        public string RequireId { get; set; }

        /// <summary>
        ///     SeajsBunlde自己生成的唯一Id
        /// </summary>
        public string OutputId { get; set; }

        /// <summary>
        ///     绝对路径
        /// </summary>
        public string AbsolutePath { get; set; }

        /// <summary>
        /// </summary>
        public bool IsCombine { get; set; }
    }
}