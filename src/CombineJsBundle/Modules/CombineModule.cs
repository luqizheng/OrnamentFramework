namespace CombineJs.Modules
{
    public class CombineModule : ScriptModule
    {
        public CombineModule(string requireId) : base(requireId)
        {
        }

        /// <summary>
        /// </summary>
        public string Content { get; set; }
    }
}