namespace Ornament.Identity.Stores
{
    public interface IPermissionStore<T,TRole,TId> 
        where T:IPermission<TRole,TId> 
        where TRole:IdentityRole<TId>
    {
    }
}