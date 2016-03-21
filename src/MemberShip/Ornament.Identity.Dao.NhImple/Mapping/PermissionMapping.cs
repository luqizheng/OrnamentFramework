using FluentNHibernate.Mapping;

namespace Ornament.Identity.Dao.Mapping
{
    public class PermissionMapping<T>
        : ClassMap<T>
        where T :Permission

    {
        protected PermissionMapping(string table = "orn_permission")
        {
            Table(table);
            Id(s => s.Id).GeneratedBy.SequenceIdentity();
            DiscriminateSubClassesOnColumn("diff").Length(32).CustomType(typeof (string));
            Map(s => s.Name).Insert();
            Map(s => s.Operator);

        }
    }

   
}