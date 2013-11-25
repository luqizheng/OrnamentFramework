using NHibernate.Hql.Ast.ANTLR;

namespace Ornament.Web.Bundles.Seajs
{
    public class ReferenceModule : ISeajsModule
    {
        public ReferenceModule(string moduleId)
        {
            UniqueId = moduleId;
        }

        /// <summary>
        ///   Id
        /// </summary>
        public string UniqueId { get; set; }

        public bool IsCombine { get { return false; } }
    }
}