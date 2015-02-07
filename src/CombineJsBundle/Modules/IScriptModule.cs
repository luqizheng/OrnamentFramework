namespace CombineJs.Modules
{
    public interface IScriptModule
    {
        /// <summary>
        ///     引用Id，写在js文件中require('id')这一部分的
        /// </summary>
        string RequireId { get; set; }

        /// <summary>
        ///     SeajsBunlde自己生成的唯一Id
        /// </summary>
        string OutputId { get; set; }

        /// <summary>
        ///     绝对路径
        /// </summary>
        string AbsolutePath { get; set; }

        /// <summary>
        /// </summary>
        bool IsCombine { get; }
    }

    public interface IScriptReader
    {
        string RequireId { get; set; }

        string Content(string relativePaht);
    }
}