using FluentNHibernate.Mapping;

namespace Ornament.MemberShip.Dao.NHibernateImple.Mappings
{
    public class RoleMapping : SubclassMap<Role>
    {
        public RoleMapping()
        {
            DiscriminatorValue("role");
            Table("MBS_Role");
            Extends(typeof(IPerformer));
            //is.Join("MBS_Role", s => s.Fetch.Select());
            
            KeyColumn("Id");
            HasManyToMany(s => s.Permissions)
                .Table("MBS_PermissionRoleRelation")
                .Access.ReadOnlyPropertyThroughCamelCaseField(Prefix.Underscore)
                .ParentKeyColumn("roleId")
                .ForeignKeyConstraintNames("FK_ROLEID_PermissionRoleRelation", "FK_ROLEID_PermissionRoleRelation")
                .ChildKeyColumn("PermissionId");
        }
    }
}