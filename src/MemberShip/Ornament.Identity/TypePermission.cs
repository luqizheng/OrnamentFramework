namespace Ornament.Identity
{
    public class TypePermission<TRole, TRoleId, TOperator> : PermissionGeneric<TRole, TRoleId, string, TOperator>
        where TRole : IdentityRole<TRoleId>
    {
    }
}