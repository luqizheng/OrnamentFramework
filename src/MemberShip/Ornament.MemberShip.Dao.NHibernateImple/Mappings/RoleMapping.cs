using FluentNHibernate.Mapping;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class RoleMapping : SubclassMap<Role>
    {
        public RoleMapping()
        {
            DiscriminatorValue("role");
            Extends(typeof(IPerformer));
            Join("MBS_Role", _ =>
            {
                _.KeyColumn("Id");
                _.HasManyToMany(s => s.Permissions)
               .Table("MBS_PermissionRoleRelation")
               .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore)
               .ParentKeyColumn("roleId")
               .ForeignKeyConstraintNames("FK_ROLEID_PermissionRoleRelation", "FK_ROLEID_PermissionRoleRelation")
               .ChildKeyColumn("PermissionId");
            });


        }
    }
}