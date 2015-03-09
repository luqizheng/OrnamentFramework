namespace CombineJs.Modules
{
    /// <summary>
    ///     引用模块
    /// </summary>
    public class ReferenceModule : ScriptModule
    {
        public ReferenceModule(string moduleId)
        {
            RequireId = moduleId;
        }
        
        /// <summary>
        ///     Id
        /// </summary>
        public override string OutputId
        {
            get { return RequireId; }
            set { }
        }

        /// <summary>
        ///     物理上的绝对路径
        /// </summary>
        public override string AbsolutePath
        {
            get { return RequireId.ToLower(); }

            set { }
        }

        public override bool IsCombine
        {
            get { return false; }
        }
    }
}